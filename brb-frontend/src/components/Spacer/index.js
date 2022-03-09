/**
 *
 * Spacer
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';
import Metrics from '../../themes/Metrics';

const Div = styled.div`
  height: ${({ mobileHeight, height }) => mobileHeight || height};
  background-color: ${({ backgroundColor }) => backgroundColor};

  @media screen and (min-width: 500px) {
    height: ${({ height }) => height};
  }
`;

function Spacer({ height = Metrics.smallSpacer, mobileHeight, backgroundColor = 'transparent' }) {
  return (
    <Div
      aria-hidden="true"
      height={height}
      mobileHeight={mobileHeight}
      backgroundColor={backgroundColor}
    />
  );
}

Spacer.propTypes = {
  height: PropTypes.string,
  mobileHeight: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Spacer;
