import express from "express";
import { addProduct, getAllProducts, updateProduct, deleteProduct, getProduct } from "../controller/productControllers.js";

const router = express.Router();

router.route('/').get(getAllProducts);

router.route('/add').post(addProduct);

router.route('/getProduct').get(getProduct);

router.route('/editProduct/:id').put(updateProduct);

router.route('/delete/:id').delete(deleteProduct);

export default router