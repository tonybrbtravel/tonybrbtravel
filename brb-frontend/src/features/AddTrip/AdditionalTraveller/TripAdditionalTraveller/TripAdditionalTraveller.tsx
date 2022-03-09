import React, { useEffect, useState, useMemo } from 'react';
import '../AdditionalTraveller.less';
import {
  Button,
  Divider,
  Dropdown,
  Image,
  Header,
  Icon,
  Modal,
  DropdownItemProps,
  DropdownProps,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import passortSVG from '../../../../assets/images/Group.svg';
import close from '../../../../assets/images/close.svg';
import add from '../../../../assets/images/add.svg';
import check from '../../../../assets/images/check.svg';
import { Traveller } from '../../../../interfaces/Traveller';
import { createTravellerSave } from '../../Contents/contentSlice';
import { BRBButton } from '../../../../components/BRBButton/BRBButton';
import { User } from '../../../../interfaces/user';
import { showNotification } from '../../../../components/BRBNotification/ShowNotification';
import Spacer from '../../../../components/Spacer';
import Metrics from '../../../../themes/Metrics';

export interface Props {
  isOpened: boolean;
  onChange: (open: boolean) => void;
  onClosePopup: () => void;
  onOpenAddNewTraveller: () => void;
}
export const TripAdditionalTraveller: React.VFC<Props> = ({
  isOpened,
  onChange,
  onClosePopup,
  onOpenAddNewTraveller,
}) => {
  const [open, setOpen] = React.useState(isOpened);
  const [isClicked, setClicked] = useState(false);
  const userProfile: User = useSelector((state: any) => state.dashboard.user);
  const tripConfiguration = useSelector((state: any) => state.content.tripConfiguration);
  const [selectedTravellers, setSelectedTravellers] = useState<string[]>([]);
  const dispatch = useDispatch();

  const travellers = useMemo(() => userProfile.travellers, [userProfile.travellers]);

  useEffect(() => {
    setSelectedTravellers(
      tripConfiguration.addedTravellers.map((x: Traveller) => `${x.lastName} ${x.firstName}`),
    );
  }, [tripConfiguration.addedTravellers]);

  const handleChange = (event: any, { value }: DropdownProps): void => {
    if (value) {
      setSelectedTravellers([...selectedTravellers, value.toString()]);
    }
  };

  const tickMark = () => {
    setClicked(true);
  };

  const parseDropDownProps = (data: Traveller[]): DropdownItemProps[] => data.map((x: Traveller, index: number) => parseByValue(x, index));

  const parseByValue = (item: Traveller, index: number): DropdownItemProps => {
    const userName = `${item.lastName} ${item.firstName}`;
    return {
      key: item.id,
      text: (
        <div key={item.id}>
          <Header as="h4">
            {userName}
          </Header>
          <div>
            {'Nationality: '}
            {item.nationality}
          </div>
        </div>
      ),
      value: userName,
    };
  };

  const remove = (id: string) => {
    console.log(`removing ${id}`);
    const tempVal = selectedTravellers.filter((item: string) => item !== id);
    return setSelectedTravellers([...tempVal]);
  };

  const onSaveTraveller = () => {
    if (selectedTravellers.length === 0) {
      showNotification.warning({
        title: 'Traveller',
        content: 'Please select at least one traveller',
      });
      return false;
    }

    const addedTravellers = [...travellers].filter(
      (item: Traveller, index: number) => !!selectedTravellers.find((s: string) => `${item.lastName} ${item.firstName}` === s),
    );

    dispatch(createTravellerSave(addedTravellers));
    onChange(false);
    return true;
  };

  const unselectedTravellers = travellers.filter((traveller: Traveller) => {
    let alreadyAdded = false;
    selectedTravellers.forEach((addedTravellerName) => {
      if (`${traveller.lastName} ${traveller.firstName}` === addedTravellerName) {
        alreadyAdded = true;
      }
    });
    return !alreadyAdded;
  });

  const nullTraveller: DropdownItemProps = {
    key: null,
    // disabled: true,
    text: 'Add Traveller',
    value: false,
    className: 'd-none',
  };

  return (
    <Modal
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
        <Header as="h2">Select Travellers </Header>
        <div className="additional-traveller-scroller">
          <p>
            Select your travellers from those already set-up in your account,
            or add someone new by entering their details as they appear on
            their passport.
          </p>

          {
            selectedTravellers
            && selectedTravellers.length > 0
            && selectedTravellers.map((item: string, index: number) => (
              <div className="dropdown_icon add-traveller-dropdown" key={item}>

                <h5>
                  {`Traveller ${index + 1} details`}
                </h5>

                <Image
                  floated="left"
                  src={check}
                  style={{ zindex: `${(isClicked === true ? '' : '1')}` }}
                  // className="dropdown-left"
                  className={`dropdown-left ${isClicked === true ? 'tick-mark' : ''}`}
                />

                <Dropdown
                  value={item}
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
            ))
          }

          {travellers.length > selectedTravellers.length && (
            <>
              <div className="dropdown_icon">

                <h5 aria-hidden>&nbsp;</h5>

                <Image floated="left" src={add} className="dropdown-left" />

                <Dropdown
                  fluid
                  value=""
                  selection
                  defaultValue={0}
                  options={[nullTraveller, ...parseDropDownProps([...unselectedTravellers])]}
                  placeholder="Add Traveller"
                  onChange={handleChange}
                  onClick={tickMark}
                />

              </div>

              <Divider horizontal>Or</Divider>
            </>
          )}

          <Button inverted fluid onClick={onOpenAddNewTraveller}>
            <Icon name="add" />
            {' '}
            Create new traveller
          </Button>

          <Spacer height={Metrics.mediumSpacer} />

          <BRBButton fluid onClick={onSaveTraveller}>
            Save
          </BRBButton>

        </div>
      </Modal.Content>
    </Modal>
  );
};
