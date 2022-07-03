import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { MainHeader } from '../../components/main-header';
import { MainSection } from '../../components/main-section';
import { SearchInput } from '../../components/search';
import { Sidebar } from '../../components/sidebar'
import Video from '../../components/video';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '../../utils';

export function History() {
    const [historyVideos, setHistoryVideos] = useState(getLocalStorageItem('retro-tube-history'));
    const [filterHistoryVideos, setFilterHistoryVideos] = useState(getLocalStorageItem('retro-tube-history'));
    const [searchValue, setSearchValue] = useState('');

    const removeFromHistory = (video) => {
        const remainingVideos = historyVideos.filter(({ _id }) => _id !== video._id);
        setHistoryVideos(remainingVideos);
        setLocalStorageItem('retro-tube-history', JSON.stringify(remainingVideos));
    }

    const clearHistory = () => {
        removeLocalStorageItem('retro-tube-history');
        setHistoryVideos([]);
    }

    const searchWatchLaterVideos = (value = '') => {
        if (value) {
            setFilterHistoryVideos(filterHistoryVideos({ videos: historyVideos, searchText: value }));
        } else {
            setFilterHistoryVideos(getLocalStorageItem('retro-tube-watchlater'));
        }
    }

    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <MainSection data={historyVideos?.length} type='history'>
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
                        data={filterHistoryVideos?.length}
                        title='History'
                        btn='Clear history'
                        icon={<AiOutlineDelete />}
                        onClick={clearHistory}
                    />
                    <main className={filterHistoryVideos?.length ? 'videos' : 'no_video'}>
                        {filterHistoryVideos?.map(item => {
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
            </div>
        </section>
    )
}