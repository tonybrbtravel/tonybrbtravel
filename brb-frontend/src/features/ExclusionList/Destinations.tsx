/**
 *
 * Destinations
 *
 */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { code } from 'country-emoji';
import {
  Container, Grid, Header, Icon,
} from 'semantic-ui-react';
import clsx from 'clsx';
import { TripTypes } from '../../pages/TripTypes/components/TripTypes';
import { TripType } from '../../interfaces/tripType';
import { TravelHeader } from '../travel-preferences/components/TravelHeader/TravelHeader';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import { SelectedType } from '../../pages/TripTypes/components/SelectedTypes/SelectedTypes';
import { ImageCard } from '../../pages/TripTypes/components/ImageCard/ImageCard';
import { BRBSelect, ListItem } from '../../components/BRBSelect/BRBSelect';
import { BRBCheckBoxButtonItem } from '../../components/BRBCheckBoxButton/BRBCheckBoxButton';
import './Destinations.less';
import { showNotification } from '../../components/BRBNotification/ShowNotification';
import { Top10Destinations, User } from '../../interfaces/user';

export enum DisplayType {
  Grid = 1,
  List = 2,
}
export interface Props {
  displayTypeProp: DisplayType;
  onContinue: () => void;
  isModalPopup?: boolean;
  pageName?: string;
  userProfile: User;
  onSave: (payload: Top10Destinations) => void;
}
export const Destinations = ({
  displayTypeProp,
  onContinue,
  isModalPopup,
  pageName,
  onSave,
  userProfile,
}: Props) => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    displayTypeProp ?? DisplayType.Grid,
  );
  const isExcludedDestination = pageName === 'excludedDestinations';
  const { top10Destinations } = userProfile;
  const { excludedDestinations } = userProfile;
  const countries = useSelector((state: any) => state.contentful.countries);
  const { destinations } = top10Destinations ?? { destinations: [] };
  const [tripData, setTripData] = useState<any[]>([]);
  const [listData, setListData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selCitiesCount, _] = useState<number>();

  const changeHandlerList = (item: ListItem<BRBCheckBoxButtonItem>[]) => {
    let airports = item
      .filter((x) => x.airports.find((a) => a.checked))
      .map((x) => x.airports)
      .flat();
    listData.forEach((x) => {
      x.airports.forEach((element: any) => {
        const city = airports.find((x) => x.label === element.label);
        element.checked = city?.checked;
      });
    });
    setListData(listData);
    airports = listData.map((x) => x.airports).flat();
    setTripData(airports);
  };
  const changeHandler = (item: TripType) => {
    const data = tripData.map((type: TripType) => (type.label === item.label ? { ...item } : type));
    setTripData(data);
    if (displayType === DisplayType.List) {
      listData.forEach((x) => {
        x.airports.forEach((a: any) => {
          const city = data.find((x) => x.label === a.label);
          a.checked = city?.checked;
        });
      });
      setListData(listData);
    }
  };
  let OrderedCountries: any[] = [];
  if (countries) {
    OrderedCountries = countries.slice().sort((a: any, b: any) => {
      a = a.country; // eslint-disable-line
      b = b.country; // eslint-disable-line
      return a > b ? 1 : a < b ? -1 : 0; // eslint-disable-line
    });
  }

  const onSelectCitiesCheck = () => {
    const selCitiesData = tripData && tripData.filter((x) => x.checked);
    if (!isExcludedDestination) {
      return selCitiesData.length > 10;
    }
    return selCitiesData.length > 20;
  };

  const parseData = (type: DisplayType) => {
    if (type === DisplayType.Grid) {
      const cities: TripType[] = [];
      OrderedCountries.forEach((country: any) => {
        country.cities.forEach((city: any) => {
          const selected = tripData.length === 0
            ? top10Destinations
            && top10Destinations.destinations
            && top10Destinations.destinations.find(
              (x: any) => x.destinationName === city.city,
            )
            : tripData.find((x) => x.label === city.city && x.checked);
          cities.push({
            content: city.byLine,
            image: city.smallImage,
            id: country.id,
            label: city.city,
            value: city.city,
            checked: !!selected,
          });
        });
      });
      setTripData(cities);
    } else {
      let cities: any[] = [];
      OrderedCountries.forEach((country: any) => {
        cities.push({
          region: country.country,
          code: (code(country.emoji) ?? '').toLowerCase(),
          airports: country.cities
            .filter((x: any) => !(
              isModalPopup
              && destinations
              && destinations.filter((d: any) => d.destinationName === x.city)
                .length
            ))
            .map((city: any) => {
              let selected: any = {};
              if (isExcludedDestination) {
                selected = tripData.length === 0
                  ? excludedDestinations
                  && excludedDestinations.destinations
                  && excludedDestinations.destinations.find(
                    (x: any) => x.destinationName === city.city,
                  )
                  : tripData.find((x) => x.label === city.city && x.checked);
              } else {
                selected = tripData.find(
                  (x) => x.label === city.city && x.checked,
                );
              }
              return { label: city.city, checked: !!selected };
            }),
        });
      });
      cities = cities.filter((x) => x.airports.length);
      let airports: any[] = [];
      cities.forEach((x) => {
        airports = [...airports, ...x.airports];
      });
      setTripData(airports);
      setListData(cities);
    }
  };

  useEffect(() => {
    parseData(displayType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayType, top10Destinations]);

  const renderText = () => {
    //
    const selectedCities = tripData.filter((x: TripType) => x.checked);
    if (selectedCities.length && selectedCities.length < 10 && !isModalPopup) {
      return (
        <span>
          Choose
          {' '}
          {10 - selectedCities.length}
          {' '}
          More
        </span>
      );
    }

    if (selectedCities.length === 10) {
      if (!isExcludedDestination) {
        return <span>You’re good to go!</span>;
      }
    } else if (!isModalPopup) {
      if (!isExcludedDestination) {
        if (selectedCities.length > 10) {
          return (
            <span>
              {selectedCities.length}
              {' '}
              / 10 Selected
              <p style={{ fontSize: '12px' }}>Please select 10 cities only</p>
            </span>
          );
        }
        return (
          <span>
            {selectedCities.length}
            {' '}
            / 10 Selected
          </span>
        );
      }
    }

    if (isModalPopup) {
      if (isExcludedDestination) {
        return (
          <span>
            {selectedCities.length}
            {' '}
            Selected
            <p style={{ fontSize: '12px' }}>
              Maximum: 20 excluded destinations
            </p>
          </span>
        );
      }
      if (selectedCities.length > 10) {
        return (
          <span>
            {selectedCities.length}
            {' '}
            / 10 Selected
            <p style={{ fontSize: '12px' }}>Please select 10 cities only</p>
          </span>
        );
      }
      return (
        <span>
          {selectedCities.length}
          {' '}
          / 10 Selected
        </span>
      );
    }
    return <span>Select Destinations</span>;
  };

  const onSubmit = () => {
    const selectedCities = tripData
      .filter((x: TripType) => x.checked)
      .map((x: TripType) => x.label);
    if (selectedCities.length < 10 && !isExcludedDestination) {
      showNotification.warning({
        title: 'Warning',
        content: 'Please select at least 10 cities',
      });
      return;
    }
    if (selectedCities.length > 20 && isExcludedDestination) {
      showNotification.warning({
        title: 'Warning',
        content: 'Please select upto 20 cities only!',
      });
      return;
    }
    const payload = {
      destinations: selectedCities.map((x, i) => ({ id: i, destinationName: x })),
    };
    onSave(payload);
  };

  const getSelectedTypes = (): TripType[] => {
    const selected = tripData.filter((x) => x.checked);
    if (selected.length >= 10) {
      return selected;
    }
    return [
      ...selected,
      ...tripData.filter((x) => !x.checked).slice(0, 10 - selected.length),
    ];
  };

  return (
    <div className="main-page">
      <Container>
        {!displayTypeProp && (
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <TravelHeader activeStepIndex={2} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        <TripTypes>
          <Grid>
            {!displayTypeProp && (
              <>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={4} computer={3} />
                  <Grid.Column mobile={16} tablet={12} computer={13}>
                    <Header as="h5">
                      Top
                      {' '}
                      <span className="colorName">10 cities</span>
                      {' '}
                      you can’t
                      wait to explore?
                    </Header>
                    <p className="paragraphStyling">
                      Nominate the 10 European cities that excite you most so that
                      our team can prioritise them in your bucket list.
                    </p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="destinationSelectionStyle">

                  <Grid.Column
                    only="large screen computer"
                    largeScreen={3}
                    computer={3}
                  />

                  <Grid.Column
                    verticalAlign="middle"
                    mobile={13}
                  >
                    <Icon
                      name="th large"
                      onClick={() => setDisplayType(DisplayType.Grid)}
                      className={clsx('brb-icon', {
                        active: displayType === DisplayType.Grid,
                      })}
                    />
                    <Icon
                      name="sidebar"
                      onClick={() => setDisplayType(DisplayType.List)}
                      className={clsx('brb-icon', {
                        active: displayType === DisplayType.List,
                      })}
                    />
                  </Grid.Column>
                </Grid.Row>
              </>
            )}
            <Grid.Row>
              {!displayTypeProp && (
                <Grid.Column
                  only="large screen computer"
                  largeScreen={3}
                  computer={3}
                >
                  <SelectedType
                    types={getSelectedTypes()}
                    onRemove={changeHandler}
                    totalTiles={10}
                  />
                </Grid.Column>
              )}
              <Grid.Column
                mobile={16}
                tablet={12}
                computer={displayTypeProp ? 16 : 13}
              >
                {displayType === DisplayType.Grid && (
                  <ImageCard
                    onSelect={changeHandler}
                    types={tripData}
                    from={isModalPopup}
                  />
                )}
                {displayType === DisplayType.List && (
                  <BRBSelect onChange={changeHandlerList} items={listData} />
                )}
              </Grid.Column>
            </Grid.Row>
            <div className="sticky-button">
              <Container>
                <Grid.Row>
                  <Grid.Column textAlign="right" className="footer-btn">
                    <BRBButton
                      size="huge"
                      onClick={onSubmit}
                      disabled={onSelectCitiesCheck()}
                    >
                      {renderText()}
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
