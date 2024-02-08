import {CustomError} from "./customError.js"

const ayncErrorHandler=(func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch(err=>{
            const error = new CustomError(err.message, 500)
            next(error)
        })
    }
}

export default ayncErrorHandler