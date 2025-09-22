import User from '../auth-model/auth.model.js'

export const registerUser = async (data)=>{
    return await User.create(data) 
}

export const UserExist = async(email)=>{
    return await User.findOne({email: email})
}


