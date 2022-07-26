import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { PlaylistModal } from 'components';
import { useDispatch } from 'react-redux';
import { videoActivePlaylistModal } from 'features/playlistSlice';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils'

export function SingleAction({ data, videoId }) {
    const { state: { like } } = useLocation();
    const dispatch = useDispatch();
    const { _id } = data;
    const [likedVideos, setLikedVideos] = useState(getLocalStorageItem('retro-liked-videos'));
    const [filled, setFilled] = useState(like);
    const [showModal, setShowModal] = useState(false);

    const likeVideo = () => {
        if (!like) {
            const videos = [...likedVideos, data];
            setLikedVideos(videos);
            setLocalStorageItem('retro-liked-videos', JSON.stringify(videos));
            setFilled(true);
        } else {
            setFilled(false);
            const filterVideos = likedVideos?.filter(({ _id: id }) => id !== _id);
            setLikedVideos(filterVideos);
            setLocalStorageItem('retro-liked-videos', JSON.stringify(filterVideos));
        }
    }

    const saveToPlaylist = () => {
        setShowModal(true);
        dispatch(videoActivePlaylistModal(data));
    }

    const watchLater = () => {
        const watchLaterVideos = getLocalStorageItem('retro-tube-watchlater');
        const filterDuplicateItem = watchLaterVideos.find(({ _id }) => _id === data._id)
        if (!filterDuplicateItem) {
            const videos = [...watchLaterVideos, data];
            setLocalStorageItem('retro-tube-watchlater', JSON.stringify(videos));
        }
    }

    return (
        <>
            <div className="flex my-2 single_video_actions">
                <button className="icon-container mr-3 flex align_center" onClick={likeVideo}>
                    <span className={`material-icons${filled ? '' : '-outlined'}`}>thumb_up</span> &nbsp;
                    <span>Like</span>
                </button>
                <button className="icon-container mr-3 flex align_center" onClick={saveToPlaylist}>
                    <span className="material-icons-outlined">
                        playlist_add
                    </span> &nbsp;
                    <span>Save to playlist</span>
                </button>
                <button className="icon-container flex align_center" onClick={watchLater}>
                    <span className="material-icons-outlined">
                        watch_later
                    </span> &nbsp;
                    <span>Watch later</span>
                </button>
            </div>
            <PlaylistModal
                show={showModal}
                onHide={() => { setShowModal(false); }}
            />
        </>
    )
}