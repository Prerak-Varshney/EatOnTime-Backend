import express from 'express';
import { createProduct, deleteProduct, updateProduct, getProducts, getProductById } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/get-products', getProducts);
router.get('/get-product/:productId', getProductById);
router.post('/create-product', createProduct);
router.put('/update-product/:productId', updateProduct);
router.delete('/delete-product/:productId', deleteProduct);

export default router;