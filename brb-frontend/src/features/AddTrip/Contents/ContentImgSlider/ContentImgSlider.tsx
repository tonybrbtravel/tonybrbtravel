import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Rating,
} from 'semantic-ui-react';
import './ContentImgSliderStyle.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper/core';

import { IHotelSliderDetails } from '../../../../interfaces/hotelType';

import { BRBButton } from '../../../../components/BRBButton/BRBButton';
import BRBPinkText from '../../../../components/BRBPinkText';

SwiperCore.use([EffectCoverflow, Pagination]);

export interface IContentImgSlider {
  onCreateTripClick?: () => void;
  sliderInfo?: IHotelSliderDetails[];
  header?: { headerText: string; subHeaderText: string; image?: string };
}

const ContentImgSlider = ({
  sliderInfo,
  header = {
    headerText: 'Still Not Sure?',
    subHeaderText: `Check out some of the trips other members of
      the BRB community have experienced...`,
  },
}: IContentImgSlider) => {
  const hotelDesc = sliderInfo && sliderInfo[0] ? sliderInfo[0].hotelDescription : '';

  const [hotelDescription, setHotelDescription] = useState<string>(hotelDesc);

  const history = useHistory();
  const onCreateTrip = () => {
    history.push('/add-trip');
  };

  return (
    <div className="slider-still-not-sure">
      <Grid>
        <Grid.Row>
          <Container className="slider-image-content">
            <Header as="h2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 40 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.80763 1.35209C5.17837 0.249237 7.0605 0.0808614 8.59786 0.922661L23.5647 9.10709L30.515 2.76368C31.5829 1.78881 32.986 1.28735 34.4157 1.36955C35.8454 1.45176 37.1848 2.11091 38.1392 3.20206L38.3563 3.46484C39.2424 4.61507 39.6451 6.07786 39.4759 7.53143C39.3067 8.98501 38.5794 10.3103 37.454 11.2157L37.1827 11.4191L29.5159 16.8323L33.79 33.6197C34.0058 34.4651 33.9757 35.3563 33.7033 36.1844C33.431 37.0124 32.9283 37.7413 32.2567 38.2817C31.7279 38.7072 31.0553 38.9006 30.3869 38.8192C29.7185 38.7379 29.1091 38.3885 28.6927 37.848L28.5994 37.7174L20.1657 23.4317L14.3412 27.5422L15.8208 34.8759C15.9086 35.3085 15.8766 35.7575 15.7285 36.1725C15.5804 36.5875 15.322 36.9521 14.9824 37.2254C14.683 37.4663 14.3021 37.5758 13.9236 37.5297C13.5451 37.4837 13.2 37.2858 12.9643 36.9798L8.73957 31.4957L6.22575 33.2752C5.62374 33.7006 4.88562 33.8751 4.16192 33.7634C3.43822 33.6516 2.78348 33.2619 2.33124 32.6737L2.11432 32.3921C1.66189 31.8047 1.44558 31.0632 1.50944 30.3186C1.5733 29.5739 1.91253 28.8822 2.45802 28.3844L4.74069 26.3048L0.517777 20.823C0.28199 20.517 0.174821 20.1277 0.219846 19.7409C0.264869 19.3541 0.458398 19.0015 0.757858 18.7605C1.44888 18.2046 2.39105 18.0933 3.18762 18.4768L9.81374 21.6699L15.0929 16.8467L3.59504 5.23564C3.33886 4.97719 3.13941 4.666 3.00992 4.32275C2.88043 3.9795 2.82386 3.61203 2.84396 3.24474C2.86407 2.87746 2.96039 2.51875 3.12653 2.19244C3.29268 1.86612 3.52485 1.57967 3.80763 1.35209Z"
                  fill="currentColor"
                />
              </svg>
              <Header.Content>
                {header.headerText === 'Create a Surprise Trip' ? (
                  <>

                    Create a
                    {' '}
                    <BRBPinkText>
                      Surprise
                    </BRBPinkText>
                    {' '}
                    Trip

                  </>
                )
                  : (
                    <>

                      {header.headerText}

                    </>
                  )}

                <BRBPinkText size="small">
                  <span data-tooltip="Earn points for creating surprise trips and unlock amazing rewards">+Earn points</span>
                  <Icon
                    className="help-icon"
                    name="question circle outline"
                    size="small"
                  />
                </BRBPinkText>

              </Header.Content>
              <Header.Subheader>
                {header.subHeaderText}
              </Header.Subheader>
            </Header>
            <Grid columns="2">
              <Grid.Row reversed="mobile">
                <Grid.Column
                  mobile="16"
                  tablet="8"
                  computer="8"
                  className="not-sure-heading"
                >
                  {sliderInfo && (
                    <Card className="not-sure">
                      <Card.Content>
                        <Header>Where You Might Go...</Header>
                        <p>{hotelDescription || (sliderInfo[0] ? sliderInfo[0].hotelDescription : '')}</p>
                        <div className="action-items">
                          <BRBButton onClick={onCreateTrip}>
                            Create Surprise Trip
                            {' '}
                            <small>+ Earn Points</small>
                          </BRBButton>
                        </div>
                      </Card.Content>
                    </Card>
                  )}
                </Grid.Column>
                <Grid.Column
                  mobile="16"
                  tablet="8"
                  computer="8"
                  className="not-sure-heading"
                >
                  <Swiper
                    slidesPerView={1}
                    pagination={{
                      clickable: true,
                    }}
                    onSlideChange={(swiper: any) => setHotelDescription(
                      sliderInfo?.[swiper.activeIndex].hotelDescription || '',
                    )}
                  >
                    {sliderInfo
                      && sliderInfo.map((x: IHotelSliderDetails) => (
                        <SwiperSlide key={x.hotelId}>
                          <div>
                            <div className="rating-block">
                              <div className="hotel-rating">
                                {x.hotelName}
                                {' '}
                                <span>{x.hotelCity}</span>
                              </div>
                              <Rating
                                defaultRating={x.starRating}
                                maxRating={5}
                              />
                            </div>
                            <Image src={x.hotelImage} spaced />
                          </div>
                        </SwiperSlide>
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

export default ContentImgSlider;
