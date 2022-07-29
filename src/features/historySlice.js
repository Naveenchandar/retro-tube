import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { filterSearchVideos, notification } from 'utils';

const initialState = {
    videos: [],
    filterVideos: [],
    loading: false,
    error: ''
}

export const fetchHistoryVideos = createAsyncThunk('get/history', async () => {
    try {
        const { data: { history } } = await axios.get('/api/user/history');
        return history;
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
    }
});

export const addToHistoryVideos = createAsyncThunk('get/history', async (video, { rejectWithValue }) => {
    try {
        const { data: { history } } = await axios.post('/api/user/history', { video });
        return history;
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
    }
});

export const removeVideoFromHistory = createAsyncThunk('remove/video/history', async (videoId, { rejectWithValue }) => {
    try {
        const { data: { history } } = await axios.delete(`/api/user/history/${videoId}`)
        notification('success', 'video removed from history');
        return history;
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
        rejectWithValue(error?.response?.data?.error || error?.message);
    }
})

export const removeAllVideosFromHistory = createAsyncThunk('clear/history', async () => {
    try {
        const { data: { history } } = await axios.delete('api/user/history/all');
        notification('success', 'All videos history cleared successfully');
        return history;
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
    }
})

const historySlice = createSlice({
    name: 'history',
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
        [fetchHistoryVideos.pending]: (state) => {
            state.loading = true;
        },
        [fetchHistoryVideos.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.videos = payload;
            state.filterVideos = payload;
        },
        [fetchHistoryVideos.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.videos = [];
            state.filterVideos = []
        },
        [addToHistoryVideos.pending]: (state) => {
            state.loading = true;
        },
        [addToHistoryVideos.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.videos = payload;
            state.filterVideos = payload;
        },
        [addToHistoryVideos.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.videos = [];
            state.filterVideos = []
        },
        [removeVideoFromHistory.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.videos = payload;
            state.filterVideos = payload;
        },
        [removeVideoFromHistory.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.videos = [];
            state.filterVideos = []
        },
        [removeAllVideosFromHistory.pending]: (state) => {
            state.loading = true;
        },
        [removeAllVideosFromHistory.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.videos = payload;
            state.filterVideos = payload;
        },
        [removeAllVideosFromHistory.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.videos = [];
            state.filterVideos = []
        }
    }
})

export const { searchVideos } = historySlice.actions;

export default historySlice.reducer;