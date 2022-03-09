import * as React from 'react';
import './ContentSlider.less';
import {
  Container,
  Grid,
  Header,
  Icon,
  SemanticICONS,
} from 'semantic-ui-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavigationOptions } from 'swiper/types/components/navigation.d';
import sliderImg from '../../../../images/room1.jpg';
import hotelRoomImg from '../../../../images/Hotel_With_Pool.png';
import { BRBButton } from '../../../../components/BRBButton/BRBButton';
import { WhatHappensNextData } from './ContentData';

const ContentSlider = () => {
  const navigationNextRef = React.useRef(null);
  const contentSlider = WhatHappensNextData.map((x) => (
    <div className="what-next">
      <h3>{x.title}</h3>
      <p>{x.text}</p>
    </div>
  ));

  return (
    <div className="content-slider-trip-next">
      <Grid>
        <Grid.Row>
          <Container className="content-slider-trip">

            <Grid>
              <Grid.Row>
                <Grid.Column mobile="16" tablet="16" computer="16">
                  <Header as="h2">
                    What Happens
                    {' '}
                    <strong>Next</strong>
                    ?
                    <Header.Subheader className="sub-headers">
                      Once your trip has been created, here’s what you can expect
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid columns="2" className="what-happens-content">
              <Grid.Row>
                <Grid.Column mobile="16" tablet="8" computer="8">
                  <img src={hotelRoomImg} className="img-fluid" alt="" />
                </Grid.Column>
                <Grid.Column mobile="16" tablet="8" computer="8">
                  <Swiper
                    keyboard={{ enabled: false, onlyInViewport: false }}
                    mousewheel={{ invert: true }}
                    spaceBetween={100}
                    className="brb-swiper"
                    freeMode
                    navigation={{
                      nextEl: navigationNextRef.current,
                    }}
                    onInit={(swiper: any) => {
                      if (swiper.params?.navigation) {
                        (swiper.params.navigation as NavigationOptions).nextEl = navigationNextRef.current;
                      }

                      swiper.navigation?.update();
                    }}
                    loop
                    allowTouchMove={false}
                  >
                    <div
                      ref={navigationNextRef}
                      className="brb-swiper__nav brb-swiper__nav--next"
                    >
                      <Icon name="arrow circle right" size="big" />
                    </div>
                    {contentSlider.map((s, i) => (
                      <SwiperSlide key={`slide_${i}`}>{s}</SwiperSlide>
                    ))}
                  </Swiper>
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Container>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ContentSlider;
