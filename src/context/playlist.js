import { useContext, createContext, useReducer } from 'react';
import { initialState, playlistReducer } from '../reducer/playlist';

const PlaylistContext = createContext(initialState);

const PlaylistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(playlistReducer, initialState);
    return (
        <PlaylistContext.Provider value={{ state, dispatch }}>
            {children}
        </PlaylistContext.Provider>
    )
}

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlaylistProvider };