import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

const Timer = forwardRef((props, ref) => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {

        if (isRunning) {
            const id = setInterval(() => {
              setTime(prevTime => prevTime + 1);
            }, 1000);
            setIntervalId(id);

        } else if (!isRunning && intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    useImperativeHandle(ref, () => ({
        start: () => setIsRunning(true),
        stop: () => setIsRunning(false),
        reset: () => setTime(0),
    }))

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds > 10 ? seconds : `0${seconds}`}`
    }

    return (
        <div>
            {formatTime(time)}
        </div>
    )
})

export default Timer