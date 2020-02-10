import { useEffect, useRef, useState } from 'react';

interface Size {
    height: number;
    width: number;
}

export const useElementWidth = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);
    const [size, setSize] = useState<Size>({ height: 0, width: 0 });

    useEffect(() => {
        const handleResize = () =>
            ref.current &&
            setSize({
                height: ref.current.offsetHeight,
                width: ref.current.offsetWidth
            });

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [ref.current]);

    return { ref, size };
};
