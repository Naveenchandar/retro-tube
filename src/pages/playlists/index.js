import React from 'react'
import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar'
import { Badge } from 'react-bootstrap';
import { usePlaylist } from '../../context/playlist';
import './index.css';
import { NoVideos } from '../../components/no-videos';

export function Playlists() {
    const { state: { playlists = [] } = {} } = usePlaylist();
    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <section className='w_100'>
                    <h1 className='text_center p-3'> Playlists</h1>
                    <main className={playlists?.length ? 'playlist_videos' : 'no_video'}>
                        {playlists?.length ? playlists?.map(({ id, name, videos }) => {
                            return (
                                <Link
                                    key={id}
                                    to={`/playlists/${id}`}
                                    className='playlist_link flex p-3 m-3'
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{name}</div>
                                    </div>
                                    <Badge bg="primary">
                                        {videos?.length > 1 ? `${videos.length} videos` : `${videos.length} video`}
                                    </Badge>
                                </Link>
                            )
                        }) : <NoVideos type='playlists' />}
                    </main>
                </section>
            </div>
        </section>
    )
}