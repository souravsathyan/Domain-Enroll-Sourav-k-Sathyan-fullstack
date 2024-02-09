import dotenv from "dotenv"
dotenv.config()
import {app} from "./app.js"
import mongoose from 'mongoose';


app.listen(process.env.PORT,()=>{
    console.log(`server running on PORT ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB connected')
})