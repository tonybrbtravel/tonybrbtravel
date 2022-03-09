import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import BRBSwiperNavigation from '../../components/BRBSwiperNavigation';
import { SubScribeSlidesData } from '../../mockData/signup';
import { BRBButton } from '../../components/BRBButton/BRBButton';

import hotelRoomImage from '../../images/Hotel_With_Pool.png';

export interface Props {
  onGetStartedClick?:() => void;
}

const Poster = styled.div<{
  backgroundImage?: string;
}>`
  position: relative;

  background-image: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : 'none')};
  background-size: cover;
  background-position: center center;

  width: 100%;
  height: 100%;

  &:before {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: "";
    background-color: rgba(0, 0, 0, .5);
  }

`;

const slides = ({ onGetStartedClick }:Props) => SubScribeSlidesData.map((slide) => (
  <Grid>
    <Grid.Row>
      <Grid.Column className="slider_navigation">
        <div className="slide_header">
          <p>
            {slide.header}
          </p>
        </div>
        <p className="swiper-sub-header">
          {slide.subHeader}
        </p>
        <BRBButton className="read_more_review_btn" onClick={onGetStartedClick}>Get Started</BRBButton>
      </Grid.Column>
    </Grid.Row>
  </Grid>
));

export const SubscribePromise = (props:Props) => (
  <Grid columns={2} className="brb-swiper-slider-navigation mt-0">
    <Grid.Row className="brb-our-promise mt-0">
      <Grid.Column>
        <Poster backgroundImage={hotelRoomImage}>
          <div className="our-promise">
            <h2 className="banner-heading">
              Our Promise
              <br />
              To You.
            </h2>
          </div>
        </Poster>
      </Grid.Column>
      <Grid.Column className="slider-bg Subscriber-Page">
        <BRBSwiperNavigation
          slides={slides(props)}
          spaceBetween={20}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
