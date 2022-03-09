import { useEffect, useState } from 'react';
import { Grid, Container, Image } from 'semantic-ui-react';

import BRBBanner from '../../components/BRBBanner/BRBBanner';
import { BRBButton } from '../../components/BRBButton/BRBButton';

import anthony from '../../images/anthony.png';
import logo from '../../images/logo.svg';
import eurologo from '../../images/euro_symbol.png';

export interface Props {
  onBenefitsTravelClick?: () => void;
}

const MonthlySubscriptionWeb = () => (
  <div className="monthly_subscription">
    <div className="banner_rect banner-monthly">
      <div className="margin">Travel Site Margin</div>
      <div className="hotel">Hotel</div>
      <div className="return_flights">Return Flights</div>
      <div className="diy_heading">DIY Travel</div>
    </div>
    <div className="euro-currency-logo">
      <Image src={eurologo} />
    </div>
    <div className="banner_rect banner-monthly">
      <div className="your_savings">Your Savings</div>
      <div className="margin-brb">Brb Margin</div>
      <div className="hotel-brb">Hotel</div>
      <div className="return_flights_brb">Return Flights</div>
      <div className="brb_heading">
        <img src={logo} alt="" />
      </div>
    </div>
  </div>
);

const MonthlySubscriptionMobile = () => (
  <div className="monthly_subscription_mobile">
    <div>
      <div style={{ textAlign: 'left' }}>
        <img src={logo} width="34" alt="" />
      </div>
      <div className="margin_brb_mobile">
        <div className="savings">Your Savings</div>
        <div className="brb_marging">Brb Margin</div>
        <div className="brb_hotel">Hotel</div>
        <div className="brb_flight">Return Flights</div>
      </div>
    </div>
    <div>
      <div className="brb_head" style={{ textAlign: 'left' }}>
        DIY Travel
      </div>
      <div className="margin_brb_mobile">
        <div className="site_margin">Travel Site Margin</div>
        <div className="site_hotel">Hotel</div>
        <div className="site_flight">Return Flights</div>
      </div>
    </div>
  </div>
);

export const SubscribeSavings = ({ onBenefitsTravelClick }: Props) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile: boolean = width <= 768;

  return (
    <BRBBanner backgroundImage={anthony}>
      <Container>
        <Grid stackable className="subscribe-travel">
          <Grid.Row columns={2}>
            <Grid.Column className="d-flex-center">
              <div>
                <h2 className="banner-heading">
                  One Monthly Subscription.
                  <br />
                  <strong>Save</strong>
                  {' '}
                  Up To 35%
                </h2>
                <div className="chkbox_content">
                  <ul>
                    <li>
                      Select the number of nights you want to travel each year.
                    </li>
                    <li>
                      We break down the cost of your travel into one monthly
                      subscription.
                      {' '}
                    </li>
                    <li>
                      We use our buying power to negotiate better rates with
                      airlines and hotels, passing the savings onto you.
                    </li>
                    <li>
                      We’re fair and take smaller margins than other travel
                      sites on each trip.
                    </li>
                  </ul>

                  {isMobile ? (
                    <></>
                  ) : (
                    <BRBButton onClick={onBenefitsTravelClick}>
                      Get the benefits of subscription travel
                    </BRBButton>
                  )}
                </div>
              </div>
            </Grid.Column>
            <Grid.Column textAlign="center">
              {/* <MonthlySubscriptionWeb/> */}
              {isMobile ? (
                <MonthlySubscriptionMobile />
              ) : (
                <MonthlySubscriptionWeb />
              )}
              {isMobile ? (
                <BRBButton onClick={onBenefitsTravelClick}>
                  Get the benefits of subscription travel
                </BRBButton>
              ) : (
                <></>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </BRBBanner>
  );
};
