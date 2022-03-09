import { FC } from 'react';
import styled from 'styled-components';
import Colors from '../../../themes/Colors';

import Metrics from '../../../themes/Metrics';

import Panel, { Props as PanelProps } from '../Panel';

const Wrapper = styled.div`
  max-width: 40em;
  margin: 0 auto;
`;

const InnerWrapper = styled.div<{ textBackground?: string; }>`
  ${({ textBackground }) => {
    if (textBackground) {
      return `
        padding: ${Metrics.smallSpacer};
        border-radius: 8px;
        background-color: ${textBackground || 'transparent'}
      `;
    }
    return null;
  }}
`;

export interface Props extends PanelProps {
  textBackground?: string;
}

const TextPanel: FC<Props> = ({
  backgroundColor,
  backgroundImage,
  foregroundColor,
  padding,
  accentColor,
  textBackground,
  children,
}) => (
  <Panel
    backgroundColor={backgroundColor || Colors.brbBlue}
    backgroundImage={backgroundImage}
    padding={padding || Metrics.hugeSpacer}
    foregroundColor={foregroundColor || Colors.brbOffwhite}
    accentColor={accentColor || Colors.brbPink}
  >
    <Wrapper>
      <InnerWrapper textBackground={textBackground}>
        {children}
      </InnerWrapper>
    </Wrapper>
  </Panel>
);

export default TextPanel;
