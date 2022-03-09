import React, {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from 'react';

export type StepWizardAction =
  | {
      type: 'STEP_WIZARD_INIT';
      payload: {
        wizardId: string;
        stepCount: number;
        titles: string[];
        activeStepIndex?: number;
      };
    }
  | {
      type: 'STEP_WIZARD_NEXT';
      payload: {
        wizardId: string;
      };
    }
  | {
      type: 'STEP_WIZARD_PREV';
      payload: {
        wizardId: string;
      };
    }
  | {
      type: 'STEP_WIZARD_GOTO';
      payload: {
        wizardId: string;
        stepIndex: number;
      };
    };

export interface StepWizardState {
  stepCount: number;
  activeStepIndex: number;
  titles: string[];
}

export interface StepWizardGlobalState {
  [key: string]: StepWizardState;
}

export const stepWizardReducer: Reducer<
  StepWizardGlobalState,
  StepWizardAction
> = (state, action) => {
  switch (action.type) {
    case 'STEP_WIZARD_INIT':
      return {
        ...state,
        [action.payload.wizardId]: {
          ...action.payload,
          activeStepIndex: action.payload.activeStepIndex ?? 0,
        },
      };

    case 'STEP_WIZARD_NEXT':
      if (
        state[action.payload.wizardId].activeStepIndex
        === state[action.payload.wizardId].stepCount - 1
      ) {
        return { ...state };
      }

      return {
        ...state,
        [action.payload.wizardId]: {
          ...state[action.payload.wizardId],
          activeStepIndex: state[action.payload.wizardId].activeStepIndex + 1,
        },
      };

    case 'STEP_WIZARD_PREV':
      return {
        ...state,
        [action.payload.wizardId]: {
          ...state[action.payload.wizardId],
          activeStepIndex: state[action.payload.wizardId].activeStepIndex - 1,
        },
      };

    case 'STEP_WIZARD_GOTO':
      return {
        ...state,
        [action.payload.wizardId]: {
          ...state[action.payload.wizardId],
          activeStepIndex: action.payload.stepIndex,
        },
      };

    default:
      return state;
  }
};

export const StepWizardContext = createContext<
  [StepWizardGlobalState, Dispatch<StepWizardAction>]
>([{}, () => null]);

interface Props {
  wizards: StepWizardGlobalState;
  reducer?: Reducer<StepWizardGlobalState, StepWizardAction>;
}

export const StepWizardProvider: React.FC<Props> = ({
  children,
  wizards,
  reducer = stepWizardReducer,
}) => (
  <StepWizardContext.Provider value={useReducer(reducer, wizards)}>
    {children}
  </StepWizardContext.Provider>
);

export const useStepWizard = (
  wizardId: string,
): [StepWizardState, Dispatch<StepWizardAction>] => {
  const [state, dispatch] = useContext(StepWizardContext);
  return [state[wizardId] ?? {}, dispatch];
};
