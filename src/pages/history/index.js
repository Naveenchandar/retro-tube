import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { MainHeader, MainSection, SearchInput, Sidebar, Video } from 'components';
import { fetchHistoryVideos, removeVideoFromHistory, searchVideos, removeAllVideosFromHistory } from 'features/historySlice';
// import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from 'utils';

export function History() {
    const { videos, filterVideos, loading } = useSelector(state => state.history);
    const dispatch = useDispatch();
    // const [historyVideos, setHistoryVideos] = useState(getLocalStorageItem('retro-tube-history'));
    // const [filterHistoryVideos, setFilterHistoryVideos] = useState(getLocalStorageItem('retro-tube-history'));
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        (async () => {
            await dispatch(fetchHistoryVideos());
        })()
    }, [dispatch])

    const removeFromHistory = async (video) => {
        // const remainingVideos = historyVideos.filter(({ _id }) => _id !== video._id);
        // setHistoryVideos(remainingVideos);
        // setFilterHistoryVideos(remainingVideos);
        // setLocalStorageItem('retro-tube-history', JSON.stringify(remainingVideos));
        await dispatch(removeVideoFromHistory(video._id));
    }

    const clearHistory = async () => {
        // removeLocalStorageItem('retro-tube-history');
        // setHistoryVideos([]);
        // setFilterHistoryVideos([]);
        await dispatch(removeAllVideosFromHistory());
    }

    const searchWatchLaterVideos = (value = '') => {
        dispatch(searchVideos(value));
        // if (value) {
        //     setFilterHistoryVideos(filterHistoryVideos({ videos: historyVideos, searchText: value }));
        // } else {
        //     setFilterHistoryVideos(getLocalStorageItem('retro-tube-watchlater'));
        // }
    }

    return (
        <section className='section'>
            <div className='flex'>
                <Sidebar />
                {loading ? 'Loading...' :
                    <MainSection data={videos?.length} type='history'>
                        <div>
                            <SearchInput
                                value={searchValue}
                                onChange={(value) => setSearchValue(value)}
                                placeholder={`Search history`}
                                dispatch={{
                                    search: (value) => searchWatchLaterVideos(value),
                                    noSearch: () => searchWatchLaterVideos()
                                }}
                            />
                        </div>
                        <MainHeader
                            data={filterVideos?.length}
                            title='History'
                            btn='Clear history'
                            icon={<AiOutlineDelete />}
                            onClick={clearHistory}
                        />
                        <main className={filterVideos?.length ? 'videos group_videos' : 'no_video'}>
                            {filterVideos?.map(item => {
                                return (
                                    <Video
                                        data={item}
                                        key={item._id}
                                        moreAction={removeFromHistory}
                                        history
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