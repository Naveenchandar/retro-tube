import axios from 'axios';
import React, { useReducer } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Chips from '../chips';
import Video from '../video';
import './index.css';

const initialState = {
    videoList: [],
    filterVideoList: [],
    error: '',
    loading: false,
    activeChip: 'all'
};
function reducer(state = initialState, action) {
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
            if(state.activeChip !== 'all'){
                const filterResult = state.videoList.filter(({ type }) => type === state.activeChip);
                return { ...state, filterVideoList: filterResult };
            }
            return { ...state, filterVideoList: state.videoList };
        default:
            return initialState
    }
}
export function Vidoes() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { filterVideoList, loading, error, activeChip } = state;
    useEffect(() => {
        (async () => {
            await fetchVideoList()
        })()
    }, [])

    const fetchVideoList = async () => {
        dispatch({ type: 'LOADING_VIDEOS', payload: true });
        try {
            const { status, data: { videos = [] } } = await axios.get('/api/videos');
            if (status === 200) {
                dispatch({ type: 'FETCH_VIDEOS', payload: videos });
            } else {
                throw new Error('Something went wrong, Please try again');
            }
        } catch (error) {
            dispatch({ type: 'VIDEOS_ERROR', payload: error.message });
        }
        dispatch({ type: 'LOADING_VIDEOS', payload: false });
    }

    const changeChip = async (value) => {
        dispatch({ type: 'CHANGE_CHIP', payload: value })
        dispatch({ type: 'FILTER_VIDEOS_BASEDON_CHIP' })
    }

    if (error) {
        return <p>{error}</p>
    }

    if (loading) {
        return <p>Loading !...</p>
    }

    return (
        <main className='main_container w_100'>
            <Chips activeChip={activeChip} changeChip={changeChip} />
            <hr />
            <div className='m-2 videos'>
                {filterVideoList.map(item => {
                    return (<Video data={item} key={item.id} />)
                })}
            </div>
        </main>
    )
}