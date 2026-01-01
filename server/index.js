import express from "express";
import cors from'cors';
import cookieParser from "cookie-parser";
import routes from './Routes/routes.js';
import 'dotenv/config';
import connectDB from "./config/db.js";
import Users from "./models/userSchema.js";

const app = express();
app.use(express.static('public'));
app.use(cors({origin: `${process.env.CLIENT_URL}`,credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/',routes);

connectDB();

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`server started at port ${process.env.SERVER_PORT}`)
})