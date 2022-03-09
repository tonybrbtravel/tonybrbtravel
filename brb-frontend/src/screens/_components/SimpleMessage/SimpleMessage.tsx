import styled from 'styled-components';
import Metrics from '../../../themes/Metrics';

const SimpleMessage = styled.div`
color: currentColor;
  border: 2px solid currentColor;
  padding: 1rem 1.5rem;
  max-width: 40rem;
  font-size: 1rem;
  margin: ${Metrics.mediumSpacer} auto;

  a {
    display: inline-block;
  }
`;

export default SimpleMessage;
