import { useEffect, useState } from 'react';
import { Header, Modal, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import close from '../../../assets/images/close.svg';
import './Activities.less';
import airportsSVG from '../../../assets/images/airport.svg';
import {
  BRBCheckBoxButton,
  BRBCheckBoxButtonItem,
} from '../../../components/BRBCheckBoxButton/BRBCheckBoxButton';
import { ActivitiesData } from '../../../mockData/Activies';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import { savePreferredActivities } from '../../../Api/TravelPreferences';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import { dashboardUserUpdate } from '../../dashboard/dashboardSlice';
import { errorMessage } from '../../../utils/helper';
import { Activity } from '../../../interfaces/user';

export interface Props {
  isOpened: boolean;
  onClosePopup: () => void;
  onSave: (activities: Activity[]) => void;
}

export const Activities = ({ isOpened, onClosePopup, onSave }: Props) => {
  const [activitiesList, setActivitiesList] = useState(ActivitiesData);
  const userProfile = useSelector((state: any) => state.dashboard.user);
  const [open, setOpen] = useState(isOpened);
  const dispatch = useDispatch();
  const changeHandler = (item: BRBCheckBoxButtonItem) => {
    const data = activitiesList.map((type: BRBCheckBoxButtonItem) => (type.label === item.label ? { ...item } : type));
    setActivitiesList(data);
  };
  useEffect(() => {
    const { activities } = userProfile.preferredActivities ?? {
      activities: [],
    };
    activitiesList.forEach((d: any, index: number) => {
      d.checked = !!activities.find((p: any) => p.name === d.label);
      return d;
    });
    setActivitiesList([...activitiesList]);
  }, []);

  const onSaveActivities = (event: any) => {
    const activities: Activity[] = activitiesList
      .filter((x: BRBCheckBoxButtonItem) => x.checked)
      .map((x, index: number) => ({
        name: x.label,
        id: index,
      }));

    onSave(activities);

    // onClosePopup();
  };

  return (
    <Modal
      closeOnDimmerClick={false}
      size="small"
      className="select-activities"
      centered
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content>
        <Header as="h2">
          <Image src={airportsSVG} />

          <Header.Content>Preferred Activities</Header.Content>
          <Image
            floated="right"
            size="mini"
            onClick={onClosePopup}
            src={close}
          />
        </Header>
        <p>
          To create trips as individual as you are, tell us the type of activities you would normally gravitate towards when travelling. Select at least one activity.
        </p>
        <Header className="hide-in-mobile" as="h3">
          As a traveller, what is your preferred activity?
        </Header>
        <div className="brb-checkbox-activities">
          {activitiesList.map((item: BRBCheckBoxButtonItem) => (
            <BRBCheckBoxButton primary item={item} onChange={changeHandler} />
          ))}
        </div>
        <div className="dateRange-save-button">
          <BRBButton onClick={onSaveActivities}>Continue</BRBButton>
        </div>
      </Modal.Content>
    </Modal>
  );
};
