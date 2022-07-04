import { filterSearchVideos } from "../utils";

const initialState = {
    videoList: [],
    filterVideoList: [],
    error: '',
    loading: false,
    activeChip: 'all',
    videoPlaylistInfo: {},
};

const loadActiveVideosBasedOnChip = (state) => {
    const filterResult = state.videoList.filter(({ type }) => type === state.activeChip);
    return filterResult;
}

function videosReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_VIDEOS':
            if (state.activeChip !== 'all') {
                const filterResult = loadActiveVideosBasedOnChip(state);
                return { ...state, videoList: action.payload, filterVideoList: filterResult, loading: false, error: '' };
            }
            return { ...state, videoList: action.payload, filterVideoList: action.payload, loading: false, error: '' };
        case 'LOADING_VIDEOS':
            return { ...state, loading: action.payload, error: '', videoList: state.videoList };
        case 'VIDEOS_ERROR':
            return { ...state, loading: false, error: action.payload, videoList: [] };
        case 'CHANGE_CHIP':
            return { ...state, activeChip: action.payload };
        case 'FILTER_VIDEOS_BASEDON_CHIP':
            if (state.activeChip !== 'all') {
                const filterResult = loadActiveVideosBasedOnChip(state);
                return { ...state, filterVideoList: filterResult };
            }
            return { ...state, filterVideoList: state.videoList };
        case 'VIDEO_ACTIVE_PLAYLIST_MODAL': {
            return { ...state, videoPlaylistInfo: action.payload };
        }
        case 'SEARCH_VIDEOS': {
            const obj = {
                videos: state.videoList, searchText: action.payload?.searchText, type: 'explore', chip: state.activeChip
            }
            const searchVideos = filterSearchVideos(obj);
            return { ...state, filterVideoList: searchVideos };
        }
        default: {
            return initialState;
        }
    }
}

export { videosReducer, initialState };