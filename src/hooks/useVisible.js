import { useState, useEffect, useRef } from 'react';

export function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && ref.current.contains(event.target)) {
            setIsComponentVisible(true);
        } 
        else if (ref.current && ref.current?.hasChildNodes(event.target)) {
            setIsComponentVisible(true);
        } 
        else {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}