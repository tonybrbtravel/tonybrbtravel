import { useEffect, useRef } from 'react';

export interface IInterval {
  callback:any;
  delay?:number;
}

// From: https://usehooks-typescript.com/react-hook/use-interval
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don’t schedule if no delay is specified.
    if (delay === null) {
      return () => {};
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
