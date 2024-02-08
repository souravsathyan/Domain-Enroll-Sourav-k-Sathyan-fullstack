import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    category:{
        type:String,
    },
    price:{
        type:String,
    },
    description:{
        type:String
    },
    gender:{
        type:String
    },
    discount:{
        type:String
    },
    image:{
        type:String,
    }
}, {timestamps:true})

const Product = mongoose.model('Product',productSchema)

export default Product