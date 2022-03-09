import { Modal, Image } from 'semantic-ui-react';
import close from '../../assets/images/close.svg';
import MembershipConditions from '../../components/Footer/MembershipConditions';

export interface Props {
  isOpened: boolean;
  onClosePopup: () => void;
}

function MembershipConditionsModal({ isOpened, onClosePopup }: Props) {
  return (
    <Modal
      centered
      open={isOpened}
      onClose={onClosePopup}
    >
      <Modal.Content>
        <Image
          onClick={onClosePopup}
          src={close}
          style={{
            cursor: 'pointer',
            padding: '1rem',
            position: 'absolute',
            top: '.5rem',
            right: '.5rem',
          }}
        />
        <MembershipConditions hideFooter />
      </Modal.Content>
    </Modal>
  );
}

export default MembershipConditionsModal;
