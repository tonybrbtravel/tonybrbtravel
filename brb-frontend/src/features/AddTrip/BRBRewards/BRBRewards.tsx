import React from 'react';
import { Image, Header, Modal } from 'semantic-ui-react';
import close from '../../../assets/images/close.svg';
import { MyBRBRewardsSlider } from '../../UserDashboard/MyBRBRewards/MyBRBRewardsSlider';
import rewardSvg from '../../../assets/images/badge.svg';

export interface Props {
  isOpened: boolean;
  // onChange: (open: boolean) => void;
  onClosePopup: () => void;
  // onOpenAddNewTraveller: () => void;
}

export const ModalBRBRewards = ({ isOpened, onClosePopup }: Props) => {
  const [open, setOpen] = React.useState(isOpened);

  return (
    <Modal
      className="brb-rewards"
      closeOnDimmerClick={false}
      centered
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>
        <Header as="h2" image>
          <Image src={rewardSvg} size="huge" />

          <Header.Content>Select Rewards</Header.Content>
          <Image
            floated="right"
            size="mini"
            onClick={onClosePopup}
            src={close}
          />
        </Header>
      </Modal.Header>
      <Modal.Content className="my-brb-rewards">
        <p>
          Below is the full lists of rewards available on BRB. You can either
          use your existing points and select a reward for this trip or wait
          until you have earned more points to unlock a bigger reward for a
          future trip. By selecting a reward , the points to unlock a bigger
          reward for a future trip. By selecting a reward, the points will be
          deducted from your total balance.
        </p>
        <MyBRBRewardsSlider />
      </Modal.Content>
    </Modal>
  );
};
