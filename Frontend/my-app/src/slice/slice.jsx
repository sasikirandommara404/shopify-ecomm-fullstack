import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productsList: [],
    cart: [],
    wishlist: [],
    user: null,
    orders: [],
    logedIn:false


};

const ecommerceSlice = createSlice({
    name: 'ecommerce',
    initialState,
    reducers: {
        setProducts:(state,action)=>{
            state.productsList = action.payload;

        },
        loginUser : (state, action) => {
            state.logedIn = action.payload;
        },
        updateUserInfo:(state,action)=>{
            state.user = action.payload
        }
    }
});

export const {setProducts,loginUser,updateUserInfo} = ecommerceSlice.actions;
export default ecommerceSlice.reducer;

