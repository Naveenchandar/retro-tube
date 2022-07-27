import React from 'react';
import { Link, useRoutes } from 'react-router-dom';
import {
    Explore, History, Home, LikedVideos,
    Login, Playlist, Playlists, SignUp,
    SingleVideo, WatchLater
} from 'pages';
import { ProtectedRoute } from './protected-route';
import './index.css';

const NoRouteFound = () => {
    return (
        <div className='not_found flex flex_dcolumn justify_center align_center'>
            <p className="error404">404 | Page Not Found!</p>
            <p className="error404-msg">
                Oops!! Looks like you have entered a wrong URL
            </p>
            <Link to='/' className="btn btn_primary">Back to home</Link>
        </div>
    )
}

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
                { 
                    path: "history", 
                    element: <ProtectedRoute><History /></ProtectedRoute> 
                },
                { 
                    path: "*", element: <NoRouteFound /> 
                },
            ]
        }
    ];
    let element = useRoutes(routes);
    return element;
};
