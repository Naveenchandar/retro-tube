import React, { useState } from 'react'
import { MainHeader } from '../../components/main-header';
import { MainSection } from '../../components/main-section';
import { SearchInput } from '../../components/search';
import { Sidebar } from '../../components/sidebar';
import Video from '../../components/video';
import { filterSearchVideos, getLocalStorageItem, setLocalStorageItem } from '../../utils';

export function LikedVideos() {
    const [likedVideos, setLikedVideos] = useState(getLocalStorageItem('retro-liked-videos'));
    const [filterLikedVideos, setFilterLikedVideos] = useState(getLocalStorageItem('retro-tube-watchlater'))
    const [showOptions, setShowOptions] = useState();
    const [searchValue, setSearchValue] = useState('');

    const handleMoreOptions = (videoId) => {
        setShowOptions(videoId);
    }

    const removeLikedVideos = (video) => {
        const remainingVideos = likedVideos.filter(({ _id }) => _id !== video._id);
        setLikedVideos(remainingVideos);
        setLocalStorageItem('retro-liked-videos', JSON.stringify(remainingVideos));
        setShowOptions('');
    }

    const searchWatchLaterVideos = (value = '') => {
        if (value) {
            setFilterLikedVideos(filterSearchVideos({ videos: likedVideos, searchText: value }));
        } else {
            setFilterLikedVideos(getLocalStorageItem('retro-tube-watchlater'));
        }
    }

    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <MainSection data={likedVideos?.length} type='liked videos'>
                    <div>
                        <SearchInput
                            value={searchValue}
                            onChange={(value) => setSearchValue(value)}
                            placeholder={`Search liked videos`}
                            dispatch={{
                                search: (value) => searchWatchLaterVideos(value),
                                noSearch: () => searchWatchLaterVideos()
                            }}
                        />
                    </div>
                    <MainHeader
                        data={filterLikedVideos?.length}
                        title='Liked videos'
                    />
                    <main className={filterLikedVideos?.length ? 'videos' : 'no_video'}>
                        {filterLikedVideos?.map(item => {
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