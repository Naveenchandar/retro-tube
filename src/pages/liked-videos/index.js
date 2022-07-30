import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MainHeader,
    MainSection,
    SearchInput,
    Sidebar,
    Video,
} from 'components';
// import { filterSearchVideos, getLocalStorageItem, setLocalStorageItem } from 'utils';
import { fetchAllLikedVideos, removedLikedVideo, searchVideos } from 'features/likedVideosSlice';

export function LikedVideos() {
    const { videos, filterVideos, loading } = useSelector(state => state.likedVideos);
    // const [likedVideos, setLikedVideos] = useState(getLocalStorageItem('retro-liked-videos'));
    // const [filterLikedVideos, setFilterLikedVideos] = useState(getLocalStorageItem('retro-liked-videos'))
    const [showOptions, setShowOptions] = useState();
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(fetchAllLikedVideos());
        })()
    }, [dispatch])

    const handleMoreOptions = (videoId) => {
        setShowOptions(videoId);
    }

    const removeLikedVideos = async (video) => {
        // const remainingVideos = likedVideos.filter(({ _id }) => _id !== video._id);
        // setLikedVideos(remainingVideos);
        // setFilterLikedVideos(remainingVideos);
        // setLocalStorageItem('retro-liked-videos', JSON.stringify(remainingVideos));
        // setShowOptions('');
        await dispatch(removedLikedVideo(video._id));
    }

    const searchLikedVideos = (value = '') => {
        // if (value) {
        //     setFilterLikedVideos(filterSearchVideos({ videos: likedVideos, searchText: value }));
        // } else {
        //     setFilterLikedVideos(getLocalStorageItem('retro-liked-videos'));
        // }
        dispatch(searchVideos(value));
    }

    return (
        <section className='section'>
            <div className='flex'>
                <Sidebar />
                {loading ? 'Loading...' :
                    <MainSection data={videos?.length} type='liked videos'>
                        <div>
                            <SearchInput
                                value={searchValue}
                                onChange={(value) => setSearchValue(value)}
                                placeholder={`Search liked videos`}
                                dispatch={{
                                    search: (value) => searchLikedVideos(value),
                                    noSearch: () => searchLikedVideos()
                                }}
                            />
                        </div>
                        <MainHeader
                            data={filterVideos?.length}
                            title='Liked videos'
                        />
                        <main className={filterVideos?.length ? 'videos group_videos' : 'no_video'}>
                            {filterVideos?.map(item => {
                                return (
                                    <Video
                                        data={item}
                                        key={item._id}
                                        options={showOptions}
                                        handleMoreOptions={handleMoreOptions}
                                        moreOptionsList={['Remove from liked videos']}
                                        like={true}
                                        moreAction={removeLikedVideos}
                                    />
                                )
                            })}
                        </main>
                    </MainSection>
                }
            </div>
        </section>
    )
}