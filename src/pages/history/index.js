import React from 'react'
import { useState } from 'react/cjs/react.development';
import { NoVideos } from '../../components/no-videos';
import { Sidebar } from '../../components/sidebar'
import Video from '../../components/video';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils';

export function History() {
    const [historyVideos, setHistoryVideos] = useState(getLocalStorageItem('retro-tube-history'));
    
    const removeFromHistory = (video) => {
        const remainingVideos = historyVideos.filter(({ _id }) => _id !== video._id);
        setHistoryVideos(remainingVideos);
        setLocalStorageItem('retro-tube-history', JSON.stringify(remainingVideos));
    }

    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <main className={historyVideos?.length ? 'videos' : 'no_video'}>
                    {historyVideos?.length > 0 ? historyVideos?.map(item => {
                        return (
                            <Video
                                data={item}
                                key={item._id}
                                moreAction={removeFromHistory}
                                history
                            />
                        )
                    }) :
                        <NoVideos type='history' />
                    }
                </main>
            </div>
        </section>
    )
}