import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Explore, Home, LikedVideos, Login, Playlist, Playlists, SignUp, SingleVideo, WatchLater } from '../../pages';
import { Navbar } from '../navbar';

function NavRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/video/:videoId' element={<SingleVideo />} />
                <Route path='/watchlater' element={<WatchLater />} />
                <Route path='/playlists' element={<Playlists />} />
                <Route path='/playlists/:playlistId' element={<Playlist />} />
                <Route path='/liked-videos' element={<LikedVideos />} />
            </Routes>
        </>
    )
}

export default NavRoutes