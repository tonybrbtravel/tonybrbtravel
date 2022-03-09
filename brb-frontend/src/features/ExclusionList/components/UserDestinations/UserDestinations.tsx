import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import BrbEndPoints from '../../../../Api/BrbEndPoints';
import {
  saveExcludedDestinations,
  saveTravelTypes,
} from '../../../../Api/TravelPreferences';
import { errorMessage } from '../../../../utils/helper';
import { dashboardUserUpdate } from '../../../dashboard/dashboardSlice';
import { Destinations, DisplayType } from '../../Destinations';
import { Top10Destinations } from '../../../../interfaces/user';
import { exclusionsFormUpdate } from '../../exclusionListSlice';
import { Spinner } from '../../../../components/BRBSpinner/BRBSpinner';

interface Props {
  displayTypeProp: DisplayType;
  onContinue: () => void;
  isModalPopup?: boolean;
  pageName?: string;
}

export const UserDestinations = ({
  displayTypeProp,
  onContinue,
  isModalPopup,
  pageName,
}:Props) => {
  const userProfile = useSelector((state: any) => state.dashboard.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaderSaveDestinations, setLoaderSaveDetinations] = useState<boolean>();
  const queryClient = useQueryClient();
  const onSave = (payload: Top10Destinations) => {
    setLoaderSaveDetinations(true);
    if (isModalPopup && isModalPopup === true) {
      if (pageName === 'excludedDestinations') {
        saveExcludedDestinations({
          url: BrbEndPoints.excludedDestinations,
          data: payload,
        })
          .then((x) => {
            queryClient.invalidateQueries('userRewardsPoints');
            dispatch(dashboardUserUpdate(x));
          })
          .catch(errorMessage);
      } else {
        dispatch(exclusionsFormUpdate(payload));
      }
      onContinue();
    } else {
      setLoaderSaveDetinations(false);
      dispatch(exclusionsFormUpdate(payload));
      history.push('/travel-profile');
    }
  };
  return (
    <>
      {loaderSaveDestinations ? <Spinner /> : ''}
      <Destinations
        onSave={onSave}
        userProfile={userProfile}
        displayTypeProp={displayTypeProp}
        onContinue={onContinue}
        pageName={pageName}
        isModalPopup={isModalPopup}
      />
    </>
  );
};
