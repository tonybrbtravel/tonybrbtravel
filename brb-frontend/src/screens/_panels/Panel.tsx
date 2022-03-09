import { FC } from 'react';
import styled from 'styled-components';
import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

const defaults = {
  // When backgroundColor is unspecified during use it falls back to a bright
  // purple, intended to highlight those cases so they can be addressed in the
  // corect place in the code. (Should never be seen in production.)
  backgroundColor: '#a01fed',

  // If a backgroundImage is provided we don't need to provide a background
  // colorshow, and we want to avoid any possibility of a flash of the bright
  // purple specified above.
  backgroundColorWithImage: Colors.brbBlue,

  // Sensible defaults for panel elements. Intended to cascade.
  foregroundColor: Colors.brbOffwhite,
  accentColor: Colors.brbPink,

  // Vertical padding
  padding: Metrics.mediumSpacer,
};

export interface Props {
  backgroundImage?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  accentColor?: string;
  padding?: string;
}

const PanelWrapper = styled.div<Props>`
  position: relative;
  color: ${({ foregroundColor }) => foregroundColor || defaults.foregroundColor};
  padding-top: ${({ padding }) => padding || defaults.padding};
  padding-bottom: ${({ padding }) => padding || defaults.padding};

  background-color: ${({ backgroundImage, backgroundColor }) => {
    if (backgroundImage) { return defaults.backgroundColorWithImage; }
    return backgroundColor || defaults.backgroundColor;
  }};

  ${({ backgroundImage }) => (
    backgroundImage
      ? `
        background-image: url(${backgroundImage});
      `
      : null
  )}

  .accent {
    color: ${({ accentColor }) => accentColor || defaults.accentColor};
  };
`;

const Panel: FC<Props> = ({
  backgroundImage, backgroundColor, foregroundColor, accentColor, children, padding,
}) => (
  <PanelWrapper
    backgroundImage={backgroundImage}
    backgroundColor={backgroundColor}
    foregroundColor={foregroundColor}
    accentColor={accentColor}
    padding={padding}
  >
    {children}
  </PanelWrapper>
);

export default Panel;
