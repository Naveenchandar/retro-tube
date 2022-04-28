import { useContext, createContext, useReducer, useState } from 'react';
import { initialState, videosReducer } from '../reducer/videos';

const VideoContext = createContext(initialState);

const VideoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(videosReducer, initialState);
    const [playlistVideos, setPlaylistVideos] = useState([]);

    const addPlaylistVideos = (name, data) => {
        setPlaylistVideos([...playlistVideos, { name, videos: data }])
    }
    
    return (
        <VideoContext.Provider value={{ state, dispatch, addPlaylistVideos }}>
            {children}
        </VideoContext.Provider>
    )
}

const useVideos = () => useContext(VideoContext);

export { useVideos, VideoProvider };