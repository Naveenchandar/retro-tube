import React, { useState } from 'react'
import { NoVideos } from '../../components/no-videos';
import { Sidebar } from '../../components/sidebar';
import Video from '../../components/video';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils';

export function LikedVideos() {
    const [likedVideos, setLikedVideos] = useState(getLocalStorageItem('retro-liked-videos'));
    const [showOptions, setShowOptions] = useState();

    const handleMoreOptions = (videoId) => {
        setShowOptions(videoId);
    }

    const removeLikedVideos = (video) => {
        const remainingVideos = likedVideos.filter(({ _id }) => _id !== video._id);
        setLikedVideos(remainingVideos);
        setLocalStorageItem('retro-liked-videos', JSON.stringify(remainingVideos));
        setShowOptions('');
    }

    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <main className={likedVideos?.length ? 'videos' : 'no_video'}>
                    {likedVideos?.length > 0 ? likedVideos?.map(item => {
                        return (
                            <Video
                                data={item}
                                key={item._id}
                                options={showOptions}
                                handleMoreOptions={handleMoreOptions}
                                moreOptionsList={['Remove from liked videos']}
                                like={true}
                                moreAction={removeLikedVideos}
                            />
                        )
                    }) :
                        <NoVideos type='liked videos' />
                    }
                </main>
            </div>
        </section>
    )
}