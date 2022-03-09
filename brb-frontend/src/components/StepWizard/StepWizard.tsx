import clsx from 'clsx';
import { Grid, Step } from 'semantic-ui-react';
import { useStepWizard } from '../../context/stepWizardContext';
import './StepWizard.less';

export const StepWizard = ({
  activeStepIndex = 0,
}: {
  activeStepIndex: number;
}) => {
  const wizardId = 'test';
  const [wizardState, dispatch] = useStepWizard(wizardId);
  return (
    <Step.Group className={clsx('header-progress')} unstackable>
      {Array.from(Array(wizardState.stepCount).keys()).map((i) => (
        <Step
          key={i}
          completed={i < activeStepIndex}
          active={i === activeStepIndex}
        >
          <Step.Content>
            <Step.Title>{wizardState.titles[i]}</Step.Title>
          </Step.Content>
        </Step>
      ))}
    </Step.Group>
  );
};
