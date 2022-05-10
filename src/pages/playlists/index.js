import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { Sidebar } from '../../components/sidebar';
import { Badge } from 'react-bootstrap';
import { usePlaylist } from '../../context/playlist';
import './index.css';
import { MainHeader } from '../../components/main-header';
import { PlaylistModal } from '../../components/playlistmodal';
import { MainSection } from '../../components/main-section';

export function Playlists() {
    const { state: { playlists = [] } = {} } = usePlaylist();
    const [showModal, setShowModal] = useState(false);
    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <MainSection data={playlists?.length} type='playlists'>
                    <MainHeader
                        data={playlists?.length}
                        title='Playlists'
                        btn='Add new playlist'
                        icon={<IoMdAdd />}
                        onClick={() => setShowModal(true)}
                    />
                    <main className={playlists?.length ? 'playlist_videos' : 'no_video'}>
                        {playlists?.map(({ id, name, videos }) => {
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
                        })}
                    </main>
                </MainSection>
            </div >
            <PlaylistModal
                show={showModal}
                onHide={() => setShowModal(false)}
                list
            />
        </section >
    )
}