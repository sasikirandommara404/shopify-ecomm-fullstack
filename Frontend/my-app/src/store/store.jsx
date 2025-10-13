import { configureStore  } from "@reduxjs/toolkit";
import ecommerceReducer from "../slice/slice.jsx";


const store = configureStore({
    reducer:{
        ecommerce : ecommerceReducer

    }
})
export default store;

