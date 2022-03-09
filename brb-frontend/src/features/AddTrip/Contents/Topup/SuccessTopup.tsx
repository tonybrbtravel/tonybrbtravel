import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showNotification } from '../../../../components/BRBNotification/ShowNotification';
import {
  createSubscription,
  getTripBalanceInfo,
  reauthenticate,
} from '../../../../screens/_panels/SubscriptionCalculatorPanel/subscriptionCalculatorSlice';
import { createTripTopupFormUpdate } from '../contentSlice';

export const SuccessTopup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.dashboard.user);

  const history = useHistory();
  useEffect(() => {
    dispatch(reauthenticate(true));
    dispatch(createTripTopupFormUpdate());
    // dispatch(createSubscription(true));
    showNotification.success({
      title: 'Success!',
      content: 'Topup payment completed successfully!',
    });
  }, []);

  // history.push('/my-trips');

  return <></>;
};
