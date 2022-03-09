import { RefObject } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Image, Progress } from 'semantic-ui-react';

import { calculateProfileCompletionPercentage } from '../../utils/calculators';

import { BRBButton } from '../../components/BRBButton/BRBButton';
import useSubscriptionQuery from '../../Hooks/useSubscriptionQuery';
import { subscriptionStatus } from '../../interfaces/myAccountType';

import plane from '../../assets/images/plane.svg';

import './TravelProfileIntroCard.less';

export const TravelProfileIntroCard = ({
  nextSectionRef,
}: {
  nextSectionRef?: RefObject<HTMLDivElement>
}) => {
  const user = useSelector((state: any) => state.dashboard.user);
  const { data: subscriptionDetails } = useSubscriptionQuery();
  const history = useHistory();

  const profileCompletionPercentage = calculateProfileCompletionPercentage(user);

  const onCompleteProfile = () => {
    history.push('/travel-profile#complete-profile');
  };

  const onCreateTrip = () => {
    history.push('/add-trip');
  };

  const onSubscribe = () => {
    history.push('/dashboard#subscribe');
  };

  let description = '';
  let buttonLabel = '';
  let buttonAction = null;

  const userSubscriptionStatus = subscriptionDetails?.status?.toUpperCase();

  if (user.profileStatus === 0 || user.profileStatus === undefined) {
    // Incomplete travel profile
    description = `
      Your profile is almost complete. Take two minutes to enter your travel
      details, tell us the activities you love or what a great hotel means
      to you. This will help our team get to know you better and match you
      to the perfect trips. You’ll earn points and unlock rewards in the
      process!`;
    buttonLabel = 'Complete Profile';
    buttonAction = onCompleteProfile;
  } else if (userSubscriptionStatus === subscriptionStatus.Subscribed) {
    // Completed travel profile, no subscription
    description = `
      Congratulations, your profile is complete, and you are already saving
      and unlocking amazing rewards! Now is the time to create your next trip
      and tick places off your bucket list!`;
    buttonLabel = 'Create Trip';
    buttonAction = onCreateTrip;
  } else {
    // Completed travel profile, no subscription (or unrecognised status)
    description = `
      Now that your travel profile is complete, subscribe to BRB to get all your
      travel sorted! Start by selecting the number of travellers and the number of
      nights you want to travel each year. We’ll break down the cost of your travels
      into one, easy to manage, monthly subscription.`;
    buttonLabel = 'Subscribe';
    buttonAction = onSubscribe;
  }

  return (
    <Card className="profile-segment">

      <Card.Content>

        <div className="progress-bar">
          <Progress percent={profileCompletionPercentage} size="small" color="red" />
          <Image src={plane} size="massive" />
        </div>

        {user.profileStatus === 0 ? (
          <Card.Header>Let’s Get to Know You</Card.Header>
        ) : (
          <Card.Header>
            <span>
              <strong>Congratulations!</strong>
            </span>
            <span>Your Profile is Complete</span>
          </Card.Header>
        )}

        <Card.Description>{description}</Card.Description>

      </Card.Content>

      <Card.Content extra>
        <div className="ui two buttons">
          <BRBButton fluid onClick={buttonAction}>
            {buttonLabel}
            <p className="earn-points">+ Earn Points</p>
          </BRBButton>
        </div>
      </Card.Content>

    </Card>
  );
};

TravelProfileIntroCard.defaultProps = {
  nextSectionRef: null,
};
