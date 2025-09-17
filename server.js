import app from './app.js';
import validateEnvVariables from './env.variables.validation.js';


const {port} = validateEnvVariables();

app.listen(port,()=>{
    console.log(`Server is running at Port ${port}`);
});
