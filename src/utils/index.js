import jwt_decode from "jwt-decode";

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