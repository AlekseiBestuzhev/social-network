import { useEffect, useRef } from 'react';

type UseResizeProps = {
    targetSize: number;
    onResize: (isTargetSize: boolean) => void;
};

export const useResize = ({ targetSize, onResize }: UseResizeProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (ref.current) {
                onResize(ref.current.offsetWidth > targetSize);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [targetSize, onResize]);

    return ref;
};