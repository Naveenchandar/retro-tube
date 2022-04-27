import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { Sidebar } from '../../components/sidebar'
import Video from '../../components/video';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils';
import './index.css';

export function WatchLater() {
    const [watchLaterVideos, setWatchlaterVideos] = useState(getLocalStorageItem('retro-tube-watchlater'));
    const [showOptions, setShowOptions] = useState();

    const handleMoreOptions = (videoId) => {
        setShowOptions(videoId);
    }
    const handleFromRemoveWatchLater = (video) => {
        const remainingVideos = watchLaterVideos.filter(({ _id }) => _id !== video._id);
        setWatchlaterVideos(remainingVideos);
        setLocalStorageItem('retro-tube-watchlater', JSON.stringify(remainingVideos));
        setShowOptions('');
    }
    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <main className={watchLaterVideos?.length ? 'videos' : 'no_video'}>
                    {watchLaterVideos?.length > 0 ? watchLaterVideos?.map(item => {
                        return (
                            <Video
                                data={item}
                                key={item._id}
                                options={showOptions}
                                handleMoreOptions={handleMoreOptions}
                                moreOptionsList={['Add to playlist', 'Remove from Watch later']}
                                handleFromRemoveWatchLater={handleFromRemoveWatchLater}
                            />
                        )
                    }) :
                        <div className='text_center'>
                            <p className='my-2'>No videos to watch, Please add videos to watch later</p>
                            <Link to='/explore'>Explore All Videos</Link>
                        </div>
                    }
                </main>
            </div>
        </section>
    )
}