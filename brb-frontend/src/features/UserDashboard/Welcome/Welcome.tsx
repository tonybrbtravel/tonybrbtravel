import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card, Grid, Header, Icon, Label,
} from 'semantic-ui-react';
import styled from 'styled-components';

import Colors from '../../../themes/Colors';
import Breakpoints from '../../../themes/Breakpoints';

import { subscriptionStatus } from '../../../interfaces/myAccountType';
import useSubscriptionQuery from '../../../Hooks/useSubscriptionQuery';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import BRBSwiper from '../../../components/BRBSwiper';
import BRBBanner from '../../../components/BRBBanner/BRBBanner';

import backgroundImage from '../../../images/dashboard-background.jpg';

import './Welcome.less';

const Badge = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${Colors.brbPink};
  width: 32px;
  height: 32px;
  top: 0;
  left: 0;
  transform: translate(-40%, -40%);

  @media (min-width: ${Breakpoints.medium}) {
    width: 64px;
    height: 64px;
  }

  & .bell.icon {
    display: block;
    line-height: 1;
    color: white;
    margin: 0;
    font-size: 1em;

    @media (min-width: ${Breakpoints.medium}) {
      font-size: 1.5em;
    }
  }
}
`;

export const WelcomeBlock = ({ preferredName, earnedPoints }: any) => {
  const user = useSelector((state: any) => state.dashboard.user);
  const history = useHistory();
  const { data: subscriptionDetails } = useSubscriptionQuery();

  const onTakeAction = (link: any) => {
    history.push(`/${link}`);
  };

  const onCreateTrip = () => {
    history.push('/add-trip');
  };

  type welcomeCardType = {
    ctaBtn: string,
    earnpoints: string,
    link: string,
    cardText: ReactNode,
  };

  const welcomeCards: {
    [key: string]: welcomeCardType,
  } = {
    completeProfile: {
      ctaBtn: 'Complete Profile',
      earnpoints: '',
      link: 'travel-profile#complete-profile',
      cardText: (
        <>
          You’re almost done! Finalise your traveller profile so our team can
          get to know you better and start matching you to the best trips. You
          will earn points and unlock your first BRB reward.
        </>
      ),
    },
    subscribe: {
      ctaBtn: 'Subscribe',
      earnpoints: '+ Earn points',
      link: 'dashboard#subscribe',
      cardText: (
        <>
          Never get hit by increasing flight prices! Select the number of nights
          you want to travel each year and the number of travellers. We’ll break
          down the cost of your travels into a montly subscription. Earn points
          and unlock your second BRB reward.
        </>
      ),
    },
    createTrip: {
      ctaBtn: 'Create Trip',
      earnpoints: '+ Earn points',
      link: 'add-trip#create',
      cardText: (
        <>
          Time for a break! Create a trip by selecting your travel dates. Our
          team of experts will book your surprise trip and reveal your
          destination and hotel two weeks before travel. Earn points and unlock
          new BRB rewards.
        </>
      ),
    },
  };

  // Choose which cards should be displayed based on the user's info and status
  const activeCards = [];
  if (user.profileStatus === 0) {
    activeCards.push(welcomeCards.completeProfile);
  }
  if (subscriptionDetails?.status === subscriptionStatus.NotSubscribed) {
    // subscriptionDetails?.status?.toUpperCase()
    activeCards.push(welcomeCards.subscribe);
  }
  // We ALWAYS include the create-trip card though
  activeCards.push(welcomeCards.createTrip);

  const buildCard: (cardData: welcomeCardType) => ReactNode = (cardData: welcomeCardType) => (
    <>
      <div>
        <div className="subtext">
          <p>{cardData.cardText}</p>
        </div>
        <div className="cta-btn">
          <BRBButton
            fluid
            onClick={() => onTakeAction(cardData.link)}
          >
            {cardData.ctaBtn}
            <span className="btn-earnpoints">{cardData.earnpoints}</span>
          </BRBButton>
        </div>
      </div>
    </>
  );

  const cardElements: ReactNode[] = [];
  activeCards.forEach((cardItem: welcomeCardType) => cardElements.push(buildCard(cardItem)));

  return (
    <>
      <BRBBanner className="welcome-banner" backgroundImage={backgroundImage} fixed>
        <Card centered>
          <Card.Content>
            <Badge>
              <Icon name="bell" />
            </Badge>
            <Header as="h2">
              Welcome to the Club,
              <br />
              <span className="pink-color" style={{ color: '#E94560' }}>
                {preferredName}
              </span>
            </Header>
            <div className="points">
              <div className="subheader-points">
                <div>
                  You have earned
                  {' '}
                  <span style={{ color: '#E94560' }}>
                    {earnedPoints || 0}
                  </span>
                  {' '}
                  points
                </div>
              </div>
            </div>
            <BRBSwiper
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: 'brb-swiper__nav--next',
              }}
              className="welcome-swiper welcome-content"
              loop
              allowTouchMove
              slides={cardElements}
            />
          </Card.Content>
        </Card>
      </BRBBanner>
    </>
  );
};
