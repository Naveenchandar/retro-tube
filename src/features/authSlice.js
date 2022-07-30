import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { notification, getLocalStorageItem } from 'utils';

const initialState = {
    user: getLocalStorageItem('retro-tube-token'),
    error: '',
    loading: false,
    signUpError: '',
    signUpLoading: false
}

export const loginUser = createAsyncThunk("auth/loginUser", async (info, { dispatch }) => {
    try {
        const { status, data } = await axios.post("/api/auth/login", info)
        if (status === 200 && data?.encodedToken) {
            notification('success', 'logged in successfully');
            axios.defaults.headers.common["authorization"] = data?.encodedToken;
            dispatch(updateUser(jwt_decode(data?.encodedToken)));
            localStorage.setItem("retro-tube-token", data?.encodedToken);
            return data;
        } else {
            throw new Error('Email or Password is incorrect');
        }
    } catch (error) {
        return error?.response?.data || { error: error?.message };
    }
});

export const signupUser = createAsyncThunk("auth/signupUser", async (info) => {
    try {
        const { status, data } = await axios.post("/api/auth/signup", info)
        if (status === 201 && data?.createdUser?.id && data?.encodedToken) {
            return data;
        } else {
            throw new Error('Email or Password is incorrect');
        }
    } catch (error) {
        return error?.response?.data || { error: error?.message };
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            if (action.payload.error) {
                state.error = action.payload.error;
            } else {
                state.user = action.payload?.foundUser;
            }
            state.loading = false;
        },
        [loginUser.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.user = {};
        },
        [signupUser.pending]: (state, action) => {
            state.signUpLoading = true;
        },
        [signupUser.fulfilled]: (state, action) => {
            state.signUpLoading = false;
            state.signUpError = action?.payload?.error;
        },
        [signupUser.rejected]: (state, action) => {
            state.signUpLoading = false;
        }

    }
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;