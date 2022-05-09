import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar'
import { usePlaylist } from '../../context/playlist';
import Video from '../../components/video';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils';
import { NoVideos } from '../../components/no-videos';

export function Playlist() {
    const { state: { playlists = [] } = {}, dispatch } = usePlaylist();
    const { playlistId } = useParams();
    const [showOptions, setShowOptions] = useState();
    const { videos = [], id } = playlists?.find(({ id }) => id === playlistId);
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

    const getPlaylistVideosById = () => {
        if (videos?.length) {
            return videos?.map(item => {
                return (
                    <Video
                        data={item}
                        key={item._id}
                        options={showOptions}
                        handleMoreOptions={handleMoreOptions}
                        watchLater={watchLater}
                        moreOptionsList={['Remove from playlist', 'Add to Watch later']}
                        handleRemoveFromPlaylist={(video) => dispatch(
                            { type: 'REMOVE_VIDEOS_FROM_PLAYLIST', payload: { playlistId: id, videoId: video._id } }
                        )}
                    />
                )
            })
        }
        return (
            <NoVideos type='playlist' />
        )
    }

    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <main className={videos?.length ? 'videos' : 'no_video'}>
                    {getPlaylistVideosById()}
                </main>
            </div>
        </section>
    )
}