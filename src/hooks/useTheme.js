import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTheme, changeTheme } from 'features/themeSlice';

export const useTheme = () => {
    const { theme } = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const updateTheme = () => dispatch(changeTheme());
    useEffect(() => {
        dispatch(loadTheme());
    }, [dispatch])
    return { theme, changeTheme: updateTheme };
}