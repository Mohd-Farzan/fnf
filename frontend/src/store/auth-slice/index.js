import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Initial state with all properties defined
const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false, // Persist authentication status
    isLoading: false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // Persist user data
    error: null,
};

// Thunk for signing up the user
export const SignupUser = createAsyncThunk(
    'auth/signup',
    async (FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', FormData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // Handle error properly to avoid potential errors
            const message = error.response && error.response.data ? error.response.data : 'An error occurred';
            return rejectWithValue(message);
        }
    }
);

// Thunk for logging in the user
export const LoginUser = createAsyncThunk(
    'auth/login',
    async (FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', FormData, {
                withCredentials: true
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.token); // Store the token
            }
            
            return response.data;
        } catch (error) {
            const message = error.response && error.response.data ? error.response.data : 'An error occurred';
            return rejectWithValue(message);
        }
    }
);


export const LogoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
                withCredentials: true
            });
            localStorage.removeItem('token'); // Remove token from local storage upon logout
            return response?.data;
        } catch (error) {
            const message = error.response && error.response.data ? error.response.data : 'An error occurred';
            return rejectWithValue(message);
        }
    }
);


// Thunk for checking authentication
export const checkAuth = createAsyncThunk(
    'auth/checkauth',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token'); // Fetch the token from localStorage
            const response = await axios.get('http://localhost:5000/api/auth/checkauth', {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                   
                },
            });
            return response.data;
        } catch (error) {
            const message = error.response && error.response.data ? error.response.data : 'An error occurred';
            return rejectWithValue(message);
        }
    }
);

 

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem('isAuthenticated', 'true'); // Persist to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user data
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            localStorage.removeItem('token'); // Remove token from local storage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SignupUser.pending, (state) => {
                state.isLoading = true; // Set isLoading to true when the request is pending
                state.error = null; // Clear any previous errors
            })
            .addCase(SignupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(SignupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload; // Directly set the error message
            })
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user=action.payload.success?action.payload.user:null;
                state.isAuthenticated=action.payload.success?true:false;   
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload // Directly set the error message
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user=action.payload.success?action.payload.user:null;
                state.isAuthenticated=action.payload.success?true : false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload; // Directly set the error message
            }).addCase(LogoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user=null;
                state.isAuthenticated=false;
            })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
