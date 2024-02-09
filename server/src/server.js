import dotenv from "dotenv"
dotenv.config()
import {app} from "./app.js"
import mongoose from 'mongoose';

// listening to server
app.listen(process.env.PORT,()=>{
    console.log(`server running on PORT ${process.env.PORT}`)
})

// connecting mongoDB
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB connected')
})