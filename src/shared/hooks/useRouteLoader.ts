import {useState} from "react";
import {useTransitionRouter} from "next-view-transitions";

export const useRouteLoader = () => {
    const router = useTransitionRouter();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const navigateWithLoader = (href: string, callback?: () => void) => {
        setLoading(true);
        setProgress(25); // Начальная точка прогресса
        simulateProgress(); // Запуск симуляции прогресса

        router.push(href, {
            onTransitionReady: () => {
                if (callback) callback();
                setProgress(100); // Установить финальное значение
                setTimeout(() => setLoading(false), 400); // Убрать лоадер
            },
        });
    };

    const simulateProgress = () => {
        let currentProgress = 25;

        // Фаза 1: От 25 до 90 за 3 секунды
        const interval = setInterval(() => {
            currentProgress += (90 - 25) / (3000 / 100);
            if (currentProgress >= 90) {
                clearInterval(interval);
                currentProgress = 90;

                // Фаза 2: От 90 до 100 за 4 секунды
                const timeout = setInterval(() => {
                    currentProgress += (100 - 90) / (4000 / 100);
                    if (currentProgress >= 100) {
                        clearInterval(timeout);
                        currentProgress = 100;
                    }
                    setProgress(currentProgress);
                }, 100);
            }
            setProgress(currentProgress);
        }, 100);
    };

    return {loading, progress, navigateWithLoader};
};
