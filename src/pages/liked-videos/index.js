import React, { useState } from 'react'
import { MainHeader } from '../../components/main-header';
import { MainSection } from '../../components/main-section';
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
                <MainSection data={likedVideos?.length} type='liked videos'>
                    <MainHeader
                        data={likedVideos?.length}
                        title='Liked videos'
                    />
                    <main className={likedVideos?.length ? 'videos' : 'no_video'}>
                        {likedVideos?.map(item => {
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
                        })}
                    </main>
                </MainSection>
            </div>
        </section>
    )
}