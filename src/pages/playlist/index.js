import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, NoVideos } from 'components'
import { Video } from 'components/video';
import { notification } from 'utils';
import { playlistDelete, removeVideoFromPlaylist } from 'features/playlistSlice';
import { addToWatchlaterVideos } from 'features/watchLaterSlice';


export function Playlist() {
    const { playlists = [] } = useSelector(state => state.playlist);
    const dispatch = useDispatch();

    const { playlistId } = useParams();
    const navigate = useNavigate();

    const [showOptions, setShowOptions] = useState();
    const { videos = [], _id: playListId, title } = playlists?.find(({ _id }) => _id === playlistId) || '';
    // const watchLaterVideos = useState(getLocalStorageItem('retro-tube-watchlater'));

    const handleMoreOptions = (videoId) => {
        setShowOptions(videoId);
    }

    useEffect(() => {
        return () => {
            setShowOptions();
        }
    }, [])

    const watchLater = async (item) => {
        // const filterDuplicateItem = watchLaterVideos.find(({ _id }) => _id === item._id)
        // if (!filterDuplicateItem) {
        //     const data = [...watchLaterVideos, item];
        //     setLocalStorageItem('retro-tube-watchlater', JSON.stringify(data));
        // }
        await dispatch(addToWatchlaterVideos(item));
        setShowOptions('');
    }

    const deletePlaylist = () => {
        try {
            dispatch(playlistDelete({ _id: playlistId, title }));
            navigate('/playlists');
        } catch (error) {
            notification('danger', error?.response?.data?.error || error?.message);
        }
    }

    const getPlaylistVideosById = () => {
        if (videos?.length) {
            return (
                <main className='videos group_videos'>
                    {videos?.map(item => {
                        return (
                            <Video
                                data={item}
                                key={item._id}
                                options={showOptions}
                                handleMoreOptions={handleMoreOptions}
                                watchLater={watchLater}
                                moreOptionsList={['Remove from playlist', 'Watch later']}
                                handleRemoveFromPlaylist={(video) => {
                                    dispatch(removeVideoFromPlaylist({ playlistId: playListId, videoId: video._id }));
                                    setShowOptions('');
                                }}
                            />
                        )
                    })}
                </main>
            )
        }
        return (
            <NoVideos type='playlist' />
        )
    }

    return (
        <section className='section'>
            <div className='flex'>
                <Sidebar />
                <main className='flex flex_dcolumn w_100 section_videos'>
                    <div className='playlist_head flex justify_spacebtw m-4'>
                        <h1>{title}</h1>
                        <button
                            className="btn btn_primary main_header_btn align_center"
                            onClick={deletePlaylist}
                        ><span className='main_header_btn_caption'>Delete Playlist</span></button>
                    </div>
                    {getPlaylistVideosById()}
                </main>
            </div>
        </section>
    )
}