import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { Dimmer, Loader } from 'semantic-ui-react';
import BrbEndPoints from '../../../../Api/BrbEndPoints';
import {
  deleteTraveller,
  saveAddTraveller,
} from '../../../../Api/TravelPreferences';
import { Traveller } from '../../../../interfaces/Traveller';
import { errorMessage } from '../../../../utils/helper';
import { dashboardUserUpdate } from '../../../dashboard/dashboardSlice';
import { createAdditionalTravellerSave } from '../../Contents/contentSlice';
import CreateNewTraveller from '../CreateNewTraveller';
import { Spinner } from '../../../../components/BRBSpinner/BRBSpinner';
import { showNotification } from '../../../../components/BRBNotification/ShowNotification';

export interface Props {
  isOpened: boolean;
  onChange: (open: boolean) => void;
  traveller?: Traveller;
  onSaveNewTraveller: () => void;
  headerText?: string;
  isAdditional?: boolean;
}

export const ProfileNewTraveller: React.VFC<Props> = ({
  isOpened,
  onSaveNewTraveller,
  traveller,
  onChange,
  headerText,
  isAdditional,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.dashboard.user ?? {});
  const queryClient = useQueryClient();

  const addTravellersMutation = useMutation<string, AxiosError, Traveller[]>(
    'addTravellersMutation',
    (savedTraveller) => saveAddTraveller({
      url: BrbEndPoints.additionalTravelers,
      data:
        user.travellers && user.travellers.length && !savedTraveller[0].brbUser
          ? [...user.travellers, ...savedTraveller]
          : savedTraveller,
    }),
    {
      onSuccess: (response: any) => {
        queryClient.invalidateQueries('addTravellersMutation');

        // Update the user state
        dispatch(dashboardUserUpdate(response));

        // We assume the last element in the returned travellers array is the
        // new one so we add it to the selection
        // TODO: rename createAdditionalTravellerSave
        const newTraveller = response.travellers[response.travellers.length - 1];
        dispatch(createAdditionalTravellerSave([newTraveller]));

        onSaveNewTraveller(); // Just closes modal??
      },
    },
  );

  const onSave = async (traveller: Traveller[]) => {
    await addTravellersMutation.mutateAsync(traveller);
  };

  const removeTravellerMutation = useMutation<string, AxiosError, number>(
    'removeTraveller',
    (travellerId) => deleteTraveller({
      url: `${BrbEndPoints.deleteAdditionTraveller}/${travellerId}`,
    }),
    {
      onSuccess: (response, travellerId) => {
        queryClient.invalidateQueries('removeTraveller');
        const userProfile = JSON.parse(JSON.stringify(user));
        userProfile.travellers = userProfile.travellers.filter(
          (x: Traveller) => x.id !== travellerId,
        );
        dispatch(dashboardUserUpdate(userProfile));
        onSaveNewTraveller();
      },
    },
  );
  const onRemove = async (id: number) => {
    await removeTravellerMutation.mutateAsync(id);
  };
  return (
    <>
      {addTravellersMutation.isLoading || removeTravellerMutation.isLoading ? (
        <Dimmer active page>
          <Loader content="Loading" />
        </Dimmer>
      ) : (
        <CreateNewTraveller
          isOpened={isOpened}
          onDeleteTraveller={onRemove}
          onSaveNewTraveller={onSave}
          traveller={traveller}
          headerText={headerText}
          onChange={onChange}
          isAdditional={isAdditional}
        />
      )}
    </>
  );
};
