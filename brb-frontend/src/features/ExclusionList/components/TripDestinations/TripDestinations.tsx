import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Top10Destinations } from '../../../../interfaces/user';
import {
  createDestinations,
  createExcludedDestinations,
} from '../../../AddTrip/Contents/contentSlice';
import { Destinations, DisplayType } from '../../Destinations';

export interface Props {
  displayTypeProp: DisplayType;
  onContinue: () => void;
  isModalPopup?: boolean;
  pageName?: string;
}
export const TripDestinations: React.VFC<Props> = ({
  displayTypeProp,
  onContinue,
  isModalPopup,
  pageName,
}) => {
  const tripConfiguration = useSelector(
    (state: any) => state.content.tripConfiguration,
  );
  const dispatch = useDispatch();
  const onSave = (payload: Top10Destinations) => {
    if (pageName === 'excludedDestinations') {
      dispatch(createExcludedDestinations(payload));
    } else {
      dispatch(createDestinations(payload));
    }
    onContinue();
  };
  const userDetails = useMemo(() => {
    const destinations: any = {};

    destinations.excludedDestinations = JSON.parse(
      JSON.stringify(tripConfiguration.excludedDestinations),
    );

    destinations.top10Destinations = JSON.parse(
      JSON.stringify(tripConfiguration.top10Destinations),
    );

    return destinations;
  }, [tripConfiguration]);
  return (
    <Destinations
      onSave={onSave}
      userProfile={userDetails}
      displayTypeProp={displayTypeProp}
      onContinue={onContinue}
      pageName={pageName}
      isModalPopup={isModalPopup}
    />
  );
};
