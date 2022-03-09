import React, { useEffect, useState, useRef } from 'react';
import {
  Grid, Header, Container, Form,
} from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { TravelHeader } from './components/TravelHeader/TravelHeader';
import { TripType } from '../../interfaces/tripType';
import { TripTypes } from '../../pages/TripTypes/components/TripTypes';
import { ImageCard } from '../../pages/TripTypes/components/ImageCard/ImageCard';
import { SelectedType } from '../../pages/TripTypes/components/SelectedTypes/SelectedTypes';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import BrbEndPoints from '../../Api/BrbEndPoints';
import { getTravelTypes } from '../../Api/TravelPreferences';
import { TravelTypesData } from '../../mockData/triptypes';
import { TravelPreferences as TravelPref, User } from '../../interfaces/user';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

import './TravelPreferences.less';

const AutoScroller = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return <div ref={ref} />;
};
export interface Props {
  from?: boolean;
  onContinue: () => void;
  userProfile: User;
  onSave: (payload: TravelPref) => void;
  addTrip?: boolean;
  pageName?: string;
}

export const TravelPreferences: React.VFC<Props> = ({
  from,
  onSave,
  userProfile,
  addTrip,
  pageName,
}: Props) => {
  const tripDetails = useSelector((state: any) => state.content.tripConfiguration.travelPreferences);
  const tripStaycationDetails = tripDetails?.staycation ? tripDetails?.staycation : '';
  const [tripData, setTripData] = useState<TripType[]>([]);
  const [travelTypes, setTravelTypes] = useState<TripType[]>([]);
  const [staycationPref, setStaycationPref] = useState<string>(tripStaycationDetails?.preference || '');
  const [staycationTransport, setStaycationTransport] = useState<string>(tripStaycationDetails?.transport || '');
  const [staycationDistance, setStaycationDistance] = useState<string>(tripStaycationDetails?.distance || '');
  const [staycationDontWantGo, setStaycationDontWantGo] = useState<string>(tripStaycationDetails?.dontWantToGo || '');
  const [staycationPrefError, setStaycationPrefError] = useState<boolean>(false);
  const [staycationTransportError, setStaycationTransportError] = useState<boolean>(false);
  const [staycationDistanceError, setStaycationDistanceError] = useState<boolean>(false);

  const [onboardingSectionReady, setOnboardingSectionReady] = useState<boolean>(false);

  useEffect(() => {
    getTravelTypes({ url: BrbEndPoints.TripTypes }).then((x: TripType[]) => {
      setTravelTypes(x);
    });
  }, []);

  const { travelPreferences } = userProfile;

  useEffect(() => {
    if (travelTypes && travelTypes.length > 0) {
      travelTypes.forEach((x: TripType) => {
        if (
          travelPreferences
          && travelPreferences.tripTypes
          && travelPreferences.tripTypes.find((t: any) => parseInt(t.id.toString(), 10) === parseInt(x.id.toString(), 10))
        ) {
          x.checked = true;
        }
        const type = TravelTypesData.find((t) => t.label === x.label);
        x.image = type ? type.image : '';
      });
      const types = ((addTrip === false) ? checkAllAndUncheck(travelTypes) : travelTypes);
      setTripData([...types]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelPreferences, travelTypes]);

  const travelTypesFormUpdate = () => {
    const travelProfileTripData = tripData
      .filter((x) => x.checked && x.name !== 'Anything')
      .map((x) => ({
        id: x.id,
        name: x.label,
      }));

    const addTripDate = tripData
      .filter((x) => x.checked)
      .map((x) => ({
        id: x.id,
        name: x.label,
      }));

    const payload: any = {
      tripTypes: ((addTrip === false) ? travelProfileTripData : addTripDate),
    };

    const staycationChecked = tripData.find(
      (x) => x.checked && x.name === 'Staycation',
    );

    if (staycationChecked === undefined) {
      setStaycationPref('');
      setStaycationTransport('');
      setStaycationDistance('');
      setStaycationDontWantGo('');
      setStaycationPrefError(false);
      setStaycationTransportError(false);
      setStaycationDistanceError(false);
    }

    if (staycationChecked?.checked && pageName !== 'travelProfile' && from !== undefined) {
      let validationError = false;

      if (staycationPref === '') {
        setStaycationPrefError(true);
        validationError = true;
      }

      if (staycationTransport === '') {
        setStaycationTransportError(true);
        validationError = true;
      }

      if (staycationDistance === '') {
        setStaycationDistanceError(true);
        validationError = true;
      }
      if (validationError) {
        return false;
      }
    }

    const staycationData: any = {
      staycation: tripData
        .filter((x) => x.checked && x.name === 'Staycation')
        .map((x) => {
          if (staycationPref) {
            return {
              preference: staycationPref,
              transport: staycationTransport,
              distance: staycationDistance,
              dontWantToGo: staycationDontWantGo,
            };
          }
          return null;
        }),
    };

    let finalPayload;
    if (staycationData.staycation.length) {
      [payload.staycation] = staycationData.staycation;
      finalPayload = payload;
    } else {
      finalPayload = payload;
    }
    onSave(finalPayload);
    return true;
  };

  const excludeTripTypes = (type: TripType) => type.name !== 'Anything';

  const checkAllAndUncheck = (data: TripType[]) => {
    const checkAnything = data.filter(excludeTripTypes).every((x) => x.checked);
    if (checkAnything) {
      data = data.map((x) => {
        x.checked = true;
        return x;
      });
    } else {
      data.map((x) => {
        if (x.name === 'Anything') {
          x.checked = false;
        }
        return x;
      });
    }

    const uncheckAnything = data
      .filter(excludeTripTypes)
      .every((x) => !x.checked);

    if (uncheckAnything) {
      data = data.map((x) => {
        x.checked = false;
        return x;
      });
    }

    return data;
  };

  // TODO: Figure out this nonsense and rewrite
  const changeHandler = (item: TripType) => {
    let data = [];
    if (addTrip === false) {
      data = tripData.map((type: TripType) => (type.id === item.id ? { ...item } : type));
      if (item.name === 'Anything') {
        data = data.map((x) => {
          x.checked = item.checked;
          return x;
        });
      }
      data = checkAllAndUncheck(data);
      setTripData(data);
    } else {
      data = tripData.map((type: TripType) => (type.id === item.id && item.checked === true ? { ...item } : type));
      if (item.checked === true || item.name === 'Anything') {
        const selectedData = data.map((x) => {
          x.checked = true;
          if (item.id !== x.id) {
            x.checked = false;
          }
          return x;
        });
        setTripData(selectedData);
      }
    }
  };

  const staycationVerify = tripData
    ? tripData.filter((x: any) => (x.checked ? x.name === 'Staycation' : false))
    : [];

  useEffect(() => {
    setOnboardingSectionReady(tripData.filter((x) => x.checked).length > 0);
  }, [tripData]);

  return (
    <div className="main-page">
      <Container className="trip-types-mobile-checkbox">
        {!from && (
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <TravelHeader activeStepIndex={0} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        <TripTypes>
          <Grid>
            {!from && (
              <>
                <Grid.Row className="pb-0">
                  <Grid.Column
                    only="large screen computer"
                    largeScreen={3}
                    computer={3}
                  />
                  <Grid.Column mobile={16} tablet={16} computer={13}>
                    <Header as="h5">
                      Hello
                      {' '}
                      <span className="colorName">
                        {userProfile.preferredName}
                      </span>
                      , What Do You Love To Travel For...?
                    </Header>
                    <p className="paragraphStyling">
                      Tell us what you love most about travelling so we can get
                      your future trips sorted!
                    </p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="pb-0">
                  <Grid.Column
                    mobile={16}
                    tablet={4}
                    computer={3}
                  />
                  <Grid.Column mobile={16} tablet={12} computer={13}>
                    <p className="headingStyle">Select at least one, or as many as you want.</p>
                  </Grid.Column>
                </Grid.Row>
              </>
            )}

            <Grid.Row className="travelPreferenceCards">
              {!from && (
                <Grid.Column
                  only="large screen computer"
                  largeScreen={3}
                  computer={3}
                >
                  {tripData && tripData.length > 0 && (
                    <SelectedType
                      types={tripData.filter(excludeTripTypes)}
                      onRemove={changeHandler}
                      totalTiles={tripData.filter(excludeTripTypes).length}
                    />
                  )}
                </Grid.Column>
              )}
              <Grid.Column mobile={16} tablet={16} computer={!from ? 13 : 16}>
                <ImageCard
                  onSelect={changeHandler}
                  types={tripData}
                  from={from}
                />
              </Grid.Column>

              {from && staycationVerify.length === 1 && addTrip === true && (
                <Grid.Column mobile={16} tablet={16} computer={16}>
                  <Form className="trip-types-preferences">
                    <Form.Group widths="equal">
                      <Form.Select
                        fluid
                        label="Staycation Preference"
                        options={[
                          { key: 1, text: 'Countryside', value: 'Countryside' },
                          { key: 2, text: 'City', value: 'City' },
                          { key: 3, text: 'Coast', value: 'Coast' },
                        ]}
                        onChange={(event: any, data: any) => {
                          setStaycationPref(data.value);
                          if (data.value) {
                            setStaycationPrefError(false);
                          }
                        }}
                        defaultValue={
                          tripStaycationDetails
                          && tripStaycationDetails?.preference
                        }
                        placeholder="Staycation Preference"
                        error={staycationPrefError ? <ErrorMessage>This Field is Required.</ErrorMessage> : undefined}
                      />

                      <Form.Select
                        fluid
                        label="Transport"
                        options={[
                          {
                            key: 1,
                            text: 'Own Transport',
                            value: 'Own Transport',
                          },
                          {
                            key: 2,
                            text: 'Public Transport',
                            value: 'Public Transport',
                          },
                        ]}
                        placeholder="Transport"
                        onChange={(event: any, data: any) => {
                          setStaycationTransport(data.value);
                          if (data.value) {
                            setStaycationTransportError(false);
                          }
                        }}
                        defaultValue={tripStaycationDetails && tripStaycationDetails?.transport}
                        error={staycationTransportError ? <ErrorMessage>This Field is Required.</ErrorMessage> : undefined}
                      />
                      <Form.Select
                        fluid
                        label="Distance"
                        options={[
                          {
                            key: 1,
                            text: 'Up to 2 hours',
                            value: 'Up to 2 hours',
                          },
                          {
                            key: 2,
                            text: '2-4 hours',
                            value: '2-4 hours',
                          },
                          {
                            key: 3,
                            text: '4+hours',
                            value: '4+hours',
                          },
                        ]}
                        placeholder="Distance"
                        onChange={(event: any, data: any) => {
                          setStaycationDistance(data.value);
                          if (data.value) {
                            setStaycationDistanceError(false);
                          }
                        }}
                        defaultValue={tripStaycationDetails && tripStaycationDetails?.distance}
                        error={staycationDistanceError ? <ErrorMessage>This Field is Required.</ErrorMessage> : undefined}
                      />
                    </Form.Group>

                    <Form.Group widths="equal">
                      <Form.Field>
                        <label>Is there anywhere you don’t want to go?</label>
                        <div className="ui fluid input">
                          <input
                            defaultValue={tripStaycationDetails && tripStaycationDetails?.dontWantToGo}
                            placeholder="Is there anywhere you don’t want to go?"
                            onChange={(event: any) => {
                              setStaycationDontWantGo(event.target.value);
                            }}
                          />
                        </div>
                      </Form.Field>
                    </Form.Group>
                  </Form>

                  {/* Dirty auto scroll when active */}
                  <AutoScroller />

                </Grid.Column>
              )}
            </Grid.Row>

            <div className="sticky-button">
              <Container>
                <Grid.Row>
                  <Grid.Column
                    mobile={16}
                    tablet={16}
                    computer={16}
                    className="footer-btn"
                    textAlign="center"
                  >

                    <BRBButton size="huge" disabled={!onboardingSectionReady} onClick={travelTypesFormUpdate}>
                      {onboardingSectionReady && (from ? 'Save Selection' : 'Continue')}
                      {!onboardingSectionReady && (from ? 'Choose trip type' : 'Select at least 1')}
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
