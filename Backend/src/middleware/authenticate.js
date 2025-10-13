import AppError from '../../AppError.js'
import validateEnvVariables from '../../env.variables.validation.js'
import jwt from 'jsonwebtoken' 

export const authenticate = (req, res, next) => {
    try{
        const {jwtSecret} = validateEnvVariables()
          const token = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            throw new AppError('Authentication token is missing', 401)
        }
        const decoded = jwt.verify(token, jwtSecret)
        if(!decoded){
            throw new AppError('Invalid authentication token or Expired Token ', 403)
        }

        req.user = decoded
        next()



    }catch(error){
        next(error)
    }

}

export default authenticate