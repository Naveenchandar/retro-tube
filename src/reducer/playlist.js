import { getLocalStorageItem, setLocalStorageItem } from "../utils";
import { v4 as uuid } from "uuid";

export const initialState = {
    showInput: false,
    inputValue: '',
    inputError: '',
    playlists: getLocalStorageItem('retro-tube-playlist'),
    currentVideo: '',
    editPlaylist: ''
}

export function playlistReducer(state = initialState, { type, payload }) {
    const { playlists, inputValue, showInput, currentVideo, editPlaylist } = state;
    switch (type) {
        case 'TOGGLE_INPUT': {
            return { ...state, showInput: !showInput };
        }
        case 'INPUT_CHANGE': {
            return { ...state, inputValue: payload, inputError: '' };
        }
        case 'INPUT_ERROR': {
            return { ...state, inputError: payload };
        }
        case 'CREATE_PLAYLIST': {
            if (!inputValue) {
                return { ...state, inputError: 'Please enter playlist name' }
            }
            const filterDuplicateItem = playlists.find(({ name }) => name === inputValue);
            if (!filterDuplicateItem) {
                const data = [...playlists, { id: uuid(), name: inputValue, videos: [] }];
                setLocalStorageItem('retro-tube-playlist', JSON.stringify(data));
                return { ...state, playlists: data, inputValue: '', inputError: '', showInput: !showInput };
            }
            return { ...state, inputError: 'Playlist name already exists' }
        }
        case 'VIDEO_ACTIVE_PLAYLIST_MODAL': {
            return { ...state, currentVideo: payload }
        }
        case 'ADD_VIDEOS_TO_PLAYLIST': {
            const data = playlists.map((item) => {
                const { name, videos } = item;
                if (name === payload?.name) {
                    return {
                        ...item, videos: [...videos, currentVideo]
                    }
                }
                return item;
            });
            setLocalStorageItem('retro-tube-playlist', JSON.stringify(data));
            return { ...state, playlists: data };
        }
        case 'DELETE_PLAYLIST': {
            const remainingPlaylist = playlists.filter(({ name }) => name !== payload?.name);
            return { ...state, playlists: remainingPlaylist }
        }
        case 'EDIT_PLAYLIST': {
            const findPlaylist = playlists.find(({ name }) => name === payload?.name);
            return { ...state, inputValue: findPlaylist?.name, editPlaylist: findPlaylist, showInput: true }
        }
        case 'UPDATE_PLAYLIST': {
            if (!inputValue) {
                return { ...state, inputError: 'Please enter playlist name' }
            }
            const filterDuplicateItem = playlists.find(({ name }) => name === inputValue && name !== editPlaylist?.name);
            if (filterDuplicateItem) {
                return { ...state, inputError: 'Playlist name already exists' }
            }
            const data = playlists.map(item => {
                const { id } = item;
                if (id === editPlaylist?.id) {
                    return { ...item, name: inputValue };
                }
                return item;
            });
            setLocalStorageItem('retro-tube-playlist', JSON.stringify(data));
            return { ...state, playlists: data, inputValue: '', inputError: '', showInput: false };
        }
        case 'REMOVE_VIDEOS_FROM_PLAYLIST': {
            const { playlistId, videoId } = payload;
            const result = playlists.map((item) => {
                const { id, videos } = item;
                if (id === playlistId) {
                    return { ...item, videos: videos.filter(({ _id }) => _id !== videoId) };
                }
                return { ...item };
            });
            return { ...state, playlists: result };
        }
        default: {
            return initialState;
        }
    }
}