import { createSlice, current } from '@reduxjs/toolkit';
import { getLocalStorageItem, setLocalStorageItem } from 'utils';

const initialState = {
    theme: getLocalStorageItem('retro-tube-theme')
}

const themeSlice = createSlice({
    initialState,
    name: 'theme',
    reducers: {
        loadTheme: (state, action) => {
            const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            state.theme = defaultDark ? 'dark' : 'light';
        },
        changeTheme: (state, action) => {
            const newTheme = current(state).theme === 'light' ? 'dark' : 'light';
            setLocalStorageItem('retro-tube-theme', newTheme);
            state.theme = newTheme;
        }
    }
});

export const { loadTheme, changeTheme } = themeSlice.actions;

export default themeSlice.reducer;