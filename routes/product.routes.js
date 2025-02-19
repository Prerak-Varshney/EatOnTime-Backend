import express from 'express';
import { createProduct, deleteProduct, updateProduct, getProducts, getProductById } from '../controllers/product.controller.js';
import {upload} from "../middleware/multer.middleware.js";

const router = express.Router();

router.route('/').post(
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ]),
    createProduct
);
router.route('/:productId').put(
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ]),
    updateProduct
);

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.delete('/:productId', deleteProduct);

export default router;