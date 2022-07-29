import { configureStore } from '@reduxjs/toolkit';
import videosReducer from 'features/videosSlice';
import categoriesReducer from 'features/categorySlice';
import playlistReducer from 'features/playlistSlice';
import authReducer from 'features/authSlice';
import themeReducer from 'features/themeSlice';
import watchlaterReducer from 'features/watchLaterSlice';
import historyReducer from 'features/historySlice';

export const store = configureStore({
    reducer: {
        videos: videosReducer,
        categories: categoriesReducer,
        playlist: playlistReducer,
        user: authReducer,
        theme: themeReducer,
        watchlater: watchlaterReducer,
        history: historyReducer,
    }
})