import { useState, useEffect, useRef } from 'react';

const easeOutCubic = (t: number): number => --t * t * t + 1;

/**
 * A custom hook to animate a number counting up when the component scrolls into view.
 * @param endValue - The final number to count up to.
 * @param duration - The duration of the animation in milliseconds.
 * @returns - An object containing the current count and a ref to attach to the element.
 */
export const useCountUp = (endValue: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const animationFrameRef = useRef<number | null>(null);

    const animateCount = (startTime: number) => {
        const now = performance.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentCount = Math.floor(easedProgress * endValue);
        
        setCount(currentCount);

        if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(() => animateCount(startTime));
        }
    };

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animationFrameRef.current = requestAnimationFrame(() => animateCount(performance.now()));
                    observer.disconnect(); // Animate only once
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the element is visible
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [endValue, duration]); // Dependencies for the effect

    return { count, ref };
};