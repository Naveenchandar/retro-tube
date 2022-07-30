import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { addPlaylists, playlistDelete, inputChange, toggleInput, addVideoToPlaylist, fetchAllPlaylists } from 'features/playlistSlice';
import { Playlists } from 'components';
import './index.css';

export function PlaylistModal(props) {
    const { onHide, list, video, show, ...rest } = props;
    const { showInput, inputValue, inputError, playlists, addPlaylist: { loading, error } } = useSelector(state => state.playlist);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState([]);

    const createPlaylist = () => {
        dispatch(addPlaylists(inputValue));
    }

    useEffect(() => {
        if (user?.email) {
            (async () => {
                await dispatch(fetchAllPlaylists());
            })()
        }
    }, [dispatch, user?.email])

    const addVideosToPlaylist = (event, targetValue, video) => {
        if (event.target?.checked) {
            setChecked([...checked, targetValue]);
        }
        dispatch(addVideoToPlaylist({ playlistId: targetValue, video }))
    }

    return (
        <Modal
            {...rest}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
        >
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Save to...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {playlists?.map(item => <Playlists
                    item={item}
                    key={item.title}
                    addVideosToPlaylist={addVideosToPlaylist}
                    deletePlaylist={() => dispatch(playlistDelete(item))}
                    list={list}
                    video={video}
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
                {(inputError || error) && (
                    <p>{inputError || error}</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                {showInput ?
                    <Button onClick={createPlaylist} disabled={loading}>Create</Button>
                    : <Button onClick={onHide}>Close</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}