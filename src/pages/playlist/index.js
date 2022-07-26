import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, NoVideos } from 'components'
import { Video } from 'components/video';
import { getLocalStorageItem, setLocalStorageItem } from 'utils';
import { deletePlaylist as playlistDelete, removeVideosFromPlaylist } from 'features/playlistSlice';


export function Playlist() {
    const { playlists = [] } = useSelector(state => state.playlist);
    const dispatch = useDispatch();

    const { playlistId } = useParams();
    const navigate = useNavigate();

    const [showOptions, setShowOptions] = useState();
    const { videos = [], id, name } = playlists?.find(({ id }) => id === playlistId);
    const watchLaterVideos = useState(getLocalStorageItem('retro-tube-watchlater'));

    const handleMoreOptions = (videoId) => {
        setShowOptions(videoId);
    }

    const watchLater = (item) => {
        const filterDuplicateItem = watchLaterVideos.find(({ _id }) => _id === item._id)
        if (!filterDuplicateItem) {
            const data = [...watchLaterVideos, item];
            setLocalStorageItem('retro-tube-watchlater', JSON.stringify(data));
        }
        setShowOptions('');
    }

    const deletePlaylist = (name) => {
        try {
            dispatch(playlistDelete(name));
            navigate('/playlists');
        } catch (error) {
            console.error('playlist delete:', error)
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
                                moreOptionsList={['Remove from playlist', 'Add to Watch later']}
                                handleRemoveFromPlaylist={(video) => dispatch(
                                    dispatch(removeVideosFromPlaylist({ playlistId: id, videoId: video._id }))
                                )}
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
        <section>
            <div className='flex'>
                <Sidebar />
                <main className='flex flex_dcolumn w_100 section_videos'>
                    <div className='playlist_head flex justify_spacebtw m-4'>
                        <h1>{name}</h1>
                        <button
                            className="btn btn_primary main_header_btn align_center"
                            onClick={() => deletePlaylist(name)}
                        ><span className='main_header_btn_caption'>Delete Playlist</span></button>
                    </div>
                    {getPlaylistVideosById()}
                </main>
            </div>
        </section>
    )
}