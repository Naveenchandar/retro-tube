import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { getLocalStorageItem, setLocalStorageItem } from 'utils';
import { Chips, PlaylistModal, SearchInput, Video } from 'components';
import './index.css';
import { chipOnChange, filterBasedOnActiveChip, loadingVideos, loadVideos, loadVideosError, searchVideos } from 'features/videosSlice';
import { videoActivePlaylistModal } from 'features/playlistSlice';
import { addToWatchlaterVideos } from 'features/watchLaterSlice';


export function Videos() {
    const location = useLocation();

    const [showOptions, setShowOptions] = useState();
    // const [watchLaterVideos, setWatchLaterVideos] = useState(getLocalStorageItem('retro-tube-watchlater'));
    const [showModal, setShowModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const { filterVideoList, loading, error, activeChip } = useSelector(store => store.videos);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(loadingVideos(true));
            try {
                await dispatch(loadVideos());
                const { state } = location;
                if (state?.categoryName) {
                    dispatch(chipOnChange(state?.categoryName));
                    dispatch(filterBasedOnActiveChip())
                } else {
                    dispatch(chipOnChange('all'));
                }
            } catch (error) {
                dispatch(loadVideosError(error.message));
            }
            dispatch(loadingVideos(false));
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeChip = async (value) => {
        dispatch(chipOnChange(value));
        dispatch(filterBasedOnActiveChip())
    }

    const handleMoreOptions = (video) => {
        setShowOptions(video);
    }

    const watchLater = async (item) => {
        await dispatch(addToWatchlaterVideos(item));
        // const filterDuplicateItem = watchLaterVideos.find(({ _id }) => _id === item._id)
        // if (!filterDuplicateItem) {
        //     const data = [...watchLaterVideos, item];
        //     setWatchLaterVideos([...watchLaterVideos, item]);
        //     setLocalStorageItem('retro-tube-watchlater', JSON.stringify(data));
        // }
        setShowOptions('');
    }

    if (error) {
        return <p>{error}</p>
    }

    if (loading) {
        return <p>Loading !...</p>
    }

    return (
        <main className='main_container w_100 section_videos'>
            <div>
                <SearchInput
                    value={searchValue}
                    onChange={(value) => setSearchValue(value)}
                    placeholder={`Search explore`}
                    dispatch={{
                        search: () => dispatch(searchVideos({ searchText: searchValue })),
                        noSearch: () => dispatch(filterBasedOnActiveChip())
                    }}
                />
            </div>
            <Chips activeChip={activeChip} changeChip={changeChip} />
            <hr />
            <div className='m-2 videos'>
                {filterVideoList.map(item => {
                    return (
                        <Video
                            data={item}
                            key={item._id}
                            options={showOptions}
                            handleMoreOptions={handleMoreOptions}
                            watchLater={watchLater}
                            showPlaylist={(data) => {
                                setShowModal(true);
                                dispatch(videoActivePlaylistModal(data));
                            }}
                            moreOptionsList={['Add to playlist', 'Watch later']}
                        />
                    )
                })}
            </div>
            <PlaylistModal
                show={showModal}
                onHide={() => { setShowModal(false); setShowOptions(''); }}
                video={showOptions}
            />
        </main>
    )
}