import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { NoVideos } from '../../components/no-videos';
import { Sidebar } from '../../components/sidebar'
import Video from '../../components/video';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '../../utils';
import './index.css';

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
                <section className='w_100 section_videos'>
                    {historyVideos?.length > 0 ?
                        <>
                            <div className='flex justify_spacebtw'>
                                <h1 className='text_left p-3'> History - &nbsp;
                                    <span>
                                        {videosLength > 1 ? `${videosLength} videos` : `${videosLength} video`}
                                    </span>
                                </h1>
                                <button className="btn btn_primary clear_history_btn align_center" onClick={clearHistory}>
                                    <AiOutlineDelete /> &nbsp;
                                    <span>Clear history</span>
                                </button>
                            </div>
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
                        </>
                        :
                        <NoVideos type='history' />
                    }
                </section>
            </div>
        </section>
    )
}