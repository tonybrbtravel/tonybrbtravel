import { useTimer } from 'react-timer-hook';
import { TimerStyled } from './TimerStyled/TimerStyled';
import './BannerTripBoxStyle.less';

export interface Props {
  expiryTimestamp: number;
  secondary?: boolean;
  showSeconds?: boolean;
}

export const BannerTripBox = ({
  expiryTimestamp,
  secondary,
}: Props) => {
  const {
    seconds, minutes, hours, days,
  } = useTimer({
    expiryTimestamp,
    autoStart: true,
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

export default BannerTripBox;
