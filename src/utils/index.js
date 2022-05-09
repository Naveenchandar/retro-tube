export const getLocalStorageItem = (key) => {
    const getItem = localStorage.getItem(key);
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