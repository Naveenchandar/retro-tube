import React from 'react'
import { Link } from 'react-router-dom'

export function NoVideos({ type }) {
    return (
        <div className='text_center'>
            <p className='my-2'>No videos to watch, Please add videos to {type}</p>
            <Link to='/explore'>Explore All Videos</Link>
        </div>
    )
}