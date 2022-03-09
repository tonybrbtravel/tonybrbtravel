import { useState, useEffect } from 'react';
import './SelectRoom.less';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header, Modal, Image, Form,
} from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';
import { createNewRoomSave } from '../Contents/contentSlice';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import close from '../../../assets/images/close.svg';
import { Spinner } from '../../../components/BRBSpinner/BRBSpinner';

const ROOM_TYPES_ONE_TRAVELLER = [
  { key: 'Single or Double Room', value: 'Single or Double Room', text: 'Single or Double Room' },
];

const ROOM_TYPES_TWO_TRAVELLER = [
  { key: 'Double Room', value: 'Double Room', text: 'Double Room' },
  { key: 'Twin Room', value: 'Twin Room', text: 'Twin Room' },
];

const ROOM_TYPES_THREE_TRAVELLER = [
  { key: '1 Double Bed & 1 Single Bed', value: '1 Double Bed & 1 Single Bed', text: '1 Double Bed & 1 Single Bed' },
  { key: '3 Single Beds', value: '3 Single Beds', text: '3 Single Beds' },
];

const ROOM_TYPES_FOUR_TRAVELLER = [
  { key: '2 Double Beds', value: '2 Double Beds', text: '2 Double Beds' },
  { key: '1 Double Bed & 2 Single Beds', value: '1 Double Bed & 2 Single Beds', text: '1 Double Bed & 2 Single Beds' },
  { key: '4 Single Beds', value: '4 Single Beds', text: '4 Single Beds' },
];

export interface Props {
  isOpened: boolean;
  onChange: (open: boolean) => void;
  onClosePopup: () => void;
}

export interface RoomType {
  roomType: string;
  roomNotes: string;
}

export const SelectRoomType = ({
  isOpened = true,
  onChange,
  onClosePopup,
}: Props) => {
  const tripConfiguration = useSelector(
    (state: any) => state.content.tripConfiguration ?? {},
  );
  const roomTypes = tripConfiguration.roomTypes ?? {};
  const dispatch = useDispatch();
  const [open, setOpen] = useState(isOpened);
  const [loaderRoomType, setLoaderRoomType] = useState<boolean>(false);

  const onRoomSubmit = (form: RoomType) => {
    setLoaderRoomType(true);
    dispatch(createNewRoomSave(form));
    setLoaderRoomType(false);
    onClosePopup();
  };
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const {
    setValue,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const roomOptions = (tripConfiguration.addedTravellers.length === 1 ? ROOM_TYPES_ONE_TRAVELLER
    : tripConfiguration.addedTravellers.length === 2 ? ROOM_TYPES_TWO_TRAVELLER
      : tripConfiguration.addedTravellers.length === 3 ? ROOM_TYPES_THREE_TRAVELLER
        : tripConfiguration.addedTravellers.length === 4 ? ROOM_TYPES_FOUR_TRAVELLER : ROOM_TYPES_FOUR_TRAVELLER);

  return (
    <>
      {loaderRoomType ? <Spinner /> : ''}
      <Modal
        closeOnDimmerClick={false}
        size="tiny"
        className="select-hotelRoom"
        centered
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Content>
          <Image floated="right" onClick={onClosePopup} src={close} />
          <Header as="h2">Select Room Type</Header>
          <p>
            Select your preferred room type and feel free to leave a note to
            your travel concierge should you need anything specific.
          </p>
          <Form onSubmit={handleSubmit(onRoomSubmit)}>
            <Controller
              name="roomType"
              control={control}
              rules={{ required: true }}
              defaultValue={roomTypes.roomType || roomOptions[0].value}
              render={({ field }) => (
                <Form.Select
                  label="Room Type"
                  {...field}
                  options={roomOptions}
                  placeholder="Room Type"
                  onChange={async (e: any, { name, value }: any) => {
                    setValue(name, value);
                    await trigger(name);
                  }}
                  disabled={tripConfiguration.addedTravellers.length === 0}
                  error={!!errors.roomType}
                />
              )}
            />
            <Controller
              name="roomNotes"
              control={control}
              defaultValue={roomTypes.roomNotes}
              rules={{ required: false }}
              render={({ field }) => (
                <Form.TextArea
                  fluid
                  rows={3}
                  {...field}
                  label="Add Note"
                  placeholder="Additional requests e.g baby cot"
                  onChange={async (e: any, { name, value }: any) => {
                    setValue(name, value);
                    await trigger(name);
                  }}
                  error={!!errors.roomNotes}
                />
              )}
            />

            <BRBButton fluid>Save</BRBButton>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SelectRoomType;
