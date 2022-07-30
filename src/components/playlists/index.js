import { addVideoToPlaylist, removeVideoFromPlaylist } from 'features/playlistSlice';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { isVideoInPlaylist } from 'utils';
import './index.css';

export function Playlists({ item, deletePlaylist, list, video }) {

    const { playlists } = useSelector(state => state.playlist);
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(isVideoInPlaylist(video?._id, item?._id, playlists));

    const changeInput = (event, item) => {
        if (isChecked) {
            setIsChecked(false);
            dispatch(removeVideoFromPlaylist({ playlistId: item?._id, videoId: video?._id }));
        } else {
            setIsChecked(true);
            // addVideosToPlaylist(event, item);
            dispatch(addVideoToPlaylist({ playlist: item, video }))
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