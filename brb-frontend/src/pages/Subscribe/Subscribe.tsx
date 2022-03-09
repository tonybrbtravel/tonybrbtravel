import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useSubscriptionQuery from '../../Hooks/useSubscriptionQuery';

import BRBBanner from '../../components/BRBBanner/BRBBanner';
import SubscriptionCalculator from '../../screens/_panels/SubscriptionCalculatorPanel';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import { BRBBestHotels } from '../../components/BRBBestHotels/BRBBestHotels';
import { BRBReviews } from '../../components/BRBReviews/BRBReviews';
import { SubscribeSavings } from './SubscribeSavings';
import { SubscribePromise } from './SubscribePromise';
import { Footer } from '../../components/Footer/Footer';
import { subscriptionStatus } from '../../interfaces/myAccountType';

import anthony from '../../images/anthony.png';

import './Subscribe.less';

export const Subscribe = () => {
  const history = useHistory();
  const { data: subscriptionDetails } = useSubscriptionQuery();

  // If we're subscribed, bounce over to the dashboard instead of showing this page
  useEffect(() => {
    if (subscriptionDetails?.status === subscriptionStatus.Subscribed) {
      history.push('/dashboard');
    }
  }, [subscriptionDetails]);

  const subscribeCalRef = React.useRef<null | HTMLDivElement>(null);

  const onSubscribeNowClick = () => {
    subscribeCalRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <BRBBanner backgroundImage={anthony}>
        <h2 className="banner-heading">
          Subscribe to
          {' '}
          <strong>BRB</strong>
        </h2>
        <p className="banner-text">
          BRB is here to take away all the downsides of organising a
          trip. Our team of travel experts will book trips that are
          as individual as you are and get you premium hotels and
          flights for less than even your most savvy friends could.
          It’s travel as you like it. We just sort it.
        </p>
        <BRBButton className="subscribe_btn" onClick={onSubscribeNowClick}>
          Subscribe Now
          <br />
          <small>+Earn Points</small>
        </BRBButton>
      </BRBBanner>

      <div ref={subscribeCalRef}>
        <SubscriptionCalculator />
      </div>

      <SubscribeSavings onBenefitsTravelClick={onSubscribeNowClick} />
      <SubscribePromise onGetStartedClick={onSubscribeNowClick} />
      <BRBBestHotels onGetStartedClick={onSubscribeNowClick} />
      <BRBReviews />
      <Footer />
    </>
  );
};
