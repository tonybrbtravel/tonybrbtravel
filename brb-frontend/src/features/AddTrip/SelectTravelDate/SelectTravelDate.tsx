import { useEffect, useState } from 'react';
import './SelectTravelDate.less';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header, Modal, Image, Form, Message,
} from 'semantic-ui-react';
import { Controller, useForm } from 'react-hook-form';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import { showNotification } from '../../../components/BRBNotification/ShowNotification';
import close from '../../../assets/images/close.svg';
import { createTripDateSave, tripPriceUpdate } from '../Contents/contentSlice';
import { TravelDates } from '../../../interfaces/user';
import { getTripBalance, getTripTopUpInfo } from '../../../Api/myTrips';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import { getMyTravelSavings } from '../../../Api/dashboardApi';
import DateRangePickerInput from '../../../components/DateRangePickerInput';

const LATE_RETURN = [
  { value: 'true', text: 'Yes', key: 'Yes' },
  { value: 'false', text: 'No', key: 'No' },
];

const DEPARTURE_TIME = [
  {
    value: 'Anytime',
    text: 'Anytime',
    key: 'Anytime',
  },
  {
    value: 'As early as possible',
    text: 'As early as possible',
    key: 'As early as possible',
  },
  {
    value: 'After 8am',
    text: 'After 8am',
    key: 'After 8am',
  },
  {
    value: 'After 12pm',
    text: 'After 12pm',
    key: 'After 12pm',
  },
  {
    value: 'After 7pm',
    text: 'After 7pm',
    key: 'After 7pm',
  },
];

const NO_OF_CITIES = [
  { value: 1, key: 1, text: 'A single city' },
  { value: 2, key: 2, text: 'Two cities back-to-back' },
];

export interface Props {
  isOpened?: boolean;
  onClosePopup: () => void;
  travellersCount?: number;
}

export const SelectTravelDate = ({
  isOpened,
  onClosePopup,
  travellersCount,
}: Props) => {
  const dispatch = useDispatch();
  const tripConfiguration = useSelector(
    (state: any) => state.content.tripConfiguration ?? {},
  );
  const travelDates: TravelDates = tripConfiguration.travelDates ?? {};

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [open, setOpen] = useState(isOpened);
  const [balancePopup, setBalancePopup] = useState<boolean>(false);
  const [visibilePopup, setVisiblePopup] = useState<boolean>(false);

  const [numberOfNights, setNumberOfNights] = useState<number>(
    travelDates?.numberOfNights ?? 0,
  );

  const {
    setValue,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const [selectionRange, setSelectionRange] = useState({
    startDate: travelDates?.selectedDates?.startDate ?? addDays(new Date(), 42),
    endDate: travelDates?.selectedDates?.endDate,
    key: 'selection',
  });

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  const handleSelect = async (ranges: any) => {
    setSelectionRange(ranges);
    setValue('selectedDates', ranges);
    await trigger('selectedDates');

    if (ranges.startDate && ranges.endDate) {
      const timeDifference = Math.abs(
        ranges.startDate.getTime() - ranges.endDate.getTime(),
      );
      const nights: number = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setNumberOfNights(nights);

      if (nights === 1) {
        showNotification.warning({
          title: 'Warning',
          content: 'A trip must be a minimum of two nights',
        });
      }
      if (nights > 14) {
        showNotification.warning({
          title: 'Warning',
          content: 'A trip must be a maximum of 14 nights',
        });
        return false;
      }

      let additionalTraveller;

      if (travellersCount === 0) {
        showNotification.warning({
          title: 'Warning',
          content: 'Please choose travellers and come to this section!',
        });
      }

      if (travellersCount && travellersCount === 1) {
        additionalTraveller = 1;
      } else if (travellersCount && travellersCount > 1) {
        additionalTraveller = travellersCount - 1;
      } else {
        additionalTraveller = 1;
      }

      // const travellers = travellersCount > 0 ?
      if (travellersCount && travellersCount > 0) {
        const travellers = tripConfiguration.addedTravellers ?? [];

        // console.log('travellers',travellers);
        let addTravellers = [];
        if (travellers.length) {
          addTravellers = travellers.map((x: any) => ({
            firstName: x.firstName,
            lastName: x.lastName,
            nationality: x.nationality,
            brbUser: x.brbUser,
            dob: new Date(x.dob).toISOString().slice(0, 10),
          }));
        }

        const tripStartDate = new Date(ranges.startDate).toISOString().slice(0, 10);
        const tripEndDate = new Date(ranges.endDate).toISOString().slice(0, 10);

        const tripInfoDetails: any = {
          startDate: tripStartDate,
          endDate: tripEndDate,
          additionalTravellers: addTravellers,
        };

        getTripTopUpInfo({ url: BrbEndPoints.tripTopUp, data: tripInfoDetails })
          .then((res) => {
            if (res) {
              const topPopupPrice = res.pricing && res.pricing.topUp;
              const additionalTravellerPrice = res.pricing && res.pricing.additionalTravellerPrice;
              const balObj = {
                tripPrice: res.pricing && res.pricing.tripPrice,
                additionalTravellerPrice: res.pricing && res.pricing.additionalTravellerPrice,
                topUp: topPopupPrice,
              };
              dispatch(tripPriceUpdate(balObj));

              if ((topPopupPrice === 0 || topPopupPrice <= 0) && (additionalTravellerPrice === 0 || additionalTravellerPrice <= 0)) {
                setBalancePopup(false);
                setVisiblePopup(false);
              } else {
                setBalancePopup(true);
                setVisiblePopup(true);
              }
            }
          });
      }
    }
    return true;
  };
  const onTravelDateSubmit = (data: any) => {
    dispatch(createTripDateSave({ ...data, numberOfNights }));
    onClosePopup();
  };
  const isMobile: boolean = width <= 768;

  return (
    <Modal
      size="small"
      className="select-date"
      centered
      open={open}
      closeOnDimmerClick={false}
    >
      <Modal.Content>
        <Form onSubmit={handleSubmit(onTravelDateSubmit)}>
          <Image floated="right" onClick={onClosePopup} src={close} />
          <Header as="h2">Select Your Travel Dates</Header>
          <p>
            Pick your start and end dates. If your trip has 4 or more nights,
            choose between a single European destination or visit two separate cities back-to-back.
          </p>

          <Controller
            name="selectedDates"
            control={control}
            rules={{ required: true }}
            defaultValue={selectionRange}
            render={({ field }) => (
              <DateRangePickerInput
                label="Travel Dates"
                direction={isMobile ? 'vertical' : 'horizontal'}
                isMandatory
                value={field.value}
                placeholder="Travel Dates"
                isError={errors?.selectedDates}
                onChange={handleSelect}
              />
            )}
          />

          {numberOfNights >= 4 && (
            <Controller
              name="noOfCities"
              control={control}
              rules={{ required: true }}
              defaultValue={travelDates.noOfCities || NO_OF_CITIES[0].value}
              render={({ field }) => (
                <Form.Select
                  {...field}
                  label="How many cities do you want visit?"
                  error={!!errors.noOfCities}
                  options={NO_OF_CITIES}
                  placeholder="How many cities do you want visit?"
                  onChange={async (e: any, { name, value }: any) => {
                    setValue(name, value);
                    await trigger(name);
                  }}
                />
              )}
            />
          )}

          <Form.Group>
            <Controller
              name="departurePreference"
              control={control}
              rules={{ required: true }}
              defaultValue={travelDates.departurePreference || DEPARTURE_TIME[0].value}
              render={({ field }) => (
                <Form.Select
                  {...field}
                  label="What is your ideal departure time?"
                  error={!!errors.departurePreference}
                  options={DEPARTURE_TIME}
                  placeholder="What is your ideal departure time?"
                  onChange={async (e: any, { name, value }: any) => {
                    setValue(name, value);
                    await trigger(name);
                  }}
                />
              )}
            />
            <Controller
              name="lateReturn"
              control={control}
              rules={{ required: true }}
              defaultValue={travelDates.lateReturn || LATE_RETURN[0].value}
              render={({ field }) => (
                <Form.Select
                  {...field}
                  label="Are you happy with a late return?"
                  error={!!errors.lateReturn}
                  options={LATE_RETURN}
                  placeholder="Are you happy with a late return?"
                  onChange={async (e: any, { name, value }: any) => {
                    setValue(name, value);
                    await trigger(name);
                  }}
                />
              )}
            />
          </Form.Group>

          {visibilePopup ? (
            <div className="popup-notify">
              <Message
                negative
                attached
                size="small"
                icon="warning sign"
                header="Top-up!"
                content="We'll check your funds when you create or update a trip and if a top-up is required you'll be redirected to our payment page."
              />
            </div>
          ) : (
            ''
          )}
          <div className="dateRange-save-button">
            <BRBButton
              disabled={
                numberOfNights < 2
                || numberOfNights > 14
                || (!travellersCount)
              }
            >
              Save
            </BRBButton>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SelectTravelDate;
