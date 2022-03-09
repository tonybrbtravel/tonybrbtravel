import useApiQuery from './ApiQuery';
import BrbEndPoints from '../Api/BrbEndPoints';
import { fetchRewardsPointsInfo } from '../Api/myAccountApi';

// TODO: look at caching or debouncing
// -- seems to make an API request every time, even if already called during
// the current tick/render?
// Have left following redux-related code commented, is probably the way to go.

// import { useSelector } from 'react-redux';
// const user = useSelector((state: any) => state.dashboard.user);
// console.info('user (state.dashboard.user) fetched from redux store but not used?', user);

const useRewardsPointsQuery = () => useApiQuery<any>(
  ['userRewardsPoints'],
  { url: BrbEndPoints.getRewardPointsInfo },
  fetchRewardsPointsInfo,
  // {refetchOnWindowFocus:false,refetchOnMount:true}
);

export default useRewardsPointsQuery;
