import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePlaylist } from '../../context/playlist';
import { useVideos } from '../../context/videos';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils';
import { Chips } from '../chips';
import { PlaylistModal } from '../playlistmodal';
import Video from '../video';
import './index.css';


export function Vidoes() {
    const { state, dispatch } = useVideos();
    const { dispatch: playlistDispatch } = usePlaylist();
    const location = useLocation();
    const { filterVideoList, loading, error, activeChip } = state;
    const [showOptions, setShowOptions] = useState();
    const [watchLaterVideos, setWatchLaterVideos] = useState(getLocalStorageItem('retro-tube-watchlater'));
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        (async () => {
            dispatch({ type: 'LOADING_VIDEOS', payload: true });
            try {
                const { status, data: { videos = [] } } = await axios.get('/api/videos');
                if (status === 200) {
                    dispatch({ type: 'FETCH_VIDEOS', payload: videos });
                    const { state: { categoryName } = '' } = location;
                    if(categoryName){
                        dispatch({ type: 'CHANGE_CHIP', payload: categoryName })
                        dispatch({ type: 'FILTER_VIDEOS_BASEDON_CHIP' })
                    } else {
                        dispatch({ type: 'CHANGE_CHIP', payload: 'all' })
                    }
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

    const handleMoreOptions = (videoId) => {
        setShowOptions(videoId);
    }

    const watchLater = (item) => {
        const filterDuplicateItem = watchLaterVideos.find(({ _id }) => _id === item._id)
        if (!filterDuplicateItem) {
            const data = [...watchLaterVideos, item];
            setWatchLaterVideos([...watchLaterVideos, item]);
            setLocalStorageItem('retro-tube-watchlater', JSON.stringify(data));
        }
        setShowOptions('');
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
                    return (
                        <Video
                            data={item}
                            key={item._id}
                            options={showOptions}
                            handleMoreOptions={handleMoreOptions}
                            watchLater={watchLater}
                            showPlaylist={(data) => {
                                setShowModal(true);
                                playlistDispatch({ type: 'VIDEO_ACTIVE_PLAYLIST_MODAL', payload: data });
                            }}
                            moreOptionsList={['Add to playlist', 'Watch later']}
                        />
                    )
                })}
            </div>
            <PlaylistModal
                show={showModal}
                onHide={() => { setShowModal(false); setShowOptions(''); }}
            />
        </main>
    )
}