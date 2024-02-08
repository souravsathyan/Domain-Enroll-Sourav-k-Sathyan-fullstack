import Product from "../model/productModel.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"

export const getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) - 1 || 0
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search || ""

    const products = await Product.find({ name: { $regex: search, $options: "i" } })
        .skip(page * limit)
        .limit(limit)

    const totalProducts = await Product.countDocuments({ name: { $regex: search, $options: "i" } })

    res.status(200).json({
        data: {
            error: false,
            info: {
                totalProducts,
                page: page + 1,
                limit,
                products
            }
        }
    })
})

export const addProduct = asyncErrorHandler(async (req, res, next) => {
    const { prodName, prodCategory, prodPrice, gender, prodDiscount, prodImage, prodDescription } = req.body
    const newProduct = await new Product({
        name: prodName,
        category: prodCategory,
        price: prodPrice,
        description: prodDescription,
        gender: gender,
        discount: prodDiscount,
        image: prodImage
    })
    await newProduct.save()

    res.status(200).json({
        data: {
            error: false,
            message: "product added successfully"
        }
    })

})

export const updateProduct = asyncErrorHandler(async (req, res, next) => {
    const prodId = req.params.id
    const { prodName,
        prodCategory,
        prodPrice,
        prodDescription,
        gender,
        prodDiscount,
        prodImage } = req.body
    const updatedProduct = await Product.findByIdAndUpdate(
        prodId,
        {
            $set: {
                name: prodName,
                category: prodCategory,
                price: prodPrice,
                description: prodDescription,
                gender: gender,
                discount: prodDiscount,
                image: prodImage
            }
        }, {
        new: true
    }
    )
    res.status(201).json({
        error: false,
        message: "product updated successfully",
        info: {
            updatedProduct
        }
    })
})

export const deleteProduct = asyncErrorHandler(async (req, res, next) => {
    const prodId = req.params.id
    await Product.findByIdAndDelete(prodId)
    res.status(200).json({
        data:{
            error:false,
            message:"product deleted successfully"
        }
    }) 
})