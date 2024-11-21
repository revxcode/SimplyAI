import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
};

const DeviceType = () => {
    const { width } = useWindowSize();
    const isMobile = width <= 767;
    const isTablet = width > 767 && width <= 1024;
    const isDesktop = width > 1024;

    return { isMobile, isTablet, isDesktop };
};

export default DeviceType;
