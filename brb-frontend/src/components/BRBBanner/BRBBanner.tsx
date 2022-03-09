import { FC } from 'react';
import styled from 'styled-components';
import Breakpoints from '../../themes/Breakpoints';
import Metrics, { unitless } from '../../themes/Metrics';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  padding: ${unitless(Metrics.navHeight) + unitless(Metrics.smallSpacer)}px ${Metrics.smallSpacer};

  @media (min-width: ${Breakpoints.medium}) {
    padding: ${unitless(Metrics.navHeight) + unitless(Metrics.mediumSpacer)}px ${Metrics.mediumSpacer};
  }
`;

// A separate element because of iOS Safari's refusal to properly handle
// background-attachment: fixed
// TODO: Currently breaks if more than one 'fixed' version of this component is
// on the same screen, due to stacking. (The last background in the source order
// is visible for all of them.)
const BackgroundImage = styled.div<{
  backgroundImage?: string;
  fixed?: boolean;
}>`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'absolute')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : 'none')};
  background-size: cover;
  background-position: center center;
`;

const Content = styled.div<{
  fullWidth?: boolean;
}>`
  margin: 0 auto;
  max-width: ${({ fullWidth }) => (fullWidth ? 'none' : '600px')};
`;

interface Props {
  backgroundImage?: string;
  className?: string;
  fullWidth?: boolean;
  fixed?: boolean;
}

const BRBBanner: FC<Props> = ({
  className,
  fullWidth,
  fixed,
  backgroundImage,
  children,
}) => (
  <Wrapper className={className}>
    <BackgroundImage backgroundImage={backgroundImage} fixed={fixed} />
    <Content fullWidth={fullWidth}>
      {children}
    </Content>
  </Wrapper>
);

BRBBanner.defaultProps = {
  backgroundImage: '',
  className: '',
  fullWidth: false,
  fixed: false,
};

export default BRBBanner;
