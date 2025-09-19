import mongoose from 'mongoose';
import validateEnvVariables from '../env.variables.validation.js';

const { mongoUri }=validateEnvVariables();
const db = async () => {
    try{
        await mongoose.connect(mongoUri,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log('Database connected');
    }catch(err){
        console.error(err.message);
        process.exit(1)
    }
}
export default db;