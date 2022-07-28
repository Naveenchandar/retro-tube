import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { filterSearchVideos, getLocalStorageItem, notification, setLocalStorageItem } from 'utils';

const initialState = {
    showInput: false,
    inputValue: '',
    inputError: '',
    playlists: getLocalStorageItem('retro-tube-playlist'),
    filterPlaylists: getLocalStorageItem('retro-tube-playlist'),
    currentVideo: '',
    editPlaylist: '',
    addPlaylist: {
        loading: false,
        error: '',
        data: {}
    }
}

export const addPlaylists = createAsyncThunk('add/playlists', async (newPlaylistName, action) => {
    try {
        const { playlist: { inputValue, playlists } } = action.getState();
        const filterDuplicateItem = playlists?.find(({ title }) => title?.toLowerCase()?.trim() === inputValue?.toLowerCase()?.trim());
        if (!inputValue) {
            throw new Error('Please enter playlist name');
        } else if (!filterDuplicateItem) {
            const {
                status, data,
            } = await axios.post("/api/user/playlists", {
                playlist: { title: newPlaylistName }
            });
            if (status === 201) {
                notification('success', `${newPlaylistName} playlist created`);
                return data;
            } else {
                throw new Error('Error while creating playlist, please try again');
            }
        } else {
            throw new Error('Playlist name already exists');
        }
    } catch (error) {
        notification('danger', error?.response?.data?.error || error?.message);
        return { error: error?.response?.data?.error || error?.message }
    }
})

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
            // const currentState = current(state);
            // const filterDuplicateItem = currentState.playlists.find(({ name }) => name === currentState.inputValue);
            // if (!state.inputValue) {
            //     state.inputError = 'Please enter playlist name';
            // } else if (!filterDuplicateItem) {
            //     const data = [...currentState.playlists, { id: uuid(), name: currentState.inputValue, videos: [] }];
            //     setLocalStorageItem('retro-tube-playlist', JSON.stringify(data));
            //     state.playlists = data;
            //     state.inputValue = '';
            //     state.inputError = '';
            //     state.showInput = !state.showInput;
            //     notification('success', `${currentState.inputValue} playlist created`);
            // } else {
            //     state.inputError = 'Playlist name already exists';
            // }
            // initPlaylist();
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
            const playlistName = action.payload.name || action.payload;
            const remainingPlaylist = current(state).playlists.filter(({ name }) => name?.toLowerCase() !== playlistName?.toLowerCase());
            state.playlists = remainingPlaylist;
            setLocalStorageItem('retro-tube-playlist', JSON.stringify(remainingPlaylist));
            notification('success', `${playlistName} playlist deleted`);
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
                notification('success', `${currentState.inputValue} playlist updated`);
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
            notification('success', 'playlist video removed');
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
            state.playlists = current(state).playlists;
            state.filterPlaylists = current(state).playlists;
        }
    },
    extraReducers: {
        [addPlaylists.pending]: (state, action) => {
            state.addPlaylist.loading = true;
        },
        [addPlaylists.fulfilled]: (state, action) => {
            state.addPlaylist.loading = true;
            if (action.payload.playlists) {
                state.addPlaylist.data = action.payload.playlists;
                state.playlists = action.payload.playlists;
                state.inputValue = '';
                state.showInput = !state.showInput;
            }
            if (action.payload.error) {
                state.addPlaylist.error = action.payload.error;
                state.addPlaylist.addPlaylist = {};
            }
            state.addPlaylist.loading = false;
        },
        [addPlaylists.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.addPlaylist = {};
        },
    }
});

export const {
    toggleInput, inputChange, inputError, playlistCreate,
    videoActivePlaylistModal, videosAddToPlaylist,
    deletePlaylist, editPlaylist, updatePlaylist, removeVideosFromPlaylist,
    searchPlaylist, initPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;