import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showNotification } from '../../../components/BRBNotification/ShowNotification';
import useSubscriptionQuery from '../../../Hooks/useSubscriptionQuery';
import { trackSubscriptionCompletion } from '../../_utilities/tracking';
import {
  createSubscription,
  getTripBalanceInfo,
  reauthenticate,
  updateSubscriptionRewards,
} from './subscriptionCalculatorSlice';

export const SuccessRedirect = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.dashboard.user);
  const queryClient = useQueryClient();

  const { data: subscriptionDetails } = useSubscriptionQuery();

  const history = useHistory();
  useEffect(() => {
    dispatch(reauthenticate(true));
    dispatch(getTripBalanceInfo({}));
    dispatch(updateSubscriptionRewards(null));
    // dispatch(createSubscription(true));

    trackSubscriptionCompletion({
      travellers: subscriptionDetails?.travellers || 0,
      nights: subscriptionDetails?.nights || 0,
      value: (subscriptionDetails?.amount || 0) / 100,
    });

    showNotification.success({
      title: 'Success!',
      content: 'Subscription completed successfully!',
    });

    // history.push('/my-account');
  }, []);

  queryClient.invalidateQueries('userRewardsPoints');
  queryClient.invalidateQueries('accSavings');

  return <></>;
};
