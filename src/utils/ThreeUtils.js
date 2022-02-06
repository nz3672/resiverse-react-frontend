import * as THREE from "three";
import { useEffect, useState } from "react";

export const useElapsedTimeByRenderer = (clock) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      const elapsedTime = clock.getElapsedTime();
      setElapsed(elapsedTime);
    });

    return () => {
      window.removeEventListener("mousemove", (e) => {
        const elapsedTime = clock.getElapsedTime();
        setElapsed(elapsedTime);
      });
    };
  }, []);

  //   console.log(elapsed);
  return elapsed;
};
