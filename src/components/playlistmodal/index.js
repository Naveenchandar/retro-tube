import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { deletePlaylist, inputChange, playlistCreate, toggleInput, updatePlaylist, videosAddToPlaylist } from 'features/playlistSlice';
import { Playlists } from '../playlists';
import './index.css';

export function PlaylistModal(props) {
    const { onHide, list, ...rest } = props;
    const { showInput, inputValue, inputError, playlists } = useSelector(state => state.playlist);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState([]);
    const [edit, setEdit] = useState(false);

    const createPlaylist = () => {
        if (edit) {
            dispatch(updatePlaylist());
        } else {
            dispatch(playlistCreate());
        }
    }

    const addVideosToPlaylist = (event, targetValue) => {
        if (event.target?.checked) {
            setChecked([...checked, targetValue]);
        }
        dispatch(videosAddToPlaylist(targetValue))
    }

    return (
        <Modal
            {...rest}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Save to...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {playlists?.map(item => <Playlists
                    item={item}
                    key={item.name}
                    addVideosToPlaylist={addVideosToPlaylist}
                    editPlaylist={() => setEdit(true)}
                    deletePlaylist={() => dispatch(deletePlaylist(item))}
                    list={list}
                />
                )}
                <p className='pointer' onClick={() => dispatch(toggleInput())}>
                    <AiOutlinePlus className='add_playlist_icon' /> Create new playlist
                </p>
                {showInput ? (
                    <>
                        <input type='text' placeholder='Enter playlist name'
                            onChange={(e) => dispatch(inputChange(e.target.value))}
                            value={inputValue} id='playlist_input' className='playlist_input'
                            disabled={inputValue?.length > 29}
                        />
                        <span className='playlist_name_length'>{inputValue?.length}/30</span>
                    </>
                ) : null}
                {inputError && (
                    <p>{inputError}</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                {showInput ?
                    <Button onClick={createPlaylist}>{edit ? 'Update' : 'Create'}</Button>
                    : <Button onClick={onHide}>Close</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}