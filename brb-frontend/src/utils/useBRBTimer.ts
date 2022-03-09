import { useState } from 'react';
import BRBTime from './BRBTime';
import useInterval from '../Hooks/useInterval';

export interface IBRBTimer {
  autoStart: boolean;
  offsetTimestamp?: number;
}

export default function useBRBTimer({ autoStart, offsetTimestamp }: IBRBTimer) {
  const passedSeconds = BRBTime.getSecondsFromExpiry(offsetTimestamp, true) || 0;

  const [prevTime, setPrevTime] = useState(new Date());
  const [seconds, setSeconds] = useState(passedSeconds + BRBTime.getSecondsFromPrevTime(prevTime || 0, true));
  const [isRunning, setIsRunning] = useState(autoStart);

  useInterval(() => {
    setSeconds(passedSeconds + BRBTime.getSecondsFromPrevTime(prevTime, true));
  }, isRunning ? 1000 : null);

  function start() {
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setIsRunning(true);
    setSeconds(passedSeconds + BRBTime.getSecondsFromPrevTime(newPrevTime, true));
  }

  return {
    ...BRBTime.getTimeFromSeconds(seconds),
    start,
    isRunning,
  };
}
