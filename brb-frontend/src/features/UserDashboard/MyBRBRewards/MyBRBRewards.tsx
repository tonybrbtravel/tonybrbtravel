import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Header,
  Icon,
  Segment,
  Container,
} from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';

import useRewardsPointsQuery from '../../../Hooks/useRewardsPointsQuery';
import { TravelTypesData } from '../../../mockData/triptypes';
import { TripType } from '../../../interfaces/tripType';

import BRBPinkText from '../../../components/BRBPinkText';
import BRBSwiper from '../../../components/BRBSwiper';
import { MyAccountMyPoints } from '../../../pages/MyAccount/MyAccountMyPoints';
import { MyBRBRewardsSlider } from './MyBRBRewardsSlider';
import { BRBButton } from '../../../components/BRBButton/BRBButton';

import './MyBRBRewards.less';
import ScrollTarget from '../../../components/ScrollTarget';

export interface IMyBRBRewardsProps {
  pageName?: string;
}

const MyBRBRewards: React.FC<IMyBRBRewardsProps> = ({ pageName }) => {
  const history = useHistory();
  const location = useLocation<any>();
  const user = useSelector((state: any) => state.dashboard.user);

  const { data: rewardPoints } = useRewardsPointsQuery();

  const onViewPoints = () => {
    history.push('/my-account');
  };

  const brbCalRef = React.useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (brbCalRef.current && location?.state?.brbRewards === true) {
      brbCalRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname]);

  return (
    <div className="my-brb-rewards" ref={brbCalRef}>
      <Container>
        <Grid padded>
          <Grid.Row>
            {/* <Grid.Column
              tablet={1}
              computer={1}
              only="computer tablet"
            ></Grid.Column> */}
            <Grid.Column mobile={12} tablet={12} computer={12}>
              <Header image as="h2">
                {pageName === 'myAccount' ? (
                  <>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 39 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5489 0.927052C18.8483 0.00574183 20.1517 0.00574017 20.4511 0.927051L24.3271 12.8561C24.4609 13.2682 24.8449 13.5471 25.2781 13.5471H37.8211C38.7898 13.5471 39.1926 14.7867 38.4089 15.3561L28.2614 22.7287C27.9109 22.9834 27.7642 23.4347 27.8981 23.8467L31.7741 35.7758C32.0735 36.6971 31.019 37.4633 30.2353 36.8939L20.0878 29.5213C19.7373 29.2666 19.2627 29.2666 18.9122 29.5213L8.76473 36.8939C7.98102 37.4633 6.92654 36.6971 7.22589 35.7758L11.1019 23.8467C11.2358 23.4347 11.0891 22.9834 10.7386 22.7287L0.591127 15.3561C-0.192586 14.7867 0.210188 13.5471 1.17891 13.5471H13.7219C14.1551 13.5471 14.5391 13.2682 14.6729 12.8561L18.5489 0.927052Z"
                        fill="#FFF9F8"
                      />
                    </svg>

                    <Header.Content className="brb-rewards-heading">
                      <BRBPinkText>BRB</BRBPinkText>
                      {' '}
                      Rewards
                    </Header.Content>
                  </>
                ) : (
                  <>
                    <Icon name="gift" size="huge" />
                    <Header.Content>
                      My
                      {' '}
                      <BRBPinkText>BRB</BRBPinkText>
                      {' '}
                      Rewards
                    </Header.Content>
                  </>
                )}
              </Header>
            </Grid.Column>

            {pageName === 'myAccount' && (
              <Grid.Column
                mobile={4}
                tablet={4}
                computer={4}
                floated="right"
              >
                <Segment style={{ whiteSpace: 'no-wrap' }}>
                  <BRBPinkText>
                    {rewardPoints}
                  </BRBPinkText>
                  {' '}
                  pts
                </Segment>
              </Grid.Column>
            )}

          </Grid.Row>

          {pageName !== 'myAccount'
            && (
              <Grid.Row>
                {/* <Grid.Column
              tablet={1}
              computer={1}
              only="computer tablet"
              textAlign="center"
            ></Grid.Column> */}

                <Grid.Column mobile={16} tablet={13} computer={13}>
                  <div className="reward-info">
                    We reward you every step of the way, from making your monthly
                    payments to creating a trip. The more points you get, the better
                    the rewards you unlock.
                  </div>
                </Grid.Column>

                <Grid.Column
                  tablet={2}
                  computer={2}
                  only="computer tablet"
                  floated="right"
                >
                  <Segment>
                    <BRBPinkText>
                      {rewardPoints}
                    </BRBPinkText>
                    {' '}
                    pts
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            )}
          <Grid.Row>
            <Grid.Column
              tablet={1}
              computer={1}
              only="computer tablet"
              textAlign="center"
            />
            <MyBRBRewardsSlider />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              {pageName === 'myAccount' ? (
                <></>
              ) : (
                <>
                  <BRBButton className="view-my-points" onClick={onViewPoints}>
                    View My Points
                  </BRBButton>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      {pageName === 'myAccount' ? <MyAccountMyPoints /> : <></>}
    </div>
  );
};

export default MyBRBRewards;
