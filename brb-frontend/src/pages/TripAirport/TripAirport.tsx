import {
  Container, Grid, GridColumn, Header, Image,
} from 'semantic-ui-react';

import './TripAirport.less';
import { useEffect, useState } from 'react';
import ImageMapper from 'react-image-mapper';
import { useSelector } from 'react-redux';
import map from '../../assets/images/map.png';
import { BRBSelect } from '../../components/BRBSelect/BRBSelect';
import { Airpors } from '../../mockData/airports';

export const TripAirport = () => {
  const countries = useSelector((state: any) => state.contentful.countries);

  let OrderedCountries = null;
  if (countries) {
    OrderedCountries = countries.slice().sort((a: any, b: any) => {
      a = a.country; // eslint-disable-line
      b = b.country; // eslint-disable-line
      return a > b ? 1 : a < b ? -1 : 0; // eslint-disable-line
    });
  }

  const handleUpdateMapArea = (evt: any) => {
    let areas: any = [];
    if (evt.items.find((x: any) => x.checked)) {
      const area: any = evt.items.find((x: any) => x.checked);
      const { coords } = area;
      coords.coords[2] = 8;
      coords.strokeColor = '#E94560';
      coords.preFillColor = 'rgba(233, 69, 96, 0.15)';
      coords.id = mapAreas.areas.length + 1;
      areas = [...mapAreas.areas, { ...coords }];
    } else {
      areas = mapAreas.areas.filter(
        (x: any) => !evt.items.find((a: any) => a.coords.id === x.id),
      );
    }
    setMapAreas({
      name: mapAreas.name,
      areas,
    });
  };
  let parsedAirports: any = [];
  Airpors.forEach((x) => {
    parsedAirports = [...parsedAirports, ...x.items.map((x) => x.coords)];
  });
  const [mapAreas, setMapAreas] = useState({
    name: 'my-map',
    areas: parsedAirports,
  });

  // useEffect(() => {
  //   let parsedAirports: any = [];
  //   Airpors.forEach((x) => {
  //     parsedAirports = [...parsedAirports, ...x.items.map((x) => x.coords)];
  //   });
  //   setMapAreas({
  //     name: "my-map",
  //     areas: parsedAirports,
  //   });
  // }, [mapAreas]);

  return (
    <Container textAlign="justified">
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={12} computer={13} />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={4} computer={3} />
          <Grid.Column mobile={16} tablet={12} computer={13}>
            <Header as="h5">
              Hello
              {' '}
              <span className="colorName">Greg</span>
              , What do you love to travel for...?
            </Header>
            <p className="paragraphStyling">
              Tell us what you love most about travelling so we can get your
              future trips sorted!
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={4} computer={3} />
          <Grid.Column mobile={16} tablet={12} computer={13}>
            <p className="headingStyle">Select at least one, or as many as you want.</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <GridColumn mobile={16} tablet={4} computer={3} />
          <Grid.Column mobile={16} tablet={12} computer={13}>
            <Grid columns={2}>
              <GridColumn width={5}>
                <ImageMapper
                  src={map}
                  //  onImageClick={handleUpdateMapArea}
                  map={mapAreas}
                  width={239}
                />
              </GridColumn>
              <GridColumn width={11}>
                {/* <BRBSelect onChange={handleUpdateMapArea} items={Airpors} /> */}
              </GridColumn>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
