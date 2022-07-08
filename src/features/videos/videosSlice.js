import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { filterSearchVideos } from '../../utils';

const initialState = {
    videoList: [],
    filterVideoList: [],
    error: '',
    loading: false,
    activeChip: 'all',
    videoPlaylistInfo: {},
}

const loadActiveVideosBasedOnChip = (state) => {
    const filterResult = state.videoList.filter(({ type }) => type === state.activeChip);
    return filterResult;
}

export const loadVideos = createAsyncThunk("videos/loadVideos", async () => {
    try {
        const { status, data } = await axios.get("/api/videos");
        if (status === 200) {
            fetchVideos(data?.videos);
            return data;
        }
        throw new Error('Something went wrong, Please try again');
    } catch (error) {
        return JSON.parse(JSON.stringify(error?.response?.data?.error || error?.message));
    }
});

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        fetchVideos: (state, action) => {
            if (state.activeChip !== 'all') {
                const filterResult = loadActiveVideosBasedOnChip(state);
                state.videoList = action.payload;
                state.filterVideoList = filterResult;
                state.loading = false;
                state.error = ''
            } else {
                state.videoList = action.payload;
                state.filterVideoList = action.payload;
                state.loading = false;
                state.error = ''
            }
        },
        loadingVideos: (state, action) => {
            state.loading = action.payload;
            state.error = '';
        },
        loadVideosError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.videoList = [];
            state.filterVideoList = [];
        },
        chipOnChange: (state, action) => {
            state.activeChip = action.payload;
        },
        filterBasedOnActiveChip: (state, action) => {
            if (state.activeChip !== 'all') {
                const filterResult = loadActiveVideosBasedOnChip(current(state));
                state.filterVideoList = filterResult;
            } else {
                state.filterVideoList = state.videoList;
            }
        },
        videoActivePlaylistModal: (state, action) => {
            state.videoPlaylistInfo = action.payload;
        },
        searchVideos: (state, action) => {
            const obj = {
                videos: current(state).videoList, searchText: action.payload?.searchText, type: 'explore', chip: current(state).activeChip
            }
            const searchVideos = filterSearchVideos(obj);
            state.filterVideoList = searchVideos;
        }
    },
    extraReducers: {
        [loadVideos.pending]: (state) => {
            state.loading = true;
        },
        [loadVideos.fulfilled]: (state, action) => {
            if (action.payload?.videos) {
                state.videoList = action.payload.videos;
                state.filterVideoList = action.payload.videos;
            } else {
                state.error = action.payload;
            }
            state.loading = false;
        },
        [loadVideos.rejected]: (state, action) => {
            state.error = action.error;
        }
    }

})

export const {
    fetchVideos, loadingVideos, loadVideosError, chipOnChange,
    filterBasedOnActiveChip, videoActivePlaylistModal, searchVideos
} = videosSlice.actions;

export default videosSlice.reducer;