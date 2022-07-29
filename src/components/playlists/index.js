import { removeVideoFromPlaylist } from 'features/playlistSlice';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { isVideoLiked } from 'utils';
import './index.css';

export function Playlists({ item, addVideosToPlaylist, deletePlaylist, list, videoId }) {
    
    const { playlists } = useSelector(state => state.playlist);
    const dispatch = useDispatch();
    
    const [isChecked, setIsChecked] = useState(isVideoLiked(item?._id, playlists));
    
    const changeInput = (event, item) => {
        if (isChecked) {
            setIsChecked(false);
            dispatch(removeVideoFromPlaylist({ playlistId: item?._id, videoId }));
        } else {
            setIsChecked(true);
            addVideosToPlaylist(event, item);
        }
    }
    
    return (
        <ul className='playlist_names'>
            <li className='pointer'>
                <label className='pointer w_100 flex align_center'>
                    {!list && (
                        <input type='checkbox' checked={isChecked} onChange={(e) => changeInput(e, item)} />
                    )}
                    &ensp;
                    <span title={item?.title} className='playlist_name'>{item?.title}</span>
                    <label className='playlist_actions'>
                        {/* <AiOutlineEdit
                            className='pointer playlist_edit'
                            title='Edit Playlist'
                            onClick={() => editPlaylist(item)}
                        /> &nbsp; */}
                        <AiOutlineDelete
                            className='pointer playlist_delete'
                            title='Delete Playlist'
                            onClick={() => deletePlaylist(item?._id)}
                        />
                    </label>
                </label>
            </li>
        </ul>
    )
}