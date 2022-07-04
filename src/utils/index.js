import jwt_decode from "jwt-decode";
import { Store } from 'react-notifications-component';

export const getLocalStorageItem = (key) => {
    const getItem = localStorage.getItem(key);
    if (getItem) {
        if (key === 'retro-tube-token') {
            return jwt_decode(getItem)
        }
        return JSON.parse(getItem)
    }
    return []
}

export const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, value);
}

export const removeLocalStorageItem = (key, value) => {
    localStorage.removeItem(key);
}

export const notification = (type, title, message = '') => {
    return (
        Store.addNotification({
            title,
            message: message || '',
            type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        })
    )
}

const fetchSearchVideo = (title, searchText) => title?.toLowerCase()?.includes(searchText?.toLowerCase());

export const filterSearchVideos = ({ videos, searchText, type = '', chip: activeChip = '' }) => {
    return videos?.filter(({ title, type: chipType, name }) => {
        if (type === 'explore') {
            if (chipType === activeChip || activeChip === 'all') {
                return fetchSearchVideo(title, searchText);
            }
            return '';
        }
        if (type === 'playlist') {
            return fetchSearchVideo(name, searchText);
        }
        return fetchSearchVideo(title, searchText);
    })
}

export const searchValueChange = (value) => {
    if (value?.trim()) {
        return value;
    }
    return '';
}