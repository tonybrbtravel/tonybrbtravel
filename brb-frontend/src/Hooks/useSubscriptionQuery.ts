import { useSelector } from 'react-redux';
import useApiQuery from './ApiQuery';
import { IUsersubscription } from '../interfaces/myAccountType';
import BrbEndPoints from '../Api/BrbEndPoints';
import { fetchUserSubscriptionDetails } from '../Api/myAccountApi';

const useSubscriptionQuery = () => {
  const user = useSelector((state: any) => state.dashboard.user);
  return useApiQuery<IUsersubscription>(
    ['accSubscription', user.id],
    { url: BrbEndPoints.getUserSubscriptionDetails },
    fetchUserSubscriptionDetails,
  );
};

export default useSubscriptionQuery;
