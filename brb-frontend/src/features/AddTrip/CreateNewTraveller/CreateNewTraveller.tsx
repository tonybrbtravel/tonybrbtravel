import { useDispatch } from 'react-redux';
import {
  Form, Modal, Image, Header,
} from 'semantic-ui-react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { addDays, format, differenceInYears } from 'date-fns';
import DatePicker from 'react-datepicker';

import { Traveller } from '../../../interfaces/Traveller';
import Countries from '../../../components/Nationality/nationality';
import useApiQuery from '../../../Hooks/ApiQuery';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import { getCountriesInfo } from '../../../Api/brbApi';

import Metrics from '../../../themes/Metrics';

import { BRBButton } from '../../../components/BRBButton/BRBButton';
import { CountriesType } from '../../../interfaces/countriesType';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import Spacer from '../../../components/Spacer';

import passortSVG from '../../../assets/images/passport.svg';
import close from '../../../assets/images/close.svg';

import 'react-datepicker/dist/react-datepicker.css';
import './CreateNewTraveller.less';

const NATIONALITY = Countries;

const titleData = [{ title: 'Mr' }, { title: 'Mrs' }, { title: 'Miss' }, { title: 'Ms' }];

export interface Props {
  isOpened: boolean;
  onChange: (open: boolean) => void;
  traveller?: Traveller;
  onSaveNewTraveller: (traveller: Traveller[]) => void;
  headerText?: string;
  onDeleteTraveller?: (travellerId: number) => void;
  isAdditional?: boolean;
}

export const CreateNewTraveller = ({
  isOpened = true,
  onChange,
  traveller,
  onSaveNewTraveller,
  headerText = 'Create New Traveller',
  onDeleteTraveller,
  isAdditional,
}: Props) => {
  const [open, setOpen] = useState(isOpened);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const { data: countries } = useApiQuery<CountriesType[]>(
    BrbEndPoints.getCountries,
    { url: BrbEndPoints.getCountries },
    getCountriesInfo,
  );

  const ageValidate = (date: Date) => differenceInYears(new Date(), date) >= 18;

  const onSubmit = (form: any) => {
    const users = [
      {
        ...form,
        id: traveller?.id ?? 0,
        dob: format(new Date(form.dob), 'yyyy-MM-dd'),
        brbUser: headerText !== 'Create New Traveller',
      },
    ];
    onSaveNewTraveller(users);
  };

  const onRemove = () => {
    if (typeof onDeleteTraveller === 'function') {
      onDeleteTraveller(traveller?.id ?? 0);
    }
  };

  const {
    getValues,
    setValue,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (countries && countries.length > 0) {
      setCountriesData(countries);
    }
  }, [countries]);

  return (
    <Modal
      className="traveller-details"
      closeOnDimmerClick={false}
      centered
      size="tiny"
      open={open}
      onClose={() => {
        setOpen(false);
        if (typeof onChange === 'function') {
          onChange(false);
        }
      }}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content>
        <Image src={passortSVG} floated="left" />
        <Image
          floated="right"
          onClick={() => {
            setOpen(false);
            if (typeof onChange === 'function') {
              onChange(false);
            }
          }}
          src={close}
        />
        <Header as="h2">{headerText}</Header>
        <p>
          {
            isAdditional
              ? 'Add someone new to your account by entering their details exactly as they appear on their passport.'
              : 'Enter your information, making sure to match the details on your passport.'
          }
        </p>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="create-new-traveller-form"
        >
          <Controller
            name="title"
            control={control}
            defaultValue={traveller?.title ?? ''}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Select
                fluid
                {...field}
                label="Title (as on passport)"
                placeholder="Title"
                options={titleData?.map((x) => ({ text: x.title, value: x.title }))}
                onChange={async (e: any, { name, value }: any) => {
                  setValue(name, value);
                  await trigger(name);
                }}
                error={!!errors.title}
              />
            )}
          />
          <Controller
            name="firstName"
            control={control}
            defaultValue={traveller?.firstName ?? ''}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Input
                fluid
                {...field}
                label="First Name (as on passport)"
                placeholder="First name"
                onChange={async (e: any, { name, value }: any) => {
                  setValue(name, value);
                  await trigger(name);
                }}
                error={!!errors.firstName}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue={traveller?.lastName ?? ''}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Input
                fluid
                {...field}
                label="Last Name (as on passport)"
                placeholder="Last name"
                onChange={async (e: any, { name, value }: any) => {
                  setValue(name, value);
                  await trigger(name);
                }}
                error={!!errors.lastName}
              />
            )}
          />
          <Controller
            name="nationality"
            control={control}
            defaultValue={traveller?.nationality ?? ''}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Select
                label="Nationality"
                {...field}
                options={countriesData?.map((x) => ({ text: x.nationality, value: x.nationality }))}
                placeholder="Nationality"
                onChange={async (e: any, { name, value }: any) => {
                  setValue(name, value);
                  await trigger(name);
                }}
                error={!!errors.nationality}
              />
            )}
          />
          <label className="dob-label">Date of Birth</label>
          <Controller
            name="dob"
            control={control}
            defaultValue={
              traveller?.dob ? new Date(traveller.dob) : getValues().dob
            }
            rules={{ required: true, validate: ageValidate }}
            render={({ field }) => (
              <DatePicker
                {...field}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                calendarStartDay={1}
                maxDate={addDays(new Date(), 0)}
                selected={getValues().dob}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                onChange={async (date: any) => {
                  setValue('dob', date);
                  await trigger('dob');
                }}
              />
            )}
          />
          {errors.dob && errors.dob.type === 'validate' && (
            <ErrorMessage>
              Travellers must be over 18. Please contact BeRightBack if you
              need to add a traveller who’ll turn 18 before your trip.
            </ErrorMessage>
          )}

          <Spacer height={Metrics.smallSpacer} />

          <BRBButton fluid>Save</BRBButton>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default CreateNewTraveller;
