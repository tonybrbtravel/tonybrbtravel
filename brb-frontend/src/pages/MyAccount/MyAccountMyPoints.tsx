import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IMyAccountPoints, myAccountPoints } from '../../mockData/myAccountPoints';
import { fetchRewardsHistory } from '../../Api/myAccountApi';
import BrbEndPoints from '../../Api/BrbEndPoints';
import useApiQuery from '../../Hooks/ApiQuery';
import { dateFormat } from '../../utils/helper';

const sortRewardsItems = (a: IMyAccountPoints, b: IMyAccountPoints) => {
  if (a.id && b.id) {
    if (a.id > b.id) { return -1; }
    if (a.id < b.id) { return 1; }
    return 0;
  }
  if (a.id) { return 1; }
  if (b.id) { return -1; }
  return 0;
};

export const MyAccountMyPoints = () => {
  const history = useHistory();

  const user = useSelector((state: any) => state.dashboard.user);

  const { data: rewardsHistory } = useApiQuery<any>(
    ['rewardsHistory', user.email],
    { url: BrbEndPoints.getRewardsHistory },
    fetchRewardsHistory,
  );

  const rewardsHistoryInfo = rewardsHistory
    && rewardsHistory
      .filter((x: any) => x.points > 0)
      .map((x: any) => {
        const rewardDate = dateFormat(x.created);
        return {
          id: x.id,
          type: x.displayName,
          points: x.points,
          date: rewardDate,
          totalPoints: x.balance,
          name: x.name,
        };
      });

  const userRewardsHistory = rewardsHistory
    && myAccountPoints.map((x: any) => {
      const reward = rewardsHistoryInfo.find((d: any) => d.name.startsWith(x.name));
      if (reward) {
        return {
          ...x,
          id: reward.id,
          points: reward.points,
          date: reward.date,
          totalPoints: reward.totalPoints,
        };
      }
      return x;
    });

  const events = rewardsHistory && rewardsHistory.map((x: any) => {
    if (x.name.startsWith('trip')) {
      const rewardDate = dateFormat(x.created);
      const event = {
        id: x.id, type: x.displayName, points: x.points, totalPoints: x.balance, date: rewardDate, icon: 'plane',
      };
      return event;
    }
    return null;
  });

  if (events) {
    events.forEach((x: any) => {
      if (x !== null) {
        userRewardsHistory.push(x);
      }
    });
  }

  const monthlyPayments = rewardsHistory && rewardsHistory.map((x: any) => {
    if (x.name.startsWith('monthly_')) {
      const rewardDate = dateFormat(x.created);
      const event = {
        id: x.id, type: x.displayName, points: x.points, totalPoints: x.balance, date: rewardDate, icon: 'card',
      };
      return event;
    }
    return null;
  });

  if (monthlyPayments) {
    monthlyPayments.forEach((x: any) => {
      if (x !== null) {
        userRewardsHistory.push(x);
      }
    });
  }

  const addTrip = {
    type: 'create Trip', date: '', navLink: '/add-trip#create', icon: 'plane',
  };

  if (userRewardsHistory) {
    userRewardsHistory.push(addTrip);
  }

  return (
    <div className="my-points">
      <div className="ui container">
        <h2>
          My
          {' '}
          <span>Points</span>
        </h2>

        {userRewardsHistory
          && userRewardsHistory.sort(sortRewardsItems).map((item: IMyAccountPoints) => (
            <Fragment key={`${item.type}-${item.id}`}>
              {item.date !== '' ? (
                <div className="my-point-values">
                  <div className="main-row">
                    <div className="data-val">{item.date}</div>
                    <div className="data-val2">{item.type}</div>
                    <div className="data-val">
                      +
                      {item.points}
                    </div>
                    <div className="data-val">
                      <svg
                        width="16"
                        height="20"
                        className="flight-icon"
                        viewBox="0 0 16 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.90123 0L15.8025 19.2593L15.0617 20L7.90123 16.8395L0.740741 20L0 19.2593L7.90123 0Z"
                          fill="#20BE8A"
                        />
                      </svg>
                      {' '}
                      {item.totalPoints}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => history.push(item.navLink)}
                  className="mp-header-val"
                >
                  <span>+</span>
                  {`Earn Points: ${item.type}`}
                  <i
                    aria-hidden="true"
                    className={`${item.icon} icon`}
                  />
                </button>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};
