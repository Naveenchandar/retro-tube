import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export function NoVideos({ type }) {
    return (
        <div className='text_center no_video'>
            <p className='my-2'>No videos to watch, Please add videos to {type}</p>
            <Link to='/explore'>Explore All Videos</Link>
        </div>
    )
}