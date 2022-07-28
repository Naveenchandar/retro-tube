import jwt_decode from "jwt-decode";
import { Store } from 'react-notifications-component';

export const getLocalStorageItem = (key) => {
    const getItem = localStorage.getItem(key);
    if (key === 'retro-tube-token') {
        return getItem ? jwt_decode(getItem) : {}
    }
    if (key === 'theme') {
        return getItem ? jwt_decode(getItem) : ''
    }
    if (getItem) {
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

const updateErrorObj = (obj, type, message) => {
    return { ...obj, [type]: message, valid: false }
}

export const handleValidation = (info, errorInfo) => {
    const { email, password, firstName, lastName, confirmPwd } = info;
    const isValidEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    if (!email) {
        return updateErrorObj(errorInfo, 'email', 'Please enter email id');
    }
    if (!isValidEmail) {
        return updateErrorObj(errorInfo, 'email', 'Please enter valid email id');
    }
    if (!password) {
        return updateErrorObj(errorInfo, 'password', 'Please enter password');
    }
    if (!firstName) {
        return updateErrorObj(errorInfo, 'firstName', 'Please enter first name');
    }
    if (!lastName) {
        return updateErrorObj(errorInfo, 'lastName', 'Please enter last nmae');
    }
    if (!confirmPwd) {
        return updateErrorObj(errorInfo, 'confirmPwd', 'Please enter confirm password');
    }
    if (password && confirmPwd && password !== confirmPwd) {
        const obj = { ...errorInfo, 'error': '' };
        return updateErrorObj(obj, 'confirmPwd', 'Password mismatch');
    }
    return { ...errorInfo, valid: true };
}