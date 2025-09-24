"use client";

import {useState, useEffect} from "react";
import {usePathname} from "next/navigation";

export const useProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const startProgress = () => {
            setIsLoading(true);
            setProgress(0);

            interval = setInterval(() => {
                setProgress(prev => (prev < 95 ? prev + 10 : prev));
            }, 50);
        };

        const finishProgress = () => {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => {
                setProgress(0);
                setIsLoading(false);
            }, 300);
        };

        startProgress();

        finishProgress();

        return () => clearInterval(interval);
    }, [pathname]);

    return {progress, isLoading};
};
