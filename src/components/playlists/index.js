import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { usePlaylist } from '../../context/playlist';
import './index.css';

export function Playlists({ item, addVideosToPlaylist, checked, editPlaylist, deletePlaylist }) {
    const { dispatch } = usePlaylist();
    return (
        <ul>
            <li className='pointer'>
                <label className='pointer w_100 flex align_center'>
                    <input type='checkbox' checked={checked} onChange={(e) => addVideosToPlaylist(e, item)} /> &ensp;
                    <span title={item?.name} className='playlist_name'>{item?.name}</span>
                    <label className='playlist_actions'>
                        <AiOutlineEdit
                            className='pointer playlist_edit'
                            title='Edit Playlist'
                            onClick={() => { editPlaylist(item); dispatch({ type: 'EDIT_PLAYLIST', payload: item }); }}
                        /> &nbsp;
                        <AiOutlineDelete
                            className='pointer playlist_delete'
                            title='Delete Playlist'
                            onClick={() => dispatch({ type: 'DELETE_PLAYLIST', payload: item })}
                        />
                    </label>
                </label>
            </li>
        </ul>
    )
}