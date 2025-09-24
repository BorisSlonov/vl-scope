import {useEffect} from "react";
import {scrollToPreviousScreen} from "../libs/scroll/scrollToPreviousScreen";

export function useScrollToPreviousScreen(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];

                if (entry.isIntersecting && entry.boundingClientRect.top === 0) {
                    scrollToPreviousScreen(element);
                }
            },
            {
                root: null, // Наблюдаем за всей областью экрана
                threshold: [0], // Срабатывает при появлении верхней границы элемента
            },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [ref]);
}
