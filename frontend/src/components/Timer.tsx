import { useEffect, useState } from "react";

export default function Timer({
  startTime,
  stopped,
}: {
  startTime: number;
  stopped: boolean;
}) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (!stopped) {
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;

          setSeconds(Math.floor((elapsed / 1000) % 60));
          setMinutes(Math.floor(elapsed / 1000 / 60));
        }, 1000);
        return () => clearInterval(interval);
    }
  }, [stopped, startTime]);

  return <div>{`${minutes <= 9 ? "0" : ""}${minutes}:${seconds <= 9 ? "0" : ""}${seconds}`}</div>;
}
