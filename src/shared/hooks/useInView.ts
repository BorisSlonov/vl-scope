import {useEffect, useRef, useState} from "react";

export const useInView = (options?: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        let observer: IntersectionObserver | null = null;
        observer = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer && observer.disconnect(); // Срабатывает только один раз
            }
        }, options);
        observer.observe(node);
        return () => {
            observer && observer.disconnect();
        };
    }, [options]);

    return {ref, inView};
};
