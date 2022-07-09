import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorageItem } from '../utils';

const initialState = {
    user: getLocalStorageItem('retro-tube-token')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;