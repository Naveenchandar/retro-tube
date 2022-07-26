import React from 'react';
import { Routes, Route } from "react-router-dom";
import {
    Explore, History, Home, LikedVideos,
    Login, Playlist, Playlists, SignUp,
    SingleVideo, WatchLater
} from '../../pages';
import { Navbar } from '../navbar';
import { ProtectedRoute } from './protected-route';

export function NavRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/video/:videoId' element={<SingleVideo />} />
                <Route path='/watchlater' element={
                    <ProtectedRoute>
                        <WatchLater />
                    </ProtectedRoute>
                }
                />
                <Route path='/playlists' element={
                    <ProtectedRoute>
                        <Playlists />
                    </ProtectedRoute>
                }
                />
                <Route path='/playlists/:playlistId' element={
                    <ProtectedRoute>
                        <Playlist />
                    </ProtectedRoute>
                } />
                <Route path='/liked-videos' element={
                    <ProtectedRoute>
                        <LikedVideos />
                    </ProtectedRoute>
                } />
                <Route path='/history' element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    )
}