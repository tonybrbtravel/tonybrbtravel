import { Modal, Image } from 'semantic-ui-react';
import close from '../../assets/images/close.svg';
import PrivacyPolicy from '../../components/Footer/PrivacyPolicy';

export interface Props {
  isOpened: boolean;
  onClosePopup: () => void;
}

function PrivacyPolicyModal({ isOpened, onClosePopup }: Props) {
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
        <PrivacyPolicy hideFooter />
      </Modal.Content>
    </Modal>
  );
}

export default PrivacyPolicyModal;
