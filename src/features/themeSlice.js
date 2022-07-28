import { createSlice, current } from '@reduxjs/toolkit';
import { getLocalStorageItem } from 'utils';

const initialState = {
    theme: getLocalStorageItem('theme')
}

const themeSlice = createSlice({
    initialState,
    name: 'theme',
    reducers: {
        loadTheme: (state, action) => {
            const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            state.theme = defaultDark ? 'light' : 'dark';
        },
        changeTheme: (state, action) => {
            const newTheme = current(state).theme === 'light' ? 'dark' : 'light';
            state.theme = newTheme;
        }
    }
});

export const { loadTheme, changeTheme } = themeSlice.actions;

export default themeSlice.reducer;