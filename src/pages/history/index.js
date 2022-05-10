import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { MainHeader } from '../../components/main-header';
import { MainSection } from '../../components/main-section';
import { Sidebar } from '../../components/sidebar'
import Video from '../../components/video';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '../../utils';

export function History() {
    const [historyVideos, setHistoryVideos] = useState(getLocalStorageItem('retro-tube-history'));

    const removeFromHistory = (video) => {
        const remainingVideos = historyVideos.filter(({ _id }) => _id !== video._id);
        setHistoryVideos(remainingVideos);
        setLocalStorageItem('retro-tube-history', JSON.stringify(remainingVideos));
    }

    const clearHistory = () => {
        removeLocalStorageItem('retro-tube-history');
        setHistoryVideos([]);
    }

    const videosLength = historyVideos?.length;

    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <MainSection data={historyVideos?.length} type='history'>
                    <MainHeader
                        data={videosLength}
                        title='History'
                        btn='Clear history'
                        icon={<AiOutlineDelete />}
                        onClick={clearHistory}
                    />
                    <main className={historyVideos?.length ? 'videos' : 'no_video'}>
                        {historyVideos?.map(item => {
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