import { MdOutlineExplore, MdOutlineWatchLater, MdOutlineHistory } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { RiPlayListLine } from 'react-icons/ri';
import { BiLike } from 'react-icons/bi';

export const sidebarOptions = [
    { path: '/', name: 'Home', icon: <AiOutlineHome /> },
    { path: '/explore', name: 'Explore', icon: <MdOutlineExplore /> },
    { path: '/playlists', name: 'Playlists', icon: <RiPlayListLine /> },
    { path: '/watchlater', name: 'Watch later', icon: <MdOutlineWatchLater /> },
    { path: '/liked-videos', name: 'Liked videos', icon: <BiLike /> },
    { path: '/history', name: 'History', icon: <MdOutlineHistory /> }
];