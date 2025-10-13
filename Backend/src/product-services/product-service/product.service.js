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

export const allProducts = async (filter = {})=>{
    if (!filter) return []
    const {pagetype} = filter
    switch(pagetype){
        case "home":
            return await Product.find({isFeatured:false}).populate('storeId')
        case "electronics":
            return await Product.find({productCategory:{$in:["Electronics"]}}).populate('storeId')
        case "fasion":
            return await Product.find({productCategory:{$in:["Fashions"]}}).populate('storeId')
        case "Accessories":
            return await Product.find({productCategory:{$in:["Accessories"]}}).populate('storeId')
        case "Appliances":
            return await Product.find({productCategory:{$in:["Appliances"]}}).populate('storeId')
        case "isFeatured":
            return await Product.find({isFeatured:true}).populate('storeId')
        case "newArrivals":
            return await Product.find({}).sort({ isNewArrival: -1,createdAt: -1}).populate("storeId");

    }




    return await Product.find().populate('storeId');
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
    return await Store.findById({_id:storeId});

}

export const fetchProductById = async(productId)=>{
    return await Product.findById(productId);
}

export const updateProduct = async (data,productId)=>{
    return await Product.findOneAndUpdate({productId:productId},{$set:data},{ new: true, runValidators: true, timestamps: true })     
}