import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.h2`
  font-size: 3.5rem;
  line-height: 1.1;
  font-weight: 700;
`;

const PanelHeading: FC = ({
  children,
}) => (
  <Wrapper className="simple-animate-in">
    {children}
  </Wrapper>
);

export default PanelHeading;
