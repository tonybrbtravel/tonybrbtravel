import { useEffect, useState } from 'react';
import {
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Progress,
  Container,
} from 'semantic-ui-react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import './MyTravelSavings.less';
import euro from '../../../images/euro.png';
import plane from '../../../assets/images/plane.svg';
import BRBPinkText from '../../../components/BRBPinkText';
import useApiQuery from '../../../Hooks/ApiQuery';
import { getMyTravelSavings } from '../../../Api/dashboardApi';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import { fetchUserSubscriptionDetails } from '../../../Api/myAccountApi';
import { IExpenseChart } from '../../../interfaces/mySavingsType';
import { IUsersubscription, subscriptionStatus } from '../../../interfaces/myAccountType';
import useSubscriptionQuery from '../../../Hooks/useSubscriptionQuery';

export interface IMyTravelSavingsProps { }

const MyTravelSavings = () => {
  const user = useSelector((state: any) => state.dashboard.user);
  const { pathname } = useLocation();
  const history = useHistory();
  const [mySavings, setSelectedTypes] = useState<any>();
  const [isScrolled, setScrolled] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  const { data: subscriptionDetails } = useSubscriptionQuery();
  const [intervalMs, setIntervalMs] = useState<number | undefined>(2000);

  const subscriptionInfoStatus = subscriptionDetails?.status?.toUpperCase() ? (subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.NotSubscribed || subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Subscribed) : false;

  const { data: travelSavings } = useApiQuery<any>(
    ['accSavings'],
    { url: BrbEndPoints.myTravelSavings },
    getMyTravelSavings,
    { refetchInterval: intervalMs },
  );

  useEffect(() => {
    // console.log('substatus',subscriptionInfoStatus,'savv',travelSavings);
    if (travelSavings && travelSavings?.available > 0) {
      setIntervalMs(undefined);
    }

    return () => {
      setIntervalMs(undefined);
    };
  }, [travelSavings]);

  const isMobile: boolean = width <= 768;
  const handleScroll = () => {
    const scrollTop = window.pageYOffset !== undefined
      ? window.pageYOffset
      : (
        document.documentElement
        || document.body.parentNode
        || document.body
      ).scrollTop;
    if (pathname === '/my-account') {
      setScrolled(scrollTop > 400);
    } else if (pathname === '/dashboard') {
      setScrolled(scrollTop > 950);
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  // useEffect(() => {
  // }, [travelSavings]);
  // Based on the below one we are diplaying the colors
  const expenseLabel: IExpenseChart[] = [
    {
      label: 'Saved',
      color: 'black',
      labelColor: 'black',
    },
    {
      label: 'Used',
      color: 'grey',
      labelColor: 'black',
    },
    {
      label: 'Available',
      color: 'red',
      labelColor: 'rgb(233, 69, 96)',
    },
  ];

  const onSubscribe = () => {
    history.push('/dashboard#subscribe');
  };

  const onCreateTrip = () => {
    history.push('/add-trip');
  };

  const inEffect = `
    @keyframes fade-in {
      0% { width: 0; }
      100% { width: 100%; }
    }
  `;
  return (
    <div className="my-travel-savings">
      <Container>
        <Grid columns={2} padded>
          <Grid.Row>
            <Grid.Column
              tablet={1}
              computer={1}
              only="computer tablet"
            />
            <Grid.Column mobile={16} tablet={15} computer={16}>
              <Header image as="h2">
                <Image src={euro} alt="euro-symbol" />
                <Header.Content>
                  My Travel
                  {' '}
                  <BRBPinkText>Savings</BRBPinkText>
                  {' '}
                  <BRBPinkText size="small">
                    <span className="earn-points" data-tooltip="Earn points for every monthly payment you make and unlock amazing rewards">
                      +Earn points
                      <Icon
                        className="help-icon"
                        name="question circle outline"
                        size="small"
                      />
                    </span>
                  </BRBPinkText>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="" mobile={16} tablet={8} computer={8} textAlign="center">
              <div className="caption">
                {(subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Subscribed || subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Paused)
                  ? (
                    <p>
                      You’re already saving and unlocking amazing rewards! Time to create your next
                      trip and tick places off your bucket list.
                    </p>
                  ) : (
                    <p>
                      Time to start saving! Select the number of nights you want to travel each year
                      and we’ll break this down into one easy to manage monthly subscription.
                      You’ll earn points for every payment, and unlock amazing rewards.
                    </p>
                  )}
              </div>
              <Header textAlign="center" className="account-header">Your Account Balance is</Header>
              <Header as="h4" textAlign="center" className="account-balance">
                <BRBPinkText>
                  {' '}
                  £
                  {(travelSavings?.available / 100).toFixed(2)}
                </BRBPinkText>
              </Header>
              {(subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Subscribed || subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Paused) ? (
                <BRBButton className="subscribe-points" onClick={onCreateTrip}>
                  Create Trip
                  <small>+Earn Points</small>
                </BRBButton>
              ) : (
                <BRBButton className="subscribe-points" onClick={onSubscribe}>
                  Subscribe
                  <small>+Earn Points</small>
                </BRBButton>
              )}

            </Grid.Column>
            <Grid.Column className="travel-saving-block" mobile={16} tablet={8} computer={8} textAlign="center">
              <Card className="expense-table">
                {expenseLabel.map((item, index) => {
                  let savings = 0.00;
                  switch (item.label) {
                    case 'Saved':
                      savings = parseInt(travelSavings?.saved, 10);
                      break;
                    case 'Used':
                      savings = parseInt(travelSavings?.used, 10);
                      break;
                    case 'Available':
                      savings = parseInt(travelSavings?.available, 10);
                      break;
                    default:
                      break;
                  }
                  return (
                    <div className="expense-item" key={index}>
                      <div className="label">
                        <span>{item.label}</span>
                      </div>
                      <style>
                        {(isScrolled === true ? inEffect : '')}
                      </style>
                      <div
                        className="expense-progress-bar"
                        style={{
                          animationDuration: `${(isScrolled === true ? '1s' : '')}`,
                          animationName: `${(isScrolled === true ? 'fade-in' : '')}`,
                          animationTimingFunction: `${(isScrolled === true ? 'fade-in' : '')}`,
                          animationIterationCount: `${(isScrolled === true ? '1' : '')}`,
                          MozAnimationTimingFunction: `${(isScrolled === true ? 'linear' : '')}`,
                          WebkitAnimationTimingFunction: `${(isScrolled === true ? 'linear' : '')}`,
                          animationDirection: `${(isScrolled === true ? 'alternate' : '')}`,
                        }}
                      >
                        <Progress
                          size="small"
                          color={item.color}
                          percent={(parseInt(`${savings ?? 0}`, 10) / travelSavings?.saved) * 100}
                        >
                          {item.label === 'Available' && <span className="flight"><Image src={plane} /></span>}
                        </Progress>

                        <span color={item.labelColor}>
                          £
                          {(savings / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default MyTravelSavings;
