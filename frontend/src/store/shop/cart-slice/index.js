import axios from "axios"
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
const initialState={
    cartItems:[],
    isLoading:false
}
export const addToCartItems= createAsyncThunk('cart/addToCart',
    async({userId,productId,quantity})=>{
    const response= await axios.post("http://localhost:5000/api/shop/cart/add",
        {
            userId,
            productId,
            quantity
        } 
    );
    return response.data
}
);
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
        return response.data;   
});

export const updateCart=createAsyncThunk('cart/updateCart',async({userId,productId,quantity})=>{
    const response=await axios.put('http://localhost:5000/api/shop/cart/update-cart',{userId,productId,quantity});
    return response.data
})

export const deleteCart = createAsyncThunk(
    'cart/deleteCart',
    async ({ userId, productId }, { rejectWithValue }) => {
        
            const response = await axios.delete(`http://localhost:5000/api/shop/cart/delete/${userId}/${productId}`);
            return response.data;
    }
);

const ShopingCartSlice=createSlice({
    name:'shopingCart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCartItems.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addToCartItems.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload.data;
        })
        .addCase(addToCartItems.rejected,(state)=>{
            state.isLoading=false
            state.cartItems=[]
        })
        //for fetchCartItems
        .addCase(fetchCart.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data; 
        })
        .addCase(fetchCart.rejected,(state)=>{
            state.isLoading=false
            state.cartItems=[]
        })

        //for updateCart
        .addCase(updateCart.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload.data;
        })
        .addCase(updateCart.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        })

        //for deleteCart
        .addCase(deleteCart.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteCart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.cartItems=action.payload.data
        })
        .addCase(deleteCart.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        });
    },
});
export default ShopingCartSlice.reducer
