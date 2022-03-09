import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TravelPreferences } from '../../TravelPreferences';
import { TravelPreferences as TravelPref } from '../../../../interfaces/user';
import { createTripTypes } from '../../../AddTrip/Contents/contentSlice';
import { showNotification } from '../../../../components/BRBNotification/ShowNotification';

export interface Props {
  from?: boolean;
  onContinue: () => void;
}
export const TripTravelPreferences: React.VFC<Props> = ({
  from,
  onContinue,
}) => {
  const userProfile = useSelector(
    (state: any) => state.content.tripConfiguration,
  );
  const dispatch = useDispatch();
  const onSave = (payload: TravelPref) => {
    if (payload.tripTypes.length === 1) dispatch(createTripTypes(payload));
    // else {
    //   showNotification.warning({
    //     title: "Warning",
    //     content: "Please select only one Trip Type",
    //   });
    //   return false;
    // }
    onContinue();
  };
  return (
    <TravelPreferences
      onSave={onSave}
      userProfile={userProfile}
      from={from}
      addTrip
      onContinue={onContinue}
    />
  );
};
