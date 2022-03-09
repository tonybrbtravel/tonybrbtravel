import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BrbEndPoints from '../../../../Api/BrbEndPoints';
import { saveAirports } from '../../../../Api/TravelPreferences';
import { errorMessage } from '../../../../utils/helper';
import { dashboardUserUpdate } from '../../../dashboard/dashboardSlice';
import { Airports } from '../../../../interfaces/user';
import { AirportPreferences } from '../../AirportPreferences';
import { Spinner } from '../../../../components/BRBSpinner/BRBSpinner';

interface Props {
  from?: boolean;
  onContinue: () => void;
}

export const UserAirportPreferences = ({
  from,
  onContinue,
}: Props) => {
  const userProfile = useSelector((state: any) => state.dashboard.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadSaveAirport, setLoadSaveAirport] = useState<boolean>(false);
  const onSave = (payload: Airports) => {
    setLoadSaveAirport(true);
    saveAirports({
      url: BrbEndPoints.SaveAirports,
      data: payload,
    })
      .then((x) => {
        setLoadSaveAirport(false);
        dispatch(dashboardUserUpdate(x));
        if (from && from === true) {
          onContinue();
        } else {
          history.push('/city-preferences');
        }
      })
      .catch(errorMessage);
  };
  return (
    <>
      {loadSaveAirport ? <Spinner /> : ''}
      <AirportPreferences
        onSave={onSave}
        userProfile={userProfile}
        from={from}
        onContinue={onContinue}
      />
    </>
  );
};
