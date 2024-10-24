import { useEffect, useState } from "react";

export default function Timer({
  startTime,
  stopped,
}: {
  startTime: number;
  stopped: boolean;
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!stopped) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;

        setSeconds(Math.floor(elapsed / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stopped, startTime]);

  return (
    <div
      style={{
        border: "1px solid gray",
        paddingTop: "2px",
        paddingBottom: "2px",
        paddingLeft: "4px",
        paddingRight: "4px",
        backgroundColor: "#DCDCDC",
        fontFamily: "monospace",
        fontSize: "2rem",
      }}
    >
      {`${seconds <= 99 ? "0" : ""}${seconds <= 9 ? "0" : ""}${seconds}`}
    </div>
  );
}
