import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { Sidebar } from '../../components/sidebar';
import './index.css';
import { MainHeader } from '../../components/main-header';
import { PlaylistModal } from '../../components/playlistmodal';
import { MainSection } from '../../components/main-section';
import { SearchInput } from '../../components/search';
import { initPlaylist, searchPlaylist } from '../../features/playlistSlice';

export function Playlists() {
    const { playlists = [], filterPlaylists = [] } = useSelector(state => state.playlist);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(initPlaylist());
    }, [dispatch])

    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <MainSection data={playlists?.length} type='playlists'>
                    <div>
                        <SearchInput
                            value={searchValue}
                            onChange={(value) => setSearchValue(value)}
                            placeholder={`Search playlists`}
                            dispatch={{
                                search: (value) => dispatch(searchPlaylist({ searchText: value })),
                                noSearch: () => dispatch(initPlaylist())
                            }}
                        />
                    </div>
                    <MainHeader
                        data={filterPlaylists?.length}
                        title='Playlists'
                        btn='Add new playlist'
                        icon={<IoMdAdd />}
                        onClick={() => setShowModal(true)}
                    />
                    <main className={filterPlaylists?.length ? 'playlist_videos' : 'no_video'}>
                        {filterPlaylists?.map(({ id, name, videos }) => {
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
                onHide={() => { setShowModal(false); dispatch(initPlaylist()) }}
                list
            />
        </section >
    )
}