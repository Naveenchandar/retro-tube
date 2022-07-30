import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTheme, changeTheme } from 'features/themeSlice';
import { getLocalStorageItem } from 'utils';
import { updateUser } from 'features/authSlice';
import axios from 'axios';

export const useTheme = () => {
    const { theme } = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const updateTheme = () => dispatch(changeTheme());
    useEffect(() => {
        const token = localStorage.getItem("retro-tube-token");
        const user = getLocalStorageItem("retro-tube-token");
        if (user._id) {
            axios.defaults.headers.common["authorization"] = token;
            dispatch(updateUser(user));
        }
    }, [dispatch]);
    useEffect(() => {
        dispatch(loadTheme());
    }, [dispatch])
    return { theme, changeTheme: updateTheme };
}