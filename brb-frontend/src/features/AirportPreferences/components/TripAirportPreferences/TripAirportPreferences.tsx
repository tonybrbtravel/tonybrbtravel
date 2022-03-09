import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Airports } from '../../../../interfaces/user';
import { createAirports } from '../../../AddTrip/Contents/contentSlice';
import { AirportPreferences } from '../../AirportPreferences';

export interface Props {
  from?: boolean;
  onContinue: () => void;
}
export const TripAirportPreferences: React.VFC<Props> = ({
  from,
  onContinue,
}) => {
  const userProfile = useSelector(
    (state: any) => state.content.tripConfiguration,
  );
  const dispatch = useDispatch();
  const onSave = (payload: Airports) => {
    dispatch(createAirports(payload));
    onContinue();
  };
  return (
    <AirportPreferences
      onSave={onSave}
      userProfile={userProfile}
      from={from}
      onContinue={onContinue}
    />
  );
};
