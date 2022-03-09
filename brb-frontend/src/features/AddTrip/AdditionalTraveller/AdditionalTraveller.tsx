import React, { useEffect, useState } from 'react';
import './AdditionalTraveller.less';
import {
  Button,
  Divider,
  Dropdown,
  Image,
  Header,
  Icon,
  Modal,
  DropdownItemProps,
} from 'semantic-ui-react';
import close from '../../../assets/images/close.svg';
import check from '../../../assets/images/check.svg';
import passortSVG from '../../../assets/images/Group.svg';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import { Traveller } from '../../../interfaces/Traveller';

export interface Props {
  isOpened: boolean;
  onChange: (open: boolean) => void;
  onClosePopup: () => void;
  onRemove: (id: Traveller) => void;
  onOpenAddNewTraveller: () => void;
  travellers: Traveller[];
}

export const AdditionalTraveller = ({
  isOpened,
  onChange,
  onClosePopup,
  travellers,
  onRemove,
  onOpenAddNewTraveller,
}: Props) => {
  const [open, setOpen] = React.useState(isOpened);
  const parseDropDownProps = (data: Traveller[]): DropdownItemProps[] => data.map((x: Traveller, index: number) => parseByValue(x, index));

  const parseByValue = (item: Traveller, index: number): DropdownItemProps => {
    const userName = `${item.firstName} ${item.lastName}`;
    return {
      key: item.id,
      text: (
        <div key={item.id}>
          <Header as="h4">
            {userName}
          </Header>
          <div>
            Nationality:
            {' '}
            {item.nationality}
          </div>
        </div>
      ),
      value: item.id,
    };
  };

  const remove = (item: Traveller) => {
    onRemove(item);
  };

  const onSaveTraveller = () => {
    onClosePopup();
    setOpen(false);
  };

  return (
    <>
      <Modal
        closeOnDimmerClick={false}
        className="additional-traveller"
        centered
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
          onChange(false);
        }}
        onOpen={() => setOpen(true)}
      >
        <Modal.Content>
          <Image src={passortSVG} floated="left" />
          <Image
            floated="right"
            onClick={onClosePopup}
            src={close}
            className="closeIcon"
          />
          <Header as="h2">Additional Travellers </Header>
          <div className="additional-traveller-scroller">
            <p>
              Add travellers to your account by entering their details as they
              appear on their passport. This will allow you to easily add these
              travellers to your trips.
            </p>
            {
              travellers
              && travellers.length > 0
              && (
                <>
                  {travellers.map((item: Traveller, index: number) => (
                    <div className="dropdown_icon add-traveller-dropdown" key={index}>
                      <h5>
                        {`Additional traveller ${index + 1}`}
                      </h5>
                      <Image floated="left" src={check} className="dropdown-left" />
                      <Dropdown
                        value={item.id}
                        fluid
                        disabled
                        selection
                        options={parseDropDownProps([...travellers])}
                        placeholder="Add Traveller"
                      />
                      <a
                        className="btn-remove"
                        style={{ color: 'red', textDecoration: 'underline' }}
                        onClick={() => remove(item)}
                      >
                        Remove
                      </a>
                    </div>
                  ))}
                  <Divider horizontal>Or</Divider>
                </>
              )
            }

            <Button inverted fluid onClick={onOpenAddNewTraveller}>
              <Icon name="add" />
              {' '}
              Create new traveller
            </Button>
            <BRBButton fluid onClick={onSaveTraveller}>
              Save
            </BRBButton>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
