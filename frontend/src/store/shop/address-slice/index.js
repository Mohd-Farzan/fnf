import axios from "axios"
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
const initialState={
    addressList:[],
    isLoading:false
}
export const addAddress= createAsyncThunk('addresses/addAddress',
    async(formData)=>{
    const response= await axios.post("http://localhost:5000/api/shop/address/add",formData
    );
    return response.data
}
);

export const fetchAddress = createAsyncThunk('addresses/fetchAddress', async (userId,{rejectWithValue}) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`);
    // console.log(response, 'response');
    return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
    
});

export const editAddress=createAsyncThunk('addresses/editAddress',async({userId,addressId,formData})=>{
    const response=await axios.put(`http://localhost:5000/api/shop/address/edit/${userId}/${addressId}`,formData);
    return response.data
})

export const deleteAddress = createAsyncThunk(
    "addresses/deleteAddress",
    async ({ userId, addressId }) => {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
      );
      return response.data;
    }
  );
const AddressSlice=createSlice({
    name:'address',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addAddress.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addAddress.fulfilled,(state,action)=>{
            state.isLoading=false;
            
        })
        .addCase(addAddress.rejected,(state)=>{
            state.isLoading=false
           
        })
        //for fetchaddressList
        .addCase(fetchAddress.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(fetchAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data; 
        })
        .addCase(fetchAddress.rejected,(state)=>{
            state.isLoading=false
            state.addressList=[]
        })

        //for updateCart
        .addCase(editAddress.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(editAddress.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.addressList=action.payload.data;
        })
        .addCase(editAddress.rejected,(state)=>{
            state.isLoading=false;
            state.addressList=[];
        })

        //for deleteCart
        .addCase(deleteAddress.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteAddress.fulfilled,(state,action)=>{
            state.isLoading=false
            state.addressList=action.payload.data
        })
        .addCase(deleteAddress.rejected,(state)=>{
            state.isLoading=false;
            state.addressList=[];
        });
    },
});
export default AddressSlice.reducer
