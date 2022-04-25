import axios from 'axios';
import { useReducer } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { initialState, videosReducer } from '../../reducer/videos';
import { Chips } from '../chips';
import Video from '../video';
import './index.css';


export function Vidoes() {
    const [state, dispatch] = useReducer(videosReducer, initialState);
    const { filterVideoList, loading, error, activeChip } = state;
    useEffect(() => {
        (async () => {
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
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    return (<Video data={item} key={item._id} />)
                })}
            </div>
        </main>
    )
}