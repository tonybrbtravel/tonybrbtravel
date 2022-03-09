import { useTimer, useStopwatch } from 'react-timer-hook';
import './BannerTripBoxStyle.less';
import { TimerStyled } from './TimerStyled/TimerStyled';
import useBRBTimer from '../../../../utils/useBRBTimer';

export interface Props {
  secondary?: boolean;
  showSeconds?: boolean;
  registeredTimeStamp?: number;
}

export const BannerTripBoxUser = ({
  secondary,
  showSeconds = true,
  registeredTimeStamp,
}: Props) => {
  const userTimestamp = registeredTimeStamp && new Date(registeredTimeStamp).getTime();

  const {
    seconds, minutes, hours, days, start,
  } = useBRBTimer({
    autoStart: true,
    offsetTimestamp: userTimestamp,
  });

  return (
    <div className="banner-trip-box">
      <TimerStyled
        seconds={seconds}
        minutes={minutes}
        hours={hours}
        days={days}
        secondary={secondary}
      />
    </div>
  );
};

export default BannerTripBoxUser;
