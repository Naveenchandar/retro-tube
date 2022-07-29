import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MainHeader, MainSection, SearchInput, Sidebar, Video } from 'components';
import { filterSearchVideos } from 'utils';
import './index.css';
import { fetchWatchLaterVideos, removeWatchLaterVideo, searchVideos } from 'features/watchLaterSlice';

export function WatchLater() {
    const { videos, filterVideos, loading } = useSelector(state => state.watchlater);
    const dispatch = useDispatch();
    // const [watchLaterVideos, setWatchlaterVideos] = useState(getLocalStorageItem('retro-tube-watchlater'));
    // const [filterWatchLaterVideos, setFilterWatchlaterVideos] = useState(getLocalStorageItem('retro-tube-watchlater'));
    const [showOptions, setShowOptions] = useState();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        (async () => {
            await dispatch(fetchWatchLaterVideos());
        })()
    }, [dispatch])

    const handleMoreOptions = (videoId) => {
        setShowOptions(videoId);
    }
    const handleFromRemoveWatchLater = async (video) => {
        await dispatch(removeWatchLaterVideo(video?._id));
        // const remainingVideos = watchLaterVideos.filter(({ _id }) => _id !== video._id);
        // setWatchlaterVideos(remainingVideos);
        // setFilterWatchlaterVideos(remainingVideos);
        // setLocalStorageItem('retro-tube-watchlater', JSON.stringify(remainingVideos));
        setShowOptions('');
    }

    const searchWatchLaterVideos = (value = '') => {
        dispatch(searchVideos(value));
        // if (value) {
        //     setFilterWatchlaterVideos(filterSearchVideos({ videos: watchLaterVideos, searchText: value }));
        // } else {
        //     setFilterWatchlaterVideos(getLocalStorageItem('retro-tube-watchlater'));
        // }
    }

    return (
        <section>
            <div className='flex watch_later'>
                <Sidebar />
                {loading ? 'Loading...' :
                    <MainSection data={videos?.length} type='watch later'>
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
                            data={filterVideos?.length}
                            title='Watch later'
                        />
                        <main className={filterVideos?.length ? 'videos group_videos' : 'no_video'}>
                            {filterVideos?.map(item => {
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
                }
            </div>
        </section>
    )
}