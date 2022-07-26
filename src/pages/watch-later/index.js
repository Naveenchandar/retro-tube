import React, { useState } from 'react'
import { MainHeader, MainSection, SearchInput, Sidebar, Video } from 'components';
import { filterSearchVideos, getLocalStorageItem, setLocalStorageItem } from '../../utils';
import './index.css';

export function WatchLater() {
    const [watchLaterVideos, setWatchlaterVideos] = useState(getLocalStorageItem('retro-tube-watchlater'));
    const [filterWatchLaterVideos, setFilterWatchlaterVideos] = useState(getLocalStorageItem('retro-tube-watchlater'));
    const [showOptions, setShowOptions] = useState();
    const [searchValue, setSearchValue] = useState('');

    const handleMoreOptions = (videoId) => {
        setShowOptions(videoId);
    }
    const handleFromRemoveWatchLater = (video) => {
        const remainingVideos = watchLaterVideos.filter(({ _id }) => _id !== video._id);
        setWatchlaterVideos(remainingVideos);
        setFilterWatchlaterVideos(remainingVideos);
        setLocalStorageItem('retro-tube-watchlater', JSON.stringify(remainingVideos));
        setShowOptions('');
    }

    const searchWatchLaterVideos = (value = '') => {
        if (value) {
            setFilterWatchlaterVideos(filterSearchVideos({ videos: watchLaterVideos, searchText: value }));
        } else {
            setFilterWatchlaterVideos(getLocalStorageItem('retro-tube-watchlater'));
        }
    }

    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <MainSection data={watchLaterVideos?.length} type='watch later'>
                    <div>
                        <SearchInput
                            value={searchValue}
                            onChange={(value) => setSearchValue(value)}
                            placeholder={`Search watch later`}
                            dispatch={{
                                search: (value) => searchWatchLaterVideos(value),
                                noSearch: () => searchWatchLaterVideos()
                            }}
                        />
                    </div>
                    <MainHeader
                        data={filterWatchLaterVideos?.length}
                        title='Watch later'
                    />
                    <main className={filterWatchLaterVideos?.length ? 'videos group_videos' : 'no_video'}>
                        {filterWatchLaterVideos?.map(item => {
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