import express from 'express';
import { createProduct, deleteProduct, updateProduct, getProducts, getProductById } from '../controllers/product.controller.js';
import {upload} from "../middleware/multer/multer.middleware.js";

const router = express.Router();

router.route('/create-product').post(
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ]),
    createProduct
);
router.route('/update-product/:productId').put(
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ]),
    updateProduct
);

router.get('/get-products', getProducts);
router.get('/get-product/:productId', getProductById);
router.delete('/delete-product/:productId', deleteProduct);

export default router;