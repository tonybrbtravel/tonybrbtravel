import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import BrbEndPoints from '../../../../Api/BrbEndPoints';
import { deleteTraveller } from '../../../../Api/TravelPreferences';
import { Traveller } from '../../../../interfaces/Traveller';
import { User } from '../../../../interfaces/user';
import { dashboardUserUpdate } from '../../../dashboard/dashboardSlice';
import { AdditionalTraveller } from '../AdditionalTraveller';

export interface Props {
  isOpened: boolean;
  onChange: (open: boolean) => void;
  onClosePopup: () => void;
  onOpenAddNewTraveller: () => void;
}
export const ProfileAdditionalTraveller: React.VFC<Props> = ({
  isOpened,
  onChange,
  onClosePopup,
  onOpenAddNewTraveller,
}) => {
  const dispatch = useDispatch();
  const userProfile: User = useSelector((state: any) => state.dashboard.user);
  const travellers = JSON.parse(JSON.stringify(userProfile.travellers ?? []));
  const queryClient = useQueryClient();
  const removeTravellerMutation = useMutation<string, AxiosError, number>(
    'removeTraveller',
    (travellerId) => deleteTraveller({
      url: `${BrbEndPoints.deleteAdditionTraveller}/${travellerId}`,
    }),
    {
      onSuccess: (response, travellerId) => {
        queryClient.invalidateQueries('removeTraveller');
        const user = JSON.parse(JSON.stringify(userProfile));
        user.travellers = travellers.filter(
          (x: Traveller) => x.id !== travellerId,
        );
        dispatch(dashboardUserUpdate(user));
        onClosePopup();
      },
    },
  );
  const onRemove = async (removedUser: Traveller) => {
    const travellerId = travellers.find(
      (x: Traveller) => x.id === removedUser.id,
    ).id;
    await removeTravellerMutation.mutateAsync(travellerId);
  };
  return (
    <div>
      {removeTravellerMutation.isLoading ? (
        <Dimmer active page>
          <Loader content="Loading" />
        </Dimmer>
      ) : (
        <AdditionalTraveller
          isOpened={isOpened}
          travellers={[...travellers].filter((x: Traveller) => !x.brbUser)}
          onChange={onChange}
          onClosePopup={onClosePopup}
          onRemove={onRemove}
          onOpenAddNewTraveller={onOpenAddNewTraveller}
        />
      )}
    </div>
  );
};
