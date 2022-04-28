import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { usePlaylist } from '../../context/playlist';
import { Playlists } from '../playlists';
import './index.css';

export function PlaylistModal(props) {
    const { onHide, ...rest } = props
    const { state, dispatch } = usePlaylist();
    const { showInput, inputValue, inputError, playlists } = state;
    const [checked, setChecked] = useState([]);
    const [edit, setEdit] = useState(false);

    const createPlaylist = () => {
        if (edit) {
            dispatch({ type: 'UPDATE_PLAYLIST' });
        } else {
            dispatch({ type: 'CREATE_PLAYLIST' });
        }
    }

    const addVideosToPlaylist = (event, targetValue) => {
        if (event.target?.checked) {
            setChecked([...checked, targetValue]);
        }
        dispatch({ type: 'ADD_VIDEOS_TO_PLAYLIST', payload: targetValue })
    }

    return (
        <Modal
            {...rest}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
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
                    deletePlaylist={() => dispatch({ type: 'DELETE_PLAYLIST', payload: item })}
                />
                )}
                <p className='pointer' onClick={() => dispatch({ type: 'TOGGLE_INPUT' })}>
                    <AiOutlinePlus className='add_playlist_icon' /> Create new playlist
                </p>
                {showInput ? (
                    <>
                        <input type='text' placeholder='Enter playlist name'
                            onChange={(e) => dispatch({ type: 'INPUT_CHANGE', payload: e.target.value })}
                            value={inputValue} id='playlist_input' className='playlist_input'
                            disabled={inputValue?.length > 29}
                        /> {inputValue?.length}/30
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