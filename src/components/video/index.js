import { useNavigate } from 'react-router-dom';
import './index.css';

function Video({ data }) {
    const { _id, thumbnail, alt, title, creator, views, postedOn, avatar } = data;
    const navigate = useNavigate();

    const handleClickVideo = (videoId) => {
        navigate(`/video/${videoId}`);
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
                            <button><span className="material-icons-outlined ml-1">more_vert</span></button>
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

export default Video