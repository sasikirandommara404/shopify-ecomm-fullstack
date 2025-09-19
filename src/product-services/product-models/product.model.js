import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true
    },
    userRating:{
        type:Number,
        default:0,
        min:1,
        max:5
    }
})

const productSchema = new mongoose.Schema(
    {
        productId:{
            type: String,
            required:true,
            unique:true
        },
        productName:{
            type:String,
            required:true

        },
        productDescription:{
            type:String,
            required:true
        },
        productPrice:{
            type:Number,
            required:true
        },
        productStock:{
            type:Number,
            required:true

        },
        productCategory:{
            type:[String],
            required:true

        },
        productImage:[
                {
                    url:{
                        type:String
                    },
                    public_id:{
                        type:String
                    }
                }
            ]
        ,
        productRating:[ratingSchema],
        storeId:{
            type:String,
            required:true
        }




    },
    {
        timestamps:true,
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        }
    }
)

productSchema.virtual('averageRating').get(function(){
    let totalRatings= this.productRating.length;
    if(totalRatings===0){
        return 0;
    }else{
        const sumOfAllRatings=this.productRating.reduce((acc,curr)=>{return acc+curr.userRating},0)
        return Math.round(sumOfAllRatings/totalRatings);
    }
}
);


export const Product = mongoose.model("Product",productSchema);
export const Rating = mongoose.model("Rating",ratingSchema); 

