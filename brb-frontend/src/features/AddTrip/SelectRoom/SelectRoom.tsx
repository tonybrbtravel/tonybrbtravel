import React, { useState, useEffect } from 'react';
import { Header, Modal, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import close from '../../../assets/images/close.svg';
import activity from '../../../assets/images/activity.svg';
import hotel from '../../../assets/images/hotel.svg';
import history from '../../../app/history';
import './SelectRoom.less';
import {
  BRBCheckBoxButton,
  BRBCheckBoxButtonItem,
} from '../../../components/BRBCheckBoxButton/BRBCheckBoxButton';
import { HotelRoom } from '../../../mockData/HotelRoom';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import { createRoomSave } from '../Contents/contentSlice';
import { HotelRoomType } from '../../../interfaces/roomType';
import {
  getUserProfile,
  saveHotelPreferences,
} from '../../../Api/TravelPreferences';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import { dashboardUserUpdate } from '../../dashboard/dashboardSlice';
import { errorMessage } from '../../../utils/helper';
import { Spinner } from '../../../components/BRBSpinner/BRBSpinner';
import { showNotification } from '../../../components/BRBNotification/ShowNotification';

export interface Props {
  isOpened?: boolean;
  onClosePopup: () => void;
}

export const SelectRoom = ({ isOpened, onClosePopup }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(isOpened);
  const [hotelRoom, setHotelRoomList] = useState<HotelRoomType[]>(HotelRoom);
  const [loaderSaveRoom, setLoaderSaveRoom] = useState<boolean>();
  const changeHandler = (item: BRBCheckBoxButtonItem) => {
    const data = hotelRoom.map((type: BRBCheckBoxButtonItem) => (type.label === item.label ? { ...item } : type));
    if (item.checked === true) {
      const selectedData = data.map((x) => {
        x.checked = true;
        if (item.label !== x.label) {
          x.checked = false;
        }
        return x;
      });
      setHotelRoomList(selectedData);
    }
  };
  const userProfile = useSelector((state: any) => state.dashboard.user);
  useEffect(() => {
    const { preferences } = userProfile.hotelPreferences ?? {
      preferences: [],
    };
    hotelRoom.forEach((d, index: number) => {
      d.checked = !!preferences.find((p: any) => p.name === d.label);
      return d;
    });
    setHotelRoomList([...hotelRoom]);
  }, []);

  const onRoomSave = (event: any) => {
    const payload = {
      preferences: hotelRoom
        .filter((x) => x.checked)
        .map((x, index: number) => ({
          name: x.label,
          id: index,
        })),
    };

    const hotelLenCheck = payload ? payload.preferences.length : 0;
    if (hotelLenCheck > 1 || hotelLenCheck === 0) {
      showNotification.error({
        title: 'Error!',
        content: 'Please select only one hotel preferences',
      });
      return false;
    }
    setLoaderSaveRoom(true);
    saveHotelPreferences({
      url: BrbEndPoints.hotelPreferences,
      data: payload,
    })
      .then((x) => {
        setLoaderSaveRoom(false);
        dispatch(dashboardUserUpdate(x));
      })
      .catch(errorMessage);

    if (isOpened) {
      onClosePopup();
    }
    return true;
  };

  return (
    <>
      {loaderSaveRoom ? <Spinner /> : ''}
      <Modal
        closeOnDimmerClick={false}
        className="select-hotelRoom"
        centered
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        size="tiny"
      >
        <Modal.Content>
          <Header as="h2">
            <Image src={hotel} />

            <Header.Content>Hotel Preferences</Header.Content>
            <Image
              floated="right"
              size="mini"
              onClick={onClosePopup}
              src={close}
            />
          </Header>
          <p className="hide-in-mobile">
            Select the main factor influencing your hotel selection.
          </p>
          <Header as="h3">
            As a traveller, what is the most important criteria for you when booking a hotel?
          </Header>
          <div className="scroller-div">
            <div className="brb-checkbox-hotelRoom">
              {hotelRoom.map((item: BRBCheckBoxButtonItem) => (
                <BRBCheckBoxButton
                  primary
                  item={item}
                  onChange={changeHandler}
                />
              ))}
            </div>
          </div>
          <div className="dateRange-save-button">
            <BRBButton onClick={onRoomSave}>Save</BRBButton>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
