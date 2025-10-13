import bcrypt from 'bcrypt'
import validateEnvVariables from '../../env.variables.validation.js'

const {salt} = validateEnvVariables();

export const  generateId = (prefix) => {
  const timestamp = Date.now().toString().slice(-6); 
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${timestamp}${random}`;
}

export const hashedPassword = async (password)=>{
    try{
        const Salt = await bcrypt.genSalt(Number(salt))

        const hashPassword = await bcrypt.hash(password,Salt)
        return hashPassword;
    }catch(err){
        return null;
    }
}


