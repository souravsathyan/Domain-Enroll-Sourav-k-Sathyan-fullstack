// dependencies
import express from "express"
import prodcuctRouter  from "./routes/productRouter.js"
import {CustomError} from "./utils/customError.js"
import {globalErrorHandler} from "./controller/errorController.js"
import cors from "cors"

export const app = express()
// middlewares
app.use(express.json())
app.use(cors())

// router
app.use('/api/product', prodcuctRouter)

// error handling
app.all("*",(req,res,next)=>{
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404)
})

app.use(globalErrorHandler)