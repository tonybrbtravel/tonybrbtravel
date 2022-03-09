/**
 *
 * AirportPreferences
 *
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ImageMapper from 'react-image-mapper';
import {
  Container, Grid, GridColumn, Header,
} from 'semantic-ui-react';
import clsx from 'clsx';
import airports from './airports';
import { BRBSelect } from '../../components/BRBSelect/BRBSelect';
import { TravelHeader } from '../travel-preferences/components/TravelHeader/TravelHeader';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import { TripTypes } from '../../pages/TripTypes/components/TripTypes';
import useApiQuery from '../../Hooks/ApiQuery';
import BrbEndPoints from '../../Api/BrbEndPoints';
import { getAirportsMasterData } from '../../Api/TravelPreferences';
import { GroupBy } from './Groupby';
import { Airports, User } from '../../interfaces/user';
import { showNotification } from '../../components/BRBNotification/ShowNotification';
import { Spinner } from '../../components/BRBSpinner/BRBSpinner';

import './AirportPreferences.less';

export interface Props {
  from?: boolean;
  onContinue: () => void;
  onSave: (payload: Airports) => void;
  userProfile: User;
}

export interface AirportType {
  createdAt: Date;
  createdBy: string;
  id: number;
  airportName: string;
  airportCode: string;
  airportImage: string;
  airportCitiesCount: number;
  region: string;
  status: string;
  brbOrigin: boolean;
}

export const AirportPreferences = ({
  from,
  onSave,
  userProfile,
}: Props) => {
  const [query, setQuery] = useState(1);
  const [airportList, updateAirportList] = useState<any[]>([]);
  const [selectedAirports, setSelectedAirports] = useState<any[]>([]);
  const outboundAirports = userProfile.airports;
  const [destinationsCount, setDestinationsCount] = useState(0);
  const [mapAreas, setMapAreas] = useState<any>({
    areas: [],
  });
  const [onboardingSectionReady, setOnboardingSectionReady] = useState<boolean>(false);
  const { data: airportTypes } = useApiQuery<AirportType[]>(
    BrbEndPoints.Airports,
    { url: BrbEndPoints.Airports },
    getAirportsMasterData,
  );

  useEffect(() => {
    updateAirportList(getAirports());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airportTypes, outboundAirports]);

  const getAirports = () => {
    const airportType = airportTypes?.filter((x) => x.brbOrigin) ?? [];
    const data = GroupBy(airportType, (d) => d.region);
    const airportFlat = airports.map((x) => x.airports).flat();
    const modelFitUSD: any[] = [];
    data.forEach((value, key) => {
      modelFitUSD.push({
        region: key,
        airports: value.map((d) => ({
          label: d.airportName,
          code: d.airportCode,
          id: d.id,
          checked: !!(
            outboundAirports
            && outboundAirports.outboundAirports
            && outboundAirports.outboundAirports.find(
              (o: any) => o.airportCode === d.airportCode,
            )
          ),
          availableDestinations: d.airportCitiesCount,
          coords: airportFlat.find((x) => x.code === d.airportCode)?.coords,
        })),
      });
    });

    const mapResults = modelFitUSD
      .map((x) => x.airports)
      .flat()
      .filter((d) => d.coords)
      .map((d) => d.coords)
      .flat();

    const selMapResults = modelFitUSD
      .map((x) => x.airports)
      .flat()
      .filter((d) => d.checked)
      .map((d) => {
        const airport = JSON.parse(JSON.stringify(d.coords));
        airport.coords[2] = 8;
        airport.preFillColor = 'rgba(233, 69, 96, 0.2)';
        airport.strokeColor = '#E94560';

        return airport;
      })
      .flat();

    setMapAreas({
      name: 'my-map',
      areas: [...mapResults, ...selMapResults],
    });

    setSelectedAirports(
      modelFitUSD
        .map((x) => x.airports)
        .flat()
        .filter((d) => d.checked),
    );

    return modelFitUSD;
  };

  const onSubmit = () => {
    const payload = {
      outboundAirports: selectedAirports.map((x) => ({ id: x.id, airportCode: x.code, airportName: x.label })),
    };
    if (payload.outboundAirports.length < 2) {
      showNotification.warning({
        title: 'Airport',
        content: 'Please select at least 2 airports',
      });
      return false;
    }
    onSave(payload);
    return true;
  };

  const onHandleChange = (data: any[]) => {
    let selectedValues: any = [];
    data.forEach((d: any) => {
      selectedValues = [
        ...selectedValues,
        ...d.airports.filter((x: any) => x.checked),
      ];
    });
    setSelectedAirports(selectedValues);

    let parsedAirports: any = [];
    data.forEach((d: any) => {
      parsedAirports = [
        ...parsedAirports,
        ...d.airports.filter((x: any) => x.coords).map((x: any) => x.coords),
      ];
    });

    let selectedAirport: any = [];
    data.forEach((d: any) => {
      selectedAirport = [
        ...selectedAirport,
        ...d.airports.filter((x: any) => x.checked).map((x: any) => x.coords),
      ];
    });

    selectedAirport = selectedAirport.map((x: any) => {
      const airport = JSON.parse(JSON.stringify(x));
      airport.coords[2] = 8;
      airport.preFillColor = 'rgba(233, 69, 96, 0.2)';
      airport.strokeColor = '#E94560';
      return airport;
    });

    setMapAreas({
      name: Math.random(),
      areas: [...parsedAirports, ...selectedAirport],
    });

    setQuery(Math.random());
  };

  function padWithZeroes(number: number, length: number) {
    let my_string = `${number}`;
    while (my_string.length < length) {
      my_string = `0${my_string}`;
    }

    return my_string;
  }

  const getAvailableDestinations = useCallback(() => {
    if (selectedAirports.length) {
      getAirportsMasterData({
        url: `${BrbEndPoints.getDestinationsCount}?ids=${selectedAirports
          .map((x) => x.id)
          .join(',')}`,
      }).then((value) => {
        setDestinationsCount(value);
      });
    } else {
      setDestinationsCount(0);
    }
  }, [selectedAirports]);

  useEffect(() => {
    getAvailableDestinations();
  }, [getAvailableDestinations, selectedAirports]);

  useEffect(() => {
    setOnboardingSectionReady(selectedAirports.length >= 2);
  }, [selectedAirports]);

  const getPaddedValue = () => padWithZeroes(destinationsCount, 3)
    .split('')
    .map((x) => <span>{x}</span>);

  const handleUpdateMapArea = useCallback(
    (evt: any) => console.log(evt.nativeEvent),
    [],
  );

  return (
    <div className="main-page">
      <Container className="airport-preferences">
        {!from && (
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <TravelHeader activeStepIndex={1} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        <TripTypes>
          <Grid>
            {!from && (
              <>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={4} computer={3} />
                  <Grid.Column
                    mobile={16}
                    tablet={12}
                    computer={13}
                    className="text-banner"
                  >
                    <Header as="h5">
                      Which
                      {' '}
                      <span className="colorName">UK airports</span>
                      {' '}
                      do you prefer flying from?
                    </Header>
                    <p className="paragraphStyling">
                      The more airports you select, the wider the variety of
                      available destinations.
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </>
            )}

            <Grid.Row className="airportPreferenceCards">
              {!from && (
                <GridColumn mobile={16} tablet={4} computer={3} />
              )}
              <Grid.Column
                className="modal-airportPreferenceCards"
                mobile={16}
                tablet={12}
                computer={13}
              >
                <Grid className={clsx({ 'create-trip-airport': from })}>
                  <Grid.Row>
                    {airportList && airportList.length > 0 ? '' : <Spinner />}
                    {!from && (
                      <GridColumn
                        className="min-w-100"
                        only="large screen computer"
                        largeScreen={5}
                        computer={5}
                      >
                        {mapAreas && mapAreas.areas.length > 0 && (
                          <ImageMapper
                            src={`${process.env.PUBLIC_URL}/map.png?&q=${query}`}
                            map={mapAreas}
                            width={239}
                            onImageClick={handleUpdateMapArea}
                          />
                        )}
                      </GridColumn>
                    )}

                    <GridColumn mobile={16} tablet={11} computer={11}>

                      <div className="available-destinations">
                        <p>Your selected airports provide</p>
                        <div className="available-destinations-wrapper">
                          {getPaddedValue()}
                        </div>
                        <p>potential trip destinations</p>
                      </div>

                      <BRBSelect onChange={onHandleChange} items={airportList} />

                    </GridColumn>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <div className="sticky-button">
              <Container>
                <Grid.Row>
                  <Grid.Column
                    mobile={16}
                    tablet={16}
                    className="footer-btn"
                    computer={16}
                    textAlign="right"
                  >
                    <BRBButton size="huge" disabled={!onboardingSectionReady} onClick={onSubmit}>
                      {onboardingSectionReady && (from ? 'Save Selection' : 'Continue')}
                      {!onboardingSectionReady && 'Select at least 2'}
                    </BRBButton>
                  </Grid.Column>
                </Grid.Row>
              </Container>
            </div>
          </Grid>
        </TripTypes>
      </Container>
    </div>
  );
};
