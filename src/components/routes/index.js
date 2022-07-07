import React from 'react';
import { Routes, Route } from "react-router-dom";
import {
    Explore, History, Home, LikedVideos,
    Login, Playlist, Playlists, SignUp,
    SingleVideo, WatchLater
} from '../../pages';
import { Navbar } from '../navbar';
import { ProtectedRoute } from './protected-route';

export const NavRoutes = () => {
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
                <Route path='/playlists' element={
                    <ProtectedRoute>
                        <Playlists />
                    </ProtectedRoute>
                }
                />
                <Route path='/playlists/:playlistId' element={<Playlist />} />
                <Route path='/liked-videos' element={<LikedVideos />} />
                <Route path='/history' element={<History />} />
            </Routes>
        </>
    )
}