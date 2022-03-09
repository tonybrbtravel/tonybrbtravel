import React from 'react';
import { useDispatch } from 'react-redux';
import { Activity } from '../../../../../interfaces/user';
import { createActivitySave } from '../../../Contents/contentSlice';
import { Activities } from '../../Activities';

export interface Props {
  isOpened: boolean;
  onClosePopup: () => void;
}
export const TripActivity: React.VFC<Props> = ({ isOpened, onClosePopup }) => {
  const dispatch = useDispatch();
  const onSave = (activities: Activity[]) => {
    dispatch(createActivitySave(activities));
  };

  return (
    <Activities
      onSave={onSave}
      isOpened={isOpened}
      onClosePopup={onClosePopup}
    />
  );
};
