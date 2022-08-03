import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { filterSearchVideos, notification } from 'utils';

const initialState = {
    videos: [],
    filterVideos: [],
    loading: false,
    error: ''
}

export const fetchWatchLaterVideos = createAsyncThunk('get/watchlater', async () => {
    try {
        const { data: { watchlater } } = await axios.get('/api/user/watchlater');
        return watchlater;
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
    }
});

export const addToWatchlaterVideos = createAsyncThunk('add/watchlater', async (video, { rejectWithValue }) => {
    try {
        const { data: { watchlater } } = await axios.post('/api/user/watchlater', { video });
        notification('success', `Added to watch later videos`);
        return watchlater;
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
        return rejectWithValue('danger', error?.response?.data?.error || error?.message);
    }
});

export const removeWatchLaterVideo = createAsyncThunk('delete/watchlater', async (videoId, { dispatch }) => {
    try {
        await axios.delete(`/api/user/watchlater/${videoId}`)
        notification('success', `Removed from watch later videos`);
        await dispatch(fetchWatchLaterVideos());
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
    }
})

const watchlaterSlice = createSlice({
    name: 'watchlater',
    initialState,
    reducers: {
        searchVideos: (state, { payload }) => {
            const currentState = current(state);
            if (payload) {
                state.filterVideos = filterSearchVideos({ videos: currentState.videos, searchText: payload })
            } else {
                state.filterVideos = currentState.videos;
            }
        }
    },
    extraReducers: {
        [fetchWatchLaterVideos.pending]: (state) => {
            state.loading = true;
        },
        [fetchWatchLaterVideos.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.videos = payload;
            state.filterVideos = payload;
        },
        [addToWatchlaterVideos.pending]: (state) => {
            state.loading = true;
        },
        [addToWatchlaterVideos.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.videos = payload;
            state.filterVideos = payload;
        },
        [addToWatchlaterVideos.rejected]: (state, { payload }) => {
            state.loading = false;
            state.videos = [];
            state.filterVideos = [];
        },
        [removeWatchLaterVideo.fulfilled]: (state, { payload }) => {
            state.videos = payload;
            state.filterVideos = payload;
        },
    }
})

export const { searchVideos } = watchlaterSlice.actions;

export default watchlaterSlice.reducer;