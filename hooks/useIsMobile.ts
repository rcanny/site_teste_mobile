import { useState, useEffect } from 'react';

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        
        // Initial check
        setIsMobile(mq.matches);

        // Listener for changes
        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', handleChange);

        return () => mq.removeEventListener('change', handleChange);
    }, []);

    return isMobile;
};
