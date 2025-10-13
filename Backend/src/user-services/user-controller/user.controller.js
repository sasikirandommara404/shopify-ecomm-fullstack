import {
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUser
} from '../user-service/user.service.js';
import AppError from '../../../AppError.js'


export const getUserDetails = async (req,res,next)=>{
    try{
        const {userId} = req.params;

        if(!userId){
            throw new AppError("UserId is required",400)
        }

        const user = await getUserById(userId);

        if(!user){
            throw new AppError("User not found",404)
        }
        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            data:{
                user
            }
        })

    }catch(error){
        next(error)
    }
}

export const getUsers = async (req,res,next)=>{
    try{
        const users = await getAllUsers();
        return res.status(200).json({
            success:true,
            message:"Users fetched successfully",
            data:{
                users
            }   
        })

    }catch(error){
        next(error)
    }
}

export const updateUserDetails = async (req,res,next)=>{
    try{
        const {userId} = req.params;
        const updateData = req.body;
        if(!userId){
            throw new AppError("UserId is required",400)
        }
        if(Object.keys(updateData).length === 0){
            throw new AppError("Update Data is required",400);
        }
        updateData.updatedAt = new Date();

        const user = await updateUserById(userId, updateData);
        if(!user){
            throw new AppError("User not found",404)
        }
        return res.status(201).json({
            success:true,
            message:"User updated successfully",
            data:{
                user
            }
        })

    }catch(error){
        next(error)
    }
}

export const deleteUserById = async (req,res,next)=>{
    try{
        const {userId} = req.params;
        if(!userId){
            throw new AppError("UserId is required",400)
        }   
        const user = await deleteUser(userId);
        if(!user){
            throw new AppError("User not found",404)
        }
        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })
    }catch(error){
        next(error)
    }
}