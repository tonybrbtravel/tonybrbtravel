import React, { ReactNode } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStepWizard } from '../../context/stepWizardContext';

export interface Props {
  wizardId: string;
  steps: ReactNode[];
}
export const StepWizardContent = ({ wizardId, steps }: Props) => {
  const [wizardState] = useStepWizard(wizardId);
  const activeIndex = wizardState.activeStepIndex;
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>{steps[activeIndex]}</Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
