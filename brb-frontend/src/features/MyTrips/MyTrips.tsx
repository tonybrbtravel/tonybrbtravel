import React, { useEffect, useState } from 'react';
import {
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Tab,
} from 'semantic-ui-react';
import SwiperCore, { Navigation, Thumbs } from 'swiper/core';
import BRBPinkText from '../../components/BRBPinkText';
import Banner from '../AddTrip/Banner/Banner';
import ContentSlider from '../AddTrip/Contents/ContentSlider/ContentSlider';
import { Footer } from '../../components/Footer/Footer';
import { MultipleTrips } from './MultipleTrips/PastTrips';
import { IHotelSliderDetails } from '../../interfaces/hotelType';
import { getBRBHotelsInfo } from '../../Api/HotelApi';
import BrbEndPoints from '../../Api/BrbEndPoints';
import useApiQuery from '../../Hooks/ApiQuery';
import { UpComingTrips } from './MultipleTrips/UpComingTrips';
import { ThisWeeksDrop } from './MultipleTrips/ThisWeeksDrop';
import SurpriseTripPanel from '../../screens/_panels/SurpriseTripPanel';

export const MyTrips = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // const { data: hotelInfo } = useApiQuery<IHotelSliderDetails[]>(
  //   BrbEndPoints.getBRBTop3Hotels,
  //   { url: BrbEndPoints.getBRBTop3Hotels },
  //   getBRBHotelsInfo,
  // );

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 150000);
  }, []);

  SwiperCore.use([Navigation, Thumbs]);

  const options = [
    {
      key: 1, text: 'Upcoming Trips', value: 0, component: <UpComingTrips />,
    },
    {
      key: 2, text: 'This Week’s Drop', value: 1, component: <ThisWeeksDrop />,
    },
    {
      key: 3, text: 'Past Trips', value: 2, component: <MultipleTrips />,
    },
  ];

  const panes = options.map((option) => ({
    menuItem: option.text,
    render: () => (
      <Tab.Pane attached={false}>
        {option.component}
      </Tab.Pane>
    ),
  }));

  return (
    <>
      <Banner />
      <div className="my-trip-wrapper">
        <Container>
          <div className="my-trip-container">

            <Header as="h2">
              <Icon name="briefcase" />
              <Header.Content>
                My
                {' '}
                <BRBPinkText> Trips </BRBPinkText>
              </Header.Content>
            </Header>

            <Grid columns={1} padded>

              <Grid.Column
                className="mytrips-dropdown-mobile"
                only="mobile tablet"
                mobile={16}
              >
                <Dropdown
                  defaultValue={options[0].value}
                  options={options}
                  inline
                  onChange={(e, { value }) => {
                    setActiveIndex((value as number) ?? 0);
                  }}
                />
              </Grid.Column>

              <Grid.Column
                only="mobile tablet"
                mobile={16}
              >
                {options[activeIndex].component}
              </Grid.Column>

              <Grid.Column width={16} only="computer">
                <Tab
                  menu={{ secondary: true }}
                  panes={panes}
                  onTabChange={(e, { newIndex }) => {
                    setActiveIndex(newIndex ?? 0);
                  }}
                />
              </Grid.Column>
            </Grid>

          </div>
        </Container>
      </div>

      <ContentSlider />

      <SurpriseTripPanel />

      <Footer />
    </>
  );
};
