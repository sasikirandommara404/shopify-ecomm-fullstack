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
        storeId:{type: mongoose.Schema.Types.ObjectId, ref:"Store", required:true},
        isFeatured:{
            type:Boolean,
            default:false,
            index:true
        },
        isNewArrival:{
            type:Boolean,
            default:false,
            index:true
        },
        isTrending:{
            type:Boolean,
            default:false,
            index:true
        },
        collections:{
            type:[String],
            default:[],
            index:true
        },
        featuredPriority:{
            type:Number,
            default:0
        },
        featuredFrom:{
            type:Date,
            default:null
        },
        featuredUntil:{
            type:Date,
            default:null
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

productSchema.index({ isFeatured: 1, featuredPriority: -1 });
productSchema.index({ collections: 1 });
productSchema.index({ isNewArrival: 1, createdAt: -1 });


export const Product = mongoose.model("Product",productSchema);
export const Rating = mongoose.model("Rating",ratingSchema); 

