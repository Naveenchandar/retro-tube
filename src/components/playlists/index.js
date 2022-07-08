import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import {useDispatch} from 'react-redux';
import './index.css';

export function Playlists({ item, addVideosToPlaylist, checked, editPlaylist, deletePlaylist, list }) {
    // const { dispatch } = usePlaylist();
    const dispatch = useDispatch();
    return (
        <ul className='playlist_names'>
            <li className='pointer'>
                <label className='pointer w_100 flex align_center'>
                    {!list && (
                        <input type='checkbox' checked={checked} onChange={(e) => addVideosToPlaylist(e, item)} />
                    )}
                    &ensp;
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
                            onClick={() => dispatch(deletePlaylist(item))}
                        />
                    </label>
                </label>
            </li>
        </ul>
    )
}