import express from 'express';
import { createProduct } from '../controllers/products.controller.js';
// import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/create-product', createProduct);

export default router;