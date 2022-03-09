import { Grid, Header } from 'semantic-ui-react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import BRBPinkText from '../../components/BRBPinkText';
import { ThisWeeksDrop as ThisWeeksDropMultiple } from './MultipleTrips/ThisWeeksDrop';

import './MyTrips.less';

export const ThisWeeksDrop = () => (
  <div className="my-trip-wrapper">
    <div className="my-trip-container">
      <div className="this-weeks-drop">
        <div className="ui container">

          <Grid columns={2} padded>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={13} computer={10}>
                <Header image as="h2">
                  <svg
                    width="46"
                    height="38"
                    viewBox="0 0 46 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.6875 0C17.5438 0 16.4469 0.454352 15.6381 1.2631C14.8294 2.07185 14.375 3.16875 14.375 4.3125V5.75H4.3125C3.16875 5.75 2.07185 6.20435 1.2631 7.0131C0.454351 7.82185 0 8.91875 0 10.0625L0 14.0415L21.8902 19.8778C22.6174 20.0714 23.3826 20.0714 24.1097 19.8778L46 14.0415V10.0625C46 8.91875 45.5457 7.82185 44.7369 7.0131C43.9281 6.20435 42.8312 5.75 41.6875 5.75H31.625V4.3125C31.625 3.16875 31.1706 2.07185 30.3619 1.2631C29.5531 0.454352 28.4562 0 27.3125 0H18.6875ZM18.6875 2.875H27.3125C27.6937 2.875 28.0594 3.02645 28.329 3.29603C28.5986 3.56562 28.75 3.93125 28.75 4.3125V5.75H17.25V4.3125C17.25 3.93125 17.4015 3.56562 17.671 3.29603C17.9406 3.02645 18.3063 2.875 18.6875 2.875Z"
                      fill="#fff"
                    />
                    <path
                      d="M0 33.0624C0 34.2061 0.454351 35.303 1.2631 36.1118C2.07185 36.9205 3.16875 37.3749 4.3125 37.3749H41.6875C42.8312 37.3749 43.9281 36.9205 44.7369 36.1118C45.5457 35.303 46 34.2061 46 33.0624V16.8186L23.3709 22.8475C23.1279 22.9124 22.8721 22.9124 22.6291 22.8475L0 16.8186V33.0624Z"
                      fill="#fff"
                    />
                  </svg>

                  <Header.Content>
                    This
                    {' '}
                    <BRBPinkText>Week’s</BRBPinkText>
                    {' '}
                    Drop
                    {' '}
                    <span className="brb-pink-text small" data-tooltip="Earn points for booking drops using your savings and unlock amazing rewards">
                      +Earn points
                      <i aria-hidden="true" className="question circle outline small icon help-icon" />
                    </span>
                  </Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column className="week-drop" mobile={16} computer={6}>
                <h2>
                  Next drop in:
                  {' '}
                  <BRBPinkText>
                    5 days
                    <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.00016 7.66671C8.10483 7.66671 9.00016 8.56204 9.00016 9.66671C9.00016 10.2334 8.76483 10.744 8.38683 11.108L7.1135 12.3334H9.00016V13.6667H5.00016V12.5174L7.46216 10.1474C7.58883 10.0254 7.66683 9.85537 7.66683 9.66671C7.66683 9.29871 7.36816 9.00004 7.00016 9.00004C6.63216 9.00004 6.3335 9.29871 6.3335 9.66671H5.00016C5.00016 8.56204 5.8955 7.66671 7.00016 7.66671ZM11.0002 7.66671V10.3334H12.3335V7.66671H13.6668V13.6667H12.3335V11.6667H9.66683V7.66671H11.0002ZM1.66683 7.00004C1.66683 8.68471 2.4475 10.1867 3.66683 11.164V12.7747C1.67416 11.622 0.333496 9.46804 0.333496 7.00004H1.66683ZM7.00016 0.333374C10.4568 0.333374 13.2995 2.96471 13.6335 6.33337H12.2922C11.9642 3.70271 9.72016 1.66671 7.00016 1.66671C5.16683 1.66671 3.5495 2.59137 2.59016 4.00004H4.3335V5.33337H0.333496V1.33337H1.66683V3.00004C2.88283 1.38004 4.8195 0.333374 7.00016 0.333374Z" fill="currentColor" />
                    </svg>
                  </BRBPinkText>
                </h2>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns={2} padded>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <p>
                  Don’t like surprises? Here’s a list of trips tailored to your travel preferences, that you can book using your BRB credits.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <div className="this-week-drop">
            <ThisWeeksDropMultiple />
          </div>

        </div>
      </div>
    </div>
  </div>
);
