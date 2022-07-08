import { createSlice, current } from '@reduxjs/toolkit';
import { filterSearchVideos, getLocalStorageItem, setLocalStorageItem } from '../utils';
import { v4 as uuid } from "uuid";

const initialState = {
    showInput: false,
    inputValue: '',
    inputError: '',
    playlists: getLocalStorageItem('retro-tube-playlist'),
    filterPlaylists: getLocalStorageItem('retro-tube-playlist'),
    currentVideo: '',
    editPlaylist: ''
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        toggleInput: (state, action) => {
            state.showInput = !state.showInput;
        },
        inputChange: (state, action) => {
            state.inputValue = action.payload;
            state.inputError = '';
        },
        inputError: (state, action) => {
            state.inputError = action.payload;
        },
        playlistCreate: (state, action) => {
            const currentState = current(state);
            const filterDuplicateItem = currentState.playlists.find(({ name }) => name === currentState.inputValue);
            if (!state.inputValue) {
                state.inputError = 'Please enter playlist name';
            } else if (!filterDuplicateItem) {
                const data = [...currentState.playlists, { id: uuid(), name: currentState.inputValue, videos: [] }];
                setLocalStorageItem('retro-tube-playlist', JSON.stringify(data));
                state.playlists = data;
                state.inputValue = '';
                state.inputError = '';
                state.showInput = !state.showInput;
            } else {
                state.inputError = 'Playlist name already exists';
            }
            initPlaylist();
        },
        videoActivePlaylistModal: (state, action) => {
            state.currentVideo = action.payload;
        },
        videosAddToPlaylist: (state, action) => {
            const data = current(state).playlists.map((item) => {
                const { name, videos } = item;
                if (name === action.payload?.name) {
                    return {
                        ...item, videos: [...videos, state.currentVideo]
                    }
                }
                return item;
            });
            setLocalStorageItem('retro-tube-playlist', JSON.stringify(data));
            return { ...state, playlists: data };
        },
        deletePlaylist: (state, action) => {
            const remainingPlaylist = current(state).playlists.filter(({ name }) => name?.toLowerCase() !== action.payload?.name);
            state.playlists = remainingPlaylist;
        },
        editPlaylist: (state, action) => {
            const currentState = current(state);
            const findPlaylist = currentState.playlists.find(({ name }) => name === currentState.payload?.name);
            state.inputValue = findPlaylist?.name;
            state.editPlaylist = findPlaylist;
            state.showInput = true;
        },
        updatePlaylist: (state, action) => {
            const currentState = current(state);
            const filterDuplicateItem = currentState.playlists.find(({ name }) => name === (
                currentState.inputValue && name !== currentState.editPlaylist?.name
            ));
            if (!currentState.inputValue) {
                state.inputError = 'Please enter playlist name';
            } else if (filterDuplicateItem) {
                state.inputError = 'Playlist name already exists';
            } else {
                const data = currentState.playlists.map(item => {
                    const { id } = item;
                    if (id === currentState.editPlaylist?.id) {
                        return { ...item, name: currentState.inputValue };
                    }
                    return item;
                });
                setLocalStorageItem('retro-tube-playlist', JSON.stringify(data));
                state.playlists = data;
                state.inputValue = '';
                state.inputError = '';
                state.showInput = false;
            }
            initPlaylist();
        },
        removeVideosFromPlaylist: (state, action) => {
            const currentSate = current(state);
            const { playlistId, videoId } = action.payload;
            const result = currentSate.playlists.map((item) => {
                const { id, videos } = item;
                if (id === playlistId) {
                    return { ...item, videos: videos.filter(({ _id }) => _id !== videoId) };
                }
                return { ...item };
            });
            state.playlists = result;
        },
        searchPlaylist: (state, action) => {
            const currentSate = current(state);
            const obj = {
                videos: currentSate.playlists, searchText: action.payload?.searchText, type: 'playlist'
            }
            const searchVideos = filterSearchVideos(obj);
            state.filterPlaylists = searchVideos;
        },
        initPlaylist: (state, action) => {
            state.filterPlaylists = current(state).playlists;
        }
    }
});

export const {
    toggleInput, inputChange, inputError, playlistCreate,
    videoActivePlaylistModal, videosAddToPlaylist,
    deletePlaylist, editPlaylist, updatePlaylist, removeVideosFromPlaylist,
    searchPlaylist, initPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;