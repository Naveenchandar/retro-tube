import React, { useState } from 'react'
import { MainHeader } from '../../components/main-header';
import { MainSection } from '../../components/main-section';
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
                <MainSection data={watchLaterVideos?.length} type='watch later'>
                    <MainHeader
                        data={watchLaterVideos?.length}
                        title='Watch later'
                    />
                    <main className={watchLaterVideos?.length ? 'videos' : 'no_video'}>
                        {watchLaterVideos?.map(item => {
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
                        })}
                    </main>
                </MainSection>
            </div>
        </section>
    )
}