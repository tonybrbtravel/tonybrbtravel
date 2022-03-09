import { Grid, Image } from 'semantic-ui-react';
import logo from '../../../../assets/images/logo.svg';
import { StepWizard } from '../../../../components/StepWizard/StepWizard';
import './TravelHeader.less';

export interface Props {
  activeStepIndex: number;
}
export const TravelHeader = ({ activeStepIndex }: Props) => (
  <div className="travel-banner">
    <Grid columns={2} padded>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={3} computer={3} className="img-logo">
          <Image src={logo} />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={13} computer={13}>
          <StepWizard activeStepIndex={activeStepIndex} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);
