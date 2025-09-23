import { Product,Rating } from "../product-models/product.model.js";
import { Store } from "../product-models/store.model.js"

export const createProduct = async (data)=>{
    return await Product.create(data);
}

export const createRating = async (data) =>{
    const rating = await Rating.create(data);
    await Product.updateOne(
        { 
            productId: data.productId 
        },
        { 
            $push: { 
                productRating: rating 
            } 
        }
        );
        return rating;

}

export const findUserRatingProduct = async (productId,userId)=>{
    return await Rating.findOne({productId,userId})
   
}

export const allProducts = async ()=>{
    return await Product.find();
}

export const getStoreDetails = async (storeId)=>{
    return await Store.findOne({storeId:storeId}).populate('storeProducts') 
} 

export const getProductDetails = async (productId)=>{
    return await Product.findOne({productId:productId});   
}

export const addStore = async (data)=>{
    return await Store.create(data);
}
export const getStoreExist = async(email)=>{
    return await Store.findOne({storeEmail:email})
}
 
export const getProductbyId = async(productId)=>{
    return await Product.findOne({productId:productId});
}

export const storeDetails = async(storeId)=>{
    return await Store.findOne({storeId:storeId})

}

export const fetchProductById = async(productId)=>{
    return await Product.findById(productId);
}