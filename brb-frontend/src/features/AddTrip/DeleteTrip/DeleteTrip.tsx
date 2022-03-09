import React from 'react';
import { Image, Header, Modal } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import close from '../../../assets/images/close.svg';
import './DeleteTrip.less';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import { deleteTrip } from '../../../Api/Trip';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import { showNotification } from '../../../components/BRBNotification/ShowNotification';
import { updateTripForm } from '../Contents/contentSlice';

export interface Props {
  isOpened: boolean;
  onClosePopup: () => void;
  id: number;
}

export const DeleteTrip = ({ isOpened, onClosePopup, id }: Props) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const user = useSelector((state: any) => state.dashboard.user);
  const [open, setOpen] = React.useState(isOpened);
  const dispatch = useDispatch();
  const deleteTripById = () => {
    deleteTrip({ url: `${BrbEndPoints.DeleteTrip}/${id}` }).then((x) => {
      history.push('/my-trips');
      dispatch(
        updateTripForm({
          travelDates: {},
          roomTypes: {},
          additionalTravellers: [],
          error: null,
        }),
      );
      showNotification.success({
        title: 'Trip',
        content: 'Trip Deleted Successfully',
      });
      queryClient.invalidateQueries(['mytrips', user.id]);
    });
    onClosePopup();
  };
  return (
    <Modal
      className="delete-trip"
      centered
      size="small"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content>
        <Image
          floated="right"
          onClick={onClosePopup}
          src={close}
          className="closeIcon"
        />
        <Header as="h2">
          <Header.Content>
            Are You Sure You Want To
            {' '}
            <strong>Delete This Trip?</strong>
          </Header.Content>
        </Header>
        <div className="delete-trip-buttons">
          <BRBButton className="delete-trip-yes" onClick={deleteTripById}>
            Yes
          </BRBButton>
          <BRBButton className="delete-trip-no" onClick={onClosePopup}>
            No
          </BRBButton>
        </div>
      </Modal.Content>
    </Modal>
  );
};
