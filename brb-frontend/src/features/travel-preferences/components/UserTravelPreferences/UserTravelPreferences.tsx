import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BrbEndPoints from '../../../../Api/BrbEndPoints';
import { saveTravelTypes } from '../../../../Api/TravelPreferences';
import { errorMessage } from '../../../../utils/helper';
import { dashboardUserUpdate } from '../../../dashboard/dashboardSlice';
import { TravelPreferences } from '../../TravelPreferences';
import { TravelPreferences as TravelPref } from '../../../../interfaces/user';
import { Spinner } from '../../../../components/BRBSpinner/BRBSpinner';
import { showNotification } from '../../../../components/BRBNotification/ShowNotification';

export interface Props {
  from?: boolean;
  pageName?: string;
  onContinue: () => void;
}
export const UserTravelPreferences = ({
  from,
  onContinue,
  pageName,
}: Props) => {
  const userProfile = useSelector((state: any) => state.dashboard.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const onSave = (payload: TravelPref) => {
    if (payload.tripTypes.length < 1) {
      showNotification.error({
        title: 'Error',
        content: 'Please select at least 1 trip type',
      });

      return false;
    }

    setLoading(true);

    saveTravelTypes({ url: BrbEndPoints.SaveTripTypes, data: payload })
      .then((x) => {
        setLoading(false);
        dispatch(dashboardUserUpdate(x));
        if (from && from === true) {
          onContinue();
        } else {
          history.push('/airport-preferences');
        }
      })
      .catch(errorMessage);

    return true;
  };

  return (
    <>
      {loading ? <Spinner /> : ''}
      <TravelPreferences
        onSave={onSave}
        userProfile={userProfile}
        from={from}
        addTrip={false}
        onContinue={onContinue}
        pageName={pageName}
      />
    </>
  );
};
