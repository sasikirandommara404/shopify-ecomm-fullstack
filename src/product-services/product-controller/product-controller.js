import multer from 'multer';
import path from 'path';
import { 
    createProduct,
    createRating,
    findUserRatingProduct,
    allProducts,
    getStoreDetails,
    getProductDetails,
    addStore,
    getStoreExist,
    getProductbyId,
    storeDetails
     } from '../product-service/product.service.js';
import uploadToCloudinary  from '../../utils/uploadToCloudinary.js'
import AppError from '../../../AppError.js';
import { generateId, hashedPassword } from '../../utils/utils.js';

export const addProduct = async (req,res,next)=>{
    try{
        const {  
            productName, 
            productDescription, 
            productPrice, 
            productStock, 
            productCategory,
         } = req.body;
        const { storeId } = req.params;
        const storeExists = await getStoreDetails(storeId);
        if(!storeExists) throw new AppError("Store does not exist",404);




        let productImages = [];
         if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, "products");

            productImages.push({
                url: result.secure_url,
                public_id: result.public_id,
            });
        }else{
            throw new AppError('No file uploaded',403);
        }

        let productId=generateId('PRID');

        if (!productId) throw new AppError("Failed to generate id",401);


        const product = await createProduct({
            productId:productId,
            productName:productName,
            productDescription:productDescription,
            productPrice:productPrice,
            productStock:productStock,
            productCategory:productCategory,
            productImage:productImages,
            storeId:storeId

        })
        if (!product) throw new AppError("Failed to add Product",401);

        return res.status(201).json({
            status:"success",
            message:"Product added successfully",
            data:{
                product
            },
        });

    }catch(error){
        next(error)
    }
}

export const addReview = async (req,res,next)=>{
    try{
        const { userRating } = req.body;
        const { productId, userId } = req.params;
        const productExists = await getProductDetails(productId);
        if(!productExists) throw new AppError("Product does not exist",404);

        const existingRating = await findUserRatingProduct(productId, userId);
        if(existingRating){
            throw new AppError("You have already rated this product",409);
        }


        const rating = await createRating({
            productId:productId,
            userId:userId,
            userRating:userRating,
        }
        );
        if(!rating) throw new AppError("Failed to add review",401);
        return res.status(201).json({
            status:'success',
            message:"review added successfully",
            data:{
                rating
            },
        });

    }catch(error){
        next(error);
    }
}

export const getAllProducts = async (req,res,next)=>{
    try{
        const products = await allProducts();
        if(products.length===0){
            throw new AppError("No Products found",404);
        }
        return res.status(200).json({
            status:'success',
            message:"All products fetched successfully",
            data:{
                products
            },
        });
    }
    catch(error){
        next(error);
    }
}

export const addNewStore = async (req,res,next)=>{
    try{
        const { storeName,storeEmail,password,storeAddress,storePhoneNo,storeOwner} = req.body;

        const allreadyAddedStore = await getStoreExist(storeEmail);
        if(allreadyAddedStore){
            throw new AppError("Store Already Exists",409);
        }

        let storeId = await generateId('STOR');
        if(!storeId)throw new AppError("Internal Server Please Try Again after some time  ",500);
        let hashedPass= await hashedPassword(password);
        if(!hashedPass)throw new AppError("Internal Server Please Try Again after some time  ",500);
        let store={
            storeId:storeId,
            storeName:storeName,
            storeEmail:storeEmail,
            storePassword:hashedPass,
            storeAddress:storeAddress,
            storePhoneNo:storePhoneNo,
            storeOwner:storeOwner,
        }
        const createdStore = await addStore(store);
        if(!createdStore) throw new AppError("Failed to add Store",401);
        return res.status(201).json({
            status:'success',
            message:"Store Added Successfully",
            data:{
                createdStore
            },
        });

    }catch(error){
        next(error)
    }

}

export const getProduct = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const product = await getProductbyId(id);
        if(!product) throw new AppError("Product Not Found",404);
        return res.status(200).json({
            status:'success',
            message:"Product Fetched Successfully",
            data:{
                product
            },
        });

    }catch(error){
        console.log(error);
        next(error)
    }
}

export const getStore = async(req,res,next)=>{
    try{
        const { storeId } = req.params;
        const store = await storeDetails(storeId);
        if(!store) throw new AppError("Store Not Found",404);
        return res.status(200).json({
            status:'success',
            message:"Store Fetched Successfully",
            data:{
                store
            },
        });
    }catch(error){
        next(error)
    }
}
