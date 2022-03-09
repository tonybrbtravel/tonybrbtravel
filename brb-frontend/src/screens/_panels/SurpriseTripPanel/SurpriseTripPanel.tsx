import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import Spacer from '../../../components/Spacer';
import Breakpoints from '../../../themes/Breakpoints';
import Colors from '../../../themes/Colors';

import Metrics from '../../../themes/Metrics';
import Decorations from '../../../themes/Decorations';

import Overline from '../../_components/Overline';
import PanelHeading from '../../_components/PanelHeading';

import Panel, { Props as PanelProps } from '../Panel';
import Slides from './Slides';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: ${Metrics.mediumSpacer};

  .desktop-button {
    display: none;
  }

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;

    .mobile-button {
      display: none;
    }

    .desktop-button {
      display: block;
    }
  }
`;

const ExamplesWrapper = styled.div`
  position: relative;
  height: 80vh;
  width: 100%;
  max-height: 40rem;
  max-width: 40rem;
  flex-shrink: 0;

  @media (min-width: ${Breakpoints.medium}) {
    width: 50%;
  }
`;

const Examples = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: ${Decorations.shadow.light};
`;

export interface Props extends PanelProps {
  onCreateTripClick?: () => void;
}

const SurpriseTripPanel: FC<Props> = ({
  backgroundColor,
  foregroundColor,
  accentColor,
  onCreateTripClick,
}) => {
  const history = useHistory();
  const createTripAction = onCreateTripClick || (() => {
    history.push('/add-trip#create');
  });
  return (
    <Panel
      backgroundColor={backgroundColor || Colors.brbBlue}
      foregroundColor={foregroundColor || Colors.brbOffwhite}
      accentColor={accentColor || Colors.brbPink}
    >
      <Container>
        <Wrapper>

          <div>
            <Overline>
              Create a surprise trip
            </Overline>

            <PanelHeading>
              Discover amazing places across Europe
            </PanelHeading>

            <p className="simple-animate-in">
              Destinations tailored to you and the best boutique hotels hand-picked
              by our team of travel experts to ensure your stay is always
              unforgettable. That’s the BRB promise.
            </p>

            <p className="simple-animate-in">
              Check out some of the trips other members of the BRB community
              have experienced.
            </p>

            <div className="desktop-button simple-animate-in">
              <Spacer height={Metrics.mediumSpacer} />

              <BRBButton onClick={createTripAction}>
                Book your surprise trip &rarr;
              </BRBButton>
            </div>
          </div>

          <ExamplesWrapper>
            <Examples>
              <Slides />
            </Examples>
          </ExamplesWrapper>

          <BRBButton className="mobile-button simple-animate-in" onClick={createTripAction}>
            Book your surprise trip &rarr;
          </BRBButton>

        </Wrapper>
      </Container>
    </Panel>
  );
};

export default SurpriseTripPanel;
