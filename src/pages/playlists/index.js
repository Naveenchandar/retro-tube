import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'react-bootstrap';
import {
    Sidebar,
    MainHeader,
    PlaylistModal,
    MainSection,
    SearchInput,
} from 'components';
import './index.css';
import { fetchAllPlaylists, searchPlaylist } from 'features/playlistSlice';

export function Playlists() {
    const { playlists = [], filterPlaylists = [] } = useSelector(state => state.playlist);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        (async () => {
            await dispatch(fetchAllPlaylists());
        })()
        return () => {
            setShowModal(false);
            setSearchValue('');
        }
    }, [dispatch])

    return (
        <section className='section'>
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
                                noSearch: () => dispatch(fetchAllPlaylists())
                            }}
                        />
                    </div>
                    <MainHeader
                        data={filterPlaylists?.length}
                        title='Playlists'
                        btn='Add new playlist'
                        icon={<IoMdAdd />}
                        onClick={() => setShowModal(true)}
                        type='playlist'
                    />
                    <main className={filterPlaylists?.length ? 'playlist_videos' : 'no_video'}>
                        {filterPlaylists?.map(({ _id, title, videos }) => {
                            return (
                                <Link
                                    key={_id}
                                    to={`/playlists/${_id}`}
                                    className='playlist_link flex p-3 m-3'
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{title}</div>
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
                onHide={() => { setShowModal(false); dispatch(fetchAllPlaylists()) }}
                list
            />
        </section >
    )
}