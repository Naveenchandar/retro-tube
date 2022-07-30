import { useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { MoreOptions } from 'components';
import './index.css';

export function Video(props) {
    const { data, options, handleMoreOptions, watchLater, moreOptionsList,
        handleFromRemoveWatchLater, showPlaylist, handleRemoveFromPlaylist, like, moreAction, history } = props;
    const { _id, thumbnail, alt, title, creator, views, postedOn, avatar } = data;
    const navigate = useNavigate();

    const { user } = useSelector(store => store.user);

    const handleClickVideo = (videoId) => {
        navigate(`/video/${videoId}`, { state: { like: like ? true : false } });
    }

    const handleClickMoreOptions = (item) => {
        if (item === 'Watch later') {
            watchLater(data);
        }
        if (item === 'Remove from Watch later') {
            handleFromRemoveWatchLater(data);
        }
        if (item === 'Add to playlist') {
            if (user?.email) {
                showPlaylist(data);
            } else {
                navigate('/login', { replace: true });
            }
        }
        if (item === 'Remove from playlist') {
            handleRemoveFromPlaylist(data);
        }
        if (item === 'Remove from liked videos') {
            moreAction(data);
        }
    }

    return (
        <section className='video'>
            <div className="p-1 m-1 video_main">
                <div className="pointer video_thumbnail relative_pos">
                    <div onClick={() => handleClickVideo(_id)}>
                        <img alt={alt} src={`${thumbnail}.jpg`} className="rounded-sm" />
                    </div>
                    <span className="video_duration p-1">15:24</span>
                </div>
                <div className="mt-1 video_info flex">
                    <div className="video_profile">
                        <img src={avatar} alt="avatar" />
                    </div>
                    <div className="w-100">
                        <div className="flex justify_spacebtw my-1 relative_pos video_title_div">
                            <div>
                                <h3 className="video_caption">{title}</h3>
                                <div className="mt-1 video_createdby">{creator}</div>
                            </div>
                            {moreOptionsList?.length > 0 ?
                                <>
                                    <button onClick={() => handleMoreOptions(data)}>
                                        <span className="material-icons-outlined ml-1 vertical_icon">more_vert</span>
                                    </button>
                                    {options?._id === _id ? (
                                        <MoreOptions list={moreOptionsList} handleClickMoreOptions={handleClickMoreOptions} />
                                    ) : ''}
                                </> : ''}
                            {history ? <AiFillCloseCircle onClick={() => moreAction(data)} className='close_video pointer' title='Remove from history' /> : ''}
                        </div>
                        <div className="flex justify_spacebtw">
                            <div className="flex align_center video_views">
                                <span className="material-icons visible_icon">visibility</span>
                                <span className="video_views_count">{views}</span>
                            </div>
                            <div className="flex align_center video_upload">
                                <span className="material-icons-outlined visible_icon">timer</span>
                                <span className="video_uploadedat">{postedOn}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}