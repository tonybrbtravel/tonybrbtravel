import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BrbEndPoints from '../../../../../Api/BrbEndPoints';
import { savePreferredActivities } from '../../../../../Api/TravelPreferences';
import { Activity } from '../../../../../interfaces/user';
import { errorMessage } from '../../../../../utils/helper';
import { dashboardUserUpdate } from '../../../../dashboard/dashboardSlice';
import { Activities } from '../../Activities';
import { Spinner } from '../../../../../components/BRBSpinner/BRBSpinner';
import { showNotification } from '../../../../../components/BRBNotification/ShowNotification';

export interface Props {
  isOpened: boolean;
  onClosePopup: () => void;
}
export const ProfileActivity: React.VFC<Props> = ({
  isOpened,
  onClosePopup,
}) => {
  const dispatch = useDispatch();
  const [loaderSaveActivities, setLoaderSaveActivities] = useState<boolean>(false);
  const onSave = (activities: Activity[]) => {
    const payload = {
      activities,
    };

    if (activities.length < 1) {
      showNotification.error({
        title: 'Error',
        content: 'Please select at least 1 activity',
      });

      return false;
    }

    setLoaderSaveActivities(true);
    savePreferredActivities({
      url: BrbEndPoints.saveActivities,
      data: payload,
    }).then((x) => {
      setLoaderSaveActivities(false);
      dispatch(dashboardUserUpdate(x));
    })
      .catch(errorMessage);

    if (isOpened) {
      onClosePopup();
    }

    return true;
  };

  return (
    <>
      {loaderSaveActivities ? <Spinner /> : ''}
      <Activities
        onSave={onSave}
        isOpened={isOpened}
        onClosePopup={onClosePopup}
      />
    </>
  );
};
