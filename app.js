import express from 'express';
import cors from 'cors';
import AppError from './AppError.js';
import errorHandler from './globalError.js';

const app = express();

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true, limit:'10mb'}));
app.use(cors());

app.get('/health',async (req,res,next)=>{
    res.status(200).json(
        {
            status:'success', 
            message:'Server is healthy'
        }
    );
});
app.use(errorHandler)
export default app;


