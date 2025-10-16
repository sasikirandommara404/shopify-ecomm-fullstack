import {
    registerUser,
    UserExist
    } from '../auth-service/auth.servce.js';
import AppError from '../../../AppError.js';
import {generateId,hashedPassword} from '../../utils/utils.js'
import client from '../../../configs/redis.config.js'
import jwt from 'jsonwebtoken'
import validateEnvVariables from '../../../env.variables.validation.js'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';




export const registerNewUser = async (req,res,next)=>{
    try{
        console.log(req.body);
        const {firstName, lastName,email,password,mobileNumber,address} = req.body;
        const isEmailExist = await UserExist(email);

        if(isEmailExist){
            return next(new AppError("user already exist",409));
        }

        const userid = await generateId('USERID');

        if (!userid) {
            return next(new AppError("Please try after some time ",500))
        }
        const hashpassword = await hashedPassword(password);
        if(!hashpassword){
            return next(new AppError("something went wrong please try again later",500));
        }
        const userAdded = await registerUser({
            userId:userid,
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashpassword,
            mobileNumber:mobileNumber,
            address:address

        })
        if(!userAdded) throw new AppError("Account  creation failed ,try again later",401);

        return res.status(201).json({
            status:'sucess',
            message:"account created successfully",
            data:{
                userAdded
            }
        });
    }catch(error){
        console.error(error);
        next(error);
    }

}

export const userLogin = async (req,res,next)=>{
    try{
        const {jwtSecret,jwtExpiry,refreshToken,refreshTokenExpiry} = validateEnvVariables();
        const {email,password} = req.body;
        if(!email || !password){
            throw new AppError("email or password missing",400);
        }

        const user = await UserExist(email);

        if(!user){
            throw new AppError("No such user found",404);
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            throw new AppError("Invalid credentials",401);
        }
        const accessToken = jwt.sign({userId:user.userId,email:user.email,role:user.role},jwtSecret,{expiresIn:jwtExpiry});
        const refreshtoken = jwt.sign({userId:user.userId,email:user.email,role:user.role},refreshToken,{expiresIn:refreshTokenExpiry});
        await client.set(`refreshtoken:${user.userId}`,refreshtoken,{EX:30*24*60*60})

        await client.set(`accessToken:${user.userId}`,accessToken,{EX:2*60});


        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:15*60*1000
        })
        res.cookie('refreshtoken',refreshtoken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:30*24*60*60*1000
        })
        return res.status(200).json({
            status:'success',
            message:"user logged in successfully",
            data:{
                accessToken,
                refreshtoken
            }
        });

    }catch(error){
        next(error);
    }
}

export const refreshAccessToken = async (req,res,next)=>{
    try{
        const {jwtSecret,jwtExpiry,refreshToken} = validateEnvVariables();

        const tokenInCookies = req.cookies?.refreshtoken;
        if(!tokenInCookies){
            throw new AppError("no token found",401);
        }

        const decoded = jwt.verify(tokenInCookies,refreshToken);

        if(!decoded){
            throw new AppError("invalid token or Token Expire please login again",401);
        }

        const userId = decoded.userId;

        const storedRefreshtoken = await client.get(`refreshtoken:${userId}`)

        if(tokenInCookies !== storedRefreshtoken){
            throw new AppError("invalid token or Token Expire please login again",401);
        }

        const newAccessToken = jwt.sign({userId:decoded.userId,email:decoded.email,role:decoded.role},jwtSecret,{expiresIn:jwtExpiry});

        await client.set(`accessToken:${userId}`,newAccessToken,{EX:15*60});
        res.cookie('accessToken',newAccessToken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:15*60*1000
        })
        return res.status(200).json({
            status:'success',
            message:"Access token generated successfully",
            data:{
                newAccessToken
            }
        });


    }catch(error){
        next(error);
    }
}   

export const logoutUser = async (req,res,next)=>{
  try{
    
    const accesstoken = req.cookies?.accessToken;

    if(!accesstoken){
        throw new AppError("no token found",401);
    }
    const {jwtSecret} = validateEnvVariables();

    const decode = jwt.verify(accesstoken,jwtSecret);
    if(!decode){
        throw new AppError("invalid token or Token Expire please login again",401);
    }
    const userId = decode.userId;

    await client.del(`refreshtoken:${userId}`);
    await client.del(`accessToken:${userId}`);
    res.clearCookie('accessToken');
    res.clearCookie('refreshtoken');
    return res.status(200).json({
      status:'success',
      message:"logged out successfully"
    });


  }catch(error){
    next(error);
  }
}
