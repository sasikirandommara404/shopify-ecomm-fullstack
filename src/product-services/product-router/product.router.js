import express from 'express';
import upload from '../../middleware/multer.js'; 
import { addProduct,
    addReview,
    getAllProducts,
    addNewStore,
    getProduct,
    getStore } from '../product-controller/product-controller.js';

const Productrouter = express.Router();

Productrouter.post('/product/:storeId',upload.single('productImage'),addProduct);
Productrouter.post('/review/:productId/:userId',addReview);
Productrouter.get('/getallproducts',getAllProducts);
Productrouter.post('/new/store',addNewStore);
Productrouter.get('/product/by/:id',getProduct);
Productrouter.get('/store/:storeId',getStore)

export default Productrouter;





