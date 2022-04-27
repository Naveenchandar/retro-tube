const initialState = {
    videoList: [],
    filterVideoList: [],
    error: '',
    loading: false,
    activeChip: 'all'
};
function videosReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_VIDEOS':
            return { ...state, videoList: action.payload, filterVideoList: action.payload, loading: false, error: '' };
        case 'LOADING_VIDEOS':
            return { ...state, loading: action.payload, error: '', videoList: state.videoList };
        case 'VIDEOS_ERROR':
            return { ...state, loading: false, error: action.payload, videoList: [] };
        case 'CHANGE_CHIP':
            return { ...state, activeChip: action.payload };
        case 'FILTER_VIDEOS_BASEDON_CHIP':
            if (state.activeChip !== 'all') {
                const filterResult = state.videoList.filter(({ type }) => type === state.activeChip);
                return { ...state, filterVideoList: filterResult };
            }
            return { ...state, filterVideoList: state.videoList };
        default:
            return initialState
    }
}

export { videosReducer, initialState };