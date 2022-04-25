import { useState, useEffect } from 'react'
import axios from 'axios';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import './index.css';

export function SingleVideo() {
    const [videoInfo, setVideoInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { videoId } = useParams();

    const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { status, data: { video }, } = await axios.get(`/api/video/${videoId}`);
                if (status === 200 && video?._id) {
                    setVideoInfo(video);
                    setError('');
                } else {
                    throw new Error('Something went wrong while loading, Please try again')
                }
            } catch (error) {
                setVideoInfo({});
                setError(error?.message);
            }
            setLoading(false);
        })()
    }, [videoId])


    const opts = {
        height: '100%',
        width: '100%',
    };

    const renderVideoContent = () => {
        const { alt, title, creator, views, avatar, description } = videoInfo;
        if (loading) {
            return <p>Loading...</p>
        }
        if (error) {
            return <p>{error}</p>
        }
        return (
            <main className='main_video w_100 m-2'>
                <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
                <section className='single_video_info'>
                    <h2 className="my-2">{title}</h2>
                    <div className="flex align_center justify_spacebtw mb-2">
                        <div className="flex">
                            <img alt={alt} src={avatar} className="mr-2 single_video_avatar" />
                            <div className="flex_dcolumn justify_spacebtw">
                                <p>{creator}</p>
                                <div className="flex mt-auto">
                                    <div className="icon-container mr-4">
                                        <span className="material-icons mr-1">visibility</span>
                                        <span>{views}</span>
                                    </div>
                                    <div className="icon-container">
                                        <span className="material-icons-outlined mr-1">timer</span>
                                        <span>15:24</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex my-2 single_video_actions">
                            <button className="icon-container mr-3">
                                <span className="material-icons-outlined">thumb_up</span>
                                Like
                            </button>
                            <button className="icon-container mr-3">
                                <span className="material-icons-outlined">
                                    playlist_add
                                </span>
                                Save to playlist
                            </button>
                            <button className="icon-container">
                                <span className="material-icons-outlined">
                                    watch_later
                                </span>
                                Watch later
                            </button>
                        </div>
                    </div>
                </section>
                <p className='mb-4 single_video_desc'>{description}</p>
            </main>
        )
    }

    return (
        <div className='flex single_video'>
            <Sidebar />
            {renderVideoContent()}
        </div>
    )
}