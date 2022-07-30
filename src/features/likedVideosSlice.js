import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { filterSearchVideos, notification } from "utils";

const initialState = {
    videos: [],
    filterVideos: [],
    loading: false,
    error: ''
}

export const fetchAllLikedVideos = createAsyncThunk('get/alllikedvideos', async () => {
    try {
        const { data: { likes } } = await axios.get('/api/user/likes');
        return likes;
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
    }
});

export const addToLikedVideos = createAsyncThunk('add/likedvideos', async (video) => {
    try {
        const { data: { likes } } = await axios.post('/api/user/likes', { video });
        notification('success', 'video added to liked videos');
        return likes;
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
    }
});

export const removedLikedVideo = createAsyncThunk('remove/video', async (videoId, { rejectWithValue }) => {
    try {
        const { data: { likes } } = await axios.delete(`/api/user/likes/${videoId}`);
        notification('success', 'video removed from liked videos');
        return likes;
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
        rejectWithValue(error?.response?.data?.error || error?.message);
    }
})

const likedVideoSlice = createSlice({
    name: 'likedvideos',
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
        [fetchAllLikedVideos.pending]: (state) => {
            state.loading = true;
        },
        [fetchAllLikedVideos.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.videos = payload;
            state.filterVideos = payload;
        },
        [fetchAllLikedVideos.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.videos = [];
            state.filterVideos = [];
        },
        [addToLikedVideos.pending]: (state) => {
            state.loading = true;
        },
        [addToLikedVideos.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.videos = payload;
            state.filterVideos = payload;
        },
        [addToLikedVideos.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.videos = [];
            state.filterVideos = [];
        },
        [removedLikedVideo.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.videos = payload;
            state.filterVideos = payload;
        },
        [removedLikedVideo.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.videos = [];
            state.filterVideos = [];
        },
    }
})

export const { searchVideos } = likedVideoSlice.actions;

export default likedVideoSlice.reducer;