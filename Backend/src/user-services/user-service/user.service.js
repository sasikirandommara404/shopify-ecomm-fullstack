import User from '../../auth-services/auth-model/auth.model.js';

export const getUserById = async (userId) => {
  return await User.findOne({userId: userId}).select('firstName lastName email mobileNumber address');
}

export const getAllUsers = async ()=>{
    return await User.find().select('userId firstName lastName email mobileNumber address');
}

export const updateUserById = async (userId, updateData) => {
  return await User.findOneAndUpdate({userId: userId}, updateData, {new: true}).select('firstName lastName email mobileNumber address updatedAt');
}

export const deleteUser = async (userId) =>{
    return await User.findOneAndDelete({userId: userId});
}