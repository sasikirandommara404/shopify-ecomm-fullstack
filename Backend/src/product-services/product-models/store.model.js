import mongoose from "mongoose";


const storeSchema = new mongoose.Schema(
  {
    storeId: {
      type: String,
      required: true,
      unique: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    storeEmail: {
      type: String,
      required: true,
      unique: true,
    },
    storePassword: {
      type: String,
      required: true,
    },
    storeAddress: {
      type: Object,
      required: true,
    },
    storePhoneNo: {
      type: String,
      required: true,
    },   
    storeProducts: [{type: mongoose.Schema.Types.ObjectId, ref:"Product"}],

    storeOwner: {
      type: String,
      required: true,
    },
    storeStatus: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["store"],
      default: "store",
    }
  },
  { timestamps: true }
);

export const Store = mongoose.model("Store", storeSchema);
