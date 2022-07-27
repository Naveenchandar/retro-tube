import React from 'react';
import { useRoutes } from 'react-router-dom';
import {
    Explore, History, Home, LikedVideos,
    Login, Playlist, Playlists, SignUp,
    SingleVideo, WatchLater
} from 'pages';
import { ProtectedRoute } from './protected-route';

export function Router() {
    const routes = [
        {
            children: [
                { path: "/", element: <Home /> },
                { path: "login", element: <Login /> },
                { path: "signup", element: <SignUp /> },
                { path: "explore", element: <Explore /> },
                {
                    path: "video/:videoId",
                    element: <ProtectedRoute><SingleVideo /></ProtectedRoute>
                },
                {
                    path: "watchlater",
                    element: <ProtectedRoute><WatchLater /></ProtectedRoute>
                },
                {
                    path: "playlists",
                    element: <ProtectedRoute><Playlists /></ProtectedRoute>
                },
                {
                    path: "playlists/:playlistId",
                    element: <ProtectedRoute><Playlist /></ProtectedRoute>
                },
                {
                    path: "liked-videos",
                    element: <ProtectedRoute><LikedVideos /></ProtectedRoute>
                },
                { path: "history", element: <ProtectedRoute><History /></ProtectedRoute> },
            ]
        }
    ];
    let element = useRoutes(routes);
    return element;
};
