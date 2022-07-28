import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import './index.css';

export function Playlists({ item, addVideosToPlaylist, checked, editPlaylist, deletePlaylist, list }) {
    return (
        <ul className='playlist_names'>
            <li className='pointer'>
                <label className='pointer w_100 flex align_center'>
                    {!list && (
                        <input type='checkbox' checked={checked} onChange={(e) => addVideosToPlaylist(e, item)} />
                    )}
                    &ensp;
                    <span title={item?.title} className='playlist_name'>{item?.title}</span>
                    <label className='playlist_actions'>
                        <AiOutlineEdit
                            className='pointer playlist_edit'
                            title='Edit Playlist'
                            onClick={() => editPlaylist(item)}
                        /> &nbsp;
                        <AiOutlineDelete
                            className='pointer playlist_delete'
                            title='Delete Playlist'
                            onClick={() => deletePlaylist(item)}
                        />
                    </label>
                </label>
            </li>
        </ul>
    )
}