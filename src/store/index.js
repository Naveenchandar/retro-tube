import { configureStore } from '@reduxjs/toolkit';
import videosReducer from '../features/videos/videosSlice';
import categoriesReducer from '../features/categorySlice';
import playlistReducer from '../features/playlistSlice';

export const store = configureStore({
    reducer: {
        videos: videosReducer,
        categories: categoriesReducer,
        playlist: playlistReducer
    }
})