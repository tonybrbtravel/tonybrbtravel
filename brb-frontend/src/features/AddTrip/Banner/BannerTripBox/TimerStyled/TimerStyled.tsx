import { Digit } from '../Digit/Digit';
import './TimerStyled.less';

export interface Props {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  secondary?: boolean;
}

export const TimerStyled = ({
  seconds,
  minutes,
  hours,
  days,
}: Props) => (
  <div className="timer-container">
    {days !== undefined ? (
      <Digit value={days} title="DAYS" />
    ) : null}
    {days !== undefined ? ':' : null}
    <Digit value={hours} title="HOURS" />
    <span className="minutes">:</span>
    <Digit className="minutes" value={minutes} title="MIN" />
    <span className="seconds">:</span>
    <Digit className="seconds" value={seconds} title="SEC" />
  </div>
);
