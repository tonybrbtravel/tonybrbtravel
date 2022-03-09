import { VFC, PropsWithChildren, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container, Grid, Header, Image, Icon, Card,
} from 'semantic-ui-react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { CityGuideType } from '../../../interfaces/cityGuideType';
import { CityBlogType } from '../../../interfaces/cityBlogType';
import { CityType } from '../../../interfaces/cityType';
import { RevealedHotelDetails } from '../../../interfaces/revealedHotelType';
import { RevealedFlightType } from '../../../interfaces/revealedFlightType';

import BRBPinkText from '../../../components/BRBPinkText';

import atol from '../../../assets/images/Atol-trip.png';

import './TripCityGuide.less';

export interface Props {
  revealedHotelDetails: RevealedHotelDetails[];
  revealedTrips: RevealedFlightType;
}

export const TripCityGuide: VFC<Props> = ({
  revealedHotelDetails = [],
  revealedTrips,
}: PropsWithChildren<Props>) => {
  const allCities: CityType[] = useSelector((state: any) => state.contentful.cities);
  const [city, setCity] = useState<CityType>();
  const allCityBlogs: CityBlogType[] = useSelector((state: any) => state.contentful.cityBlogs);
  const [cityBlog, setCityBlog] = useState<CityGuideType>();
  const allCityGuides: CityGuideType[] = useSelector((state: any) => state.contentful.cityGuides);
  const [cityGuide, setCityGuide] = useState<CityGuideType>();

  const [hotel] = revealedHotelDetails;

  useEffect(() => {
    if (hotel) {
      const cityId = hotel.city.contentfullId;
      const [foundCity] = allCities.filter((item) => item.id === cityId);
      if (foundCity?.guideId) {
        const [foundGuide] = allCityGuides.filter((item) => item.id === foundCity.guideId);
        setCityGuide(foundGuide);
      }
      setCity(foundCity);
    }
  }, [revealedTrips, revealedHotelDetails]);

  // Check whether we've got anything to display
  if (!city && !cityGuide && !cityBlog && !revealedTrips.atolUrl) {
    return null;
  }

  return (
    <div className="city-guide">

      <h1>
        All about
        {' '}
        <span>{hotel?.city?.cityName}</span>
      </h1>

      <p className="byline">{city?.byLine}</p>

      <div className="city-intro">

        <img className="city-image" src={city?.image} alt={hotel?.city?.cityName} />

        <p className="city-description">{city?.shortDescription}</p>

      </div>

      {/* <Grid columns={2} padded>
          <Grid.Row>

            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Header as="h2">
                <Header.Content>
                  Your
                  {' '}
                  <BRBPinkText>Travel Documents</BRBPinkText>
                </Header.Content>
              </Header>
            </Grid.Column>

          </Grid.Row>

          <Grid.Row className="revealed-trip">

            <Grid.Column mobile={12} tablet={4} computer={4}>
              <Card>
                <Image className="city-image" src={atol} />
                <Card.Content>
                  <p className="city-header atol-certificate">Your ATOL Certificate</p>
                  <p className="city-sub-header download-atol"><a href="#">Click here to download</a></p>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column mobile={12} tablet={12} computer={8}>
              <Card>
                <Image className="city-image" src={cityGuide?.imageUrl} />
                <Card.Content>
                  <p className="city-header">
                    {cityGuide?.title}
                  </p>
                  <p className="city-sub-header">
                    {cityGuide?.shortDescription}
                  </p>
                  <p className="city-category">
                    {cityGuide?.author}
                    {' '}
                    /
                    {' '}
                    {format(new Date(cityGuide?.createdAt || 0), 'dd.MM.yy')}
                  </p>
                </Card.Content>
              </Card>
            </Grid.Column>

          </Grid.Row>
        </Grid> */}
    </div>
  );
};
