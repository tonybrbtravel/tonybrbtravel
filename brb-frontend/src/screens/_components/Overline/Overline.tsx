import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-transform: uppercase;
  font-size: 1.25rem;
  font-weight: 700;
`;

export interface Props {
  icon?: string;
}

const Overline: FC<Props> = ({
  icon,
  children,
}) => (
  <Wrapper className="simple-animate-in">
    { icon ? (`${icon} c`) : null }
    {children}
  </Wrapper>
);

export default Overline;
