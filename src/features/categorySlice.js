import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    categoryList: [],
    error: '',
    loading: false
}

export const fetchCategories = createAsyncThunk("categories/loadCategories", async () => {
    try {
        const { status, data } = await axios.get('/api/categories');
        if (status === 200 && data) {
            return data;
        } else {
            throw new Error('Something went wrong while loading categories, Please try again');
        }
    } catch (error) {
        return JSON.parse(JSON.stringify(error?.response?.data?.error || error?.message));
    }
})

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: {
        [fetchCategories.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchCategories.fulfilled]: (state, action) => {
            if (action.payload?.categories) {
                state.categoryList = action.payload.categories;
            } else {
                state.error = action.payload;
            }
            state.loading = false;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.categoryList = [];
        }
    }
});

export default categorySlice.reducer;