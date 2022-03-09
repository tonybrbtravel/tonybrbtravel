import { FC } from 'react';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components';
import Colors from '../../../themes/Colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 700;
`;

const Segment = styled.div`
  padding: .25em .25em;
  min-width: 2.5em;
  margin: 0 .1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Colors.brbOffwhite};
  border-radius: .5rem;
  background-color: rgba(0, 0, 0, .15);
  backdrop-filter: blur(5px);

  .label {
    font-size: .5em;
    line-height: 1;
    text-transform: uppercase;
  }
`;

export interface Props {
  expiryTimestamp: number;
}

export const Countdown: FC<Props> = ({
  expiryTimestamp,
}: Props) => {
  const {
    seconds, minutes, hours, days,
  } = useTimer({
    expiryTimestamp,
    autoStart: true,
    onExpire: () => console.warn('onExpire called'),
  });

  return (
    <Wrapper>
      <Segment>
        {days.toString().padStart(2, '0')}
        <span className="label">days</span>
      </Segment>
      :
      <Segment>
        {hours.toString().padStart(2, '0')}
        <span className="label">hours</span>
      </Segment>
      :
      <Segment>
        {minutes.toString().padStart(2, '0')}
        <span className="label">min</span>
      </Segment>
      :
      <Segment>
        {seconds.toString().padStart(2, '0')}
        <span className="label">sec</span>
      </Segment>
    </Wrapper>
  );
};

export default Countdown;
