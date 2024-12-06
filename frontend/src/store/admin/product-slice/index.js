import axios from 'axios'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
const initialState={
    isLoading:false,
    productList:[]
}

export const addNewProduct=createAsyncThunk('products/addNewProduct',
    async (formData)=>{
    const result=await axios.post('http://localhost:5000/api/admin/products/add',formData,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    return result?.data;
})

export const FathcAllProduct=createAsyncThunk('products/FatchAllProduct',
    async ()=>{
    const result=await axios.get('http://localhost:5000/api/admin/products/get')
    return result?.data;
})

export const editProduct = createAsyncThunk(
    'products/editProduct',
    async ({id, formData }) => {  // Destructuring a single object with id and formData
      const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    //   console.log('Axios Response:', result.data);
      return result?.data;
    }
  );
  

export const deleteProduct=createAsyncThunk('products/deleteProduct',
    async (id)=>{
    const result=await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)
    return result?.data;
})
const AdminProductSlice=createSlice({
    name:'adminProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FathcAllProduct.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(FathcAllProduct.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.productList = action.payload.data;
            state.isAuthenticated = action.payload.success;
        })
        .addCase(FathcAllProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
            state.error = action.error.message;
        })
    }
})
export default AdminProductSlice.reducer