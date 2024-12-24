import axios from 'axios'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'  
const initialState={
    isLoading:false,
    productList:[],
    productDetails:null
}
export const FatchAllFilterProduct=createAsyncThunk('products/FatchAllFilterProduct',
    async ({filtersParams,sortParams})=>{
    const query=new URLSearchParams({
            ...filtersParams,
            sortBy:sortParams
        })
    const result=await axios.get(`https://fnf-eun3.onrender.com/api/shop/products/get?${query}`)
    return result?.data;
})

export const fetchProductDetails=createAsyncThunk('products/fetchProductDetails',
    async (id)=>{
        // console.log(id,'id')
    const result=await axios.get(`https://fnf-eun3.onrender.com/api/shop/products/get/${id}`)
    return result?.data;
})


const ShopProductSlice=createSlice({
    name:'shoppingPruducts',
    initialState,
    reducers:{
        setProductDetails:(state=>{
            state.productDetails=null
        })
    },
    extraReducers:(builder)=>{
        builder
        .addCase(FatchAllFilterProduct.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(FatchAllFilterProduct.fulfilled, (state, action) => {
            console.log(action.payload.data)
            state.isLoading = false;
            state.productList = action.payload.data;
            state.isAuthenticated = action.payload.success;
        })
        .addCase(FatchAllFilterProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
            state.error = action.error.message;
        })
        .addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
            // console.log(action.payload.data)
            state.isLoading = false;
            state.productDetails = action.payload.data;
            state.isAuthenticated = action.payload.success;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.productDetails = [];
            state.error = action.error.message;
        })
    }
})
export const {setProductDetails}=ShopProductSlice.actions;
export default ShopProductSlice.reducer