import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { MainHeader, MainSection, Modal, SearchInput, Sidebar, Video } from 'components';
import { fetchHistoryVideos, removeVideoFromHistory, searchVideos, removeAllVideosFromHistory } from 'features/historySlice';
import './index.css';

export function History() {
    const { videos, filterVideos, loading } = useSelector(state => state.history);
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(fetchHistoryVideos());
        })()
        return () => {
            setSearchValue('');
        }
    }, [dispatch])

    const removeFromHistory = async (video) => {
        await dispatch(removeVideoFromHistory(video._id));
    }

    const clearHistory = async () => {
        await dispatch(removeAllVideosFromHistory());
        setIsModalOpen(false);
    }

    const searchWatchLaterVideos = (value = '') => {
        dispatch(searchVideos(value));
    }

    return (
        <section className='section history_section'>
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
                            onClick={() => setIsModalOpen(true)}
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
                <Modal
                    open={isModalOpen}
                    close={() => setIsModalOpen(false)}
                    type='History'
                    onOk={clearHistory}
                />
            </div>
        </section>
    )
}