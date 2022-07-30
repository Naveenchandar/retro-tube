import React, { useState } from 'react';
import { PlaylistModal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { videoActivePlaylistModal } from 'features/playlistSlice';
import { isVideoLiked } from 'utils';
import { addToLikedVideos, removedLikedVideo } from 'features/likedVideosSlice';
import { addToWatchlaterVideos, removeWatchLaterVideo } from 'features/watchLaterSlice';

export function SingleAction({ data, videoId }) {
    const { videos } = useSelector(state => state.likedVideos);
    const { videos:watchlaterVideos } = useSelector(state => state.watchlater);
    const dispatch = useDispatch();
    // const { _id } = data;
    // const [likedVideos, setLikedVideos] = useState(getLocalStorageItem('retro-liked-videos'));
    const filled = isVideoLiked(videoId, videos);
    const isVideoWatched = isVideoLiked(videoId, watchlaterVideos);
    const [showModal, setShowModal] = useState(false);

    const likeVideo = async () => {
        // if (!like) {
        //     const videos = [...likedVideos, data];
        //     setLikedVideos(videos);
        //     setLocalStorageItem('retro-liked-videos', JSON.stringify(videos));
        // } else {
        //     setFilled(false);
        //     const filterVideos = likedVideos?.filter(({ _id: id }) => id !== _id);
        //     setLikedVideos(filterVideos);
        //     setLocalStorageItem('retro-liked-videos', JSON.stringify(filterVideos));
        // }
        if (filled) {
            await dispatch(removedLikedVideo(videoId));
        } else {
            await dispatch(addToLikedVideos(data));
        }
    }

    const saveToPlaylist = () => {
        setShowModal(true);
        dispatch(videoActivePlaylistModal(data));
    }

    const watchLater = async () => {
        // const watchLaterVideos = getLocalStorageItem('retro-tube-watchlater');
        // const filterDuplicateItem = watchLaterVideos.find(({ _id }) => _id === data._id)
        // if (!filterDuplicateItem) {
        //     const videos = [...watchLaterVideos, data];
        //     setLocalStorageItem('retro-tube-watchlater', JSON.stringify(videos));
        // }
        if(isVideoWatched) {
            await dispatch(removeWatchLaterVideo(data?._id));
        } else {
            await dispatch(addToWatchlaterVideos(data));
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
                    <span>Add to playlist</span>
                </button>
                <button className="icon-container flex align_center" onClick={watchLater}>
                    <span className="material-icons-outlined">
                        watch_later
                    </span> &nbsp;
                    <span>{isVideoWatched ? 'Remove from' : ''} Watch later</span>
                </button>
            </div>
            <PlaylistModal
                show={showModal}
                onHide={() => { setShowModal(false); }}
                video={data}
            />
        </>
    )
}