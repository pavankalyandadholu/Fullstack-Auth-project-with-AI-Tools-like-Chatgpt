import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { router } from './routes/userRoutes/user.Router.js';

dotenv.config();
connectDB();


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', router);
app.get('/',(req,res)=>{
    res.status(200).json({status:200,message:"API is working! "})
})
app.use((req,res)=>{
    res.send("INvalid Url ")
})

export default app;
