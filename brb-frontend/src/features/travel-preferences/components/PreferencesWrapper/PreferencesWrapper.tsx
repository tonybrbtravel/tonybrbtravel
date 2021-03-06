import { Header, Modal, Image } from 'semantic-ui-react';
import clsx from 'clsx';
import close from '../../../../assets/images/close.svg';
import destination from '../../../../assets/images/destination.svg';
import airportsSVG from '../../../../assets/images/airport.svg';
import destinationsSVG from '../../../../assets/images/destinations.svg';
import excludedSVG from '../../../../assets/images/modal-exlude.png';
import './PreferencesWrapper.less';
import { DisplayType } from '../../../ExclusionList/Destinations';
import { UserDestinations } from '../../../ExclusionList/components/UserDestinations/UserDestinations';
import { UserTravelPreferences } from '../UserTravelPreferences/UserTravelPreferences';
import { UserAirportPreferences } from '../../../AirportPreferences/components/UserAirportPreferences/UserAirportPreferences';

export interface HeaderData {
  image?: string;
  header?: string;
  highlightedHeader?: string;
  subHeader?: string;
}

export interface ParamTypes {
  page?: string | undefined;
}

export const PreferencesWrapper = ({ locationName, onClosePopup, open: propsOpen }: any) => {
  let headerData: HeaderData = {};

  const closePopup = () => {
    onClosePopup();
  };

  switch (locationName) {
    case 'types':
      headerData = {
        image: destination,
        header: 'Preferred Trip Type',
        subHeader:
          'Tell us what you love most about travelling so we can get your future trips sorted!',
      };
      break;
    case 'airports':
      headerData = {
        image: airportsSVG,
        header: 'Preferred Airports',
        highlightedHeader: 'What UK airports do you prefer flying from?',
        subHeader:
          'Your adventure has to start somewhere! Select at least 2 airports, but remember that the more airports you select, the wider the variety of trips available.',
      };
      break;
    case 'destinations':
      headerData = {
        image: destinationsSVG,
        header: 'Select top 10 destinations',
        subHeader:
          'Nominate the 10 European cities that excite you most so that our team can prioritise them in your bucket list.',
      };
      break;
    case 'excludedDestinations':
      headerData = {
        image: excludedSVG,
        header: 'Your Travel Exclusions',
        subHeader: 'Select your ???no-go??? list of cities. You can add up to 20 destinations.',
      };
      break;
    default:
      break;
  }

  return (
    <Modal
      closeOnDimmerClick={false}
      size="small"
      className="select-activities modal-bg"
      centered
      open={propsOpen}
    >

      <Modal.Header>
        <Header as="h2">
          <Image src={headerData.image} />

          <Header.Content>{headerData.header}</Header.Content>
          <Image
            className="close-modal"
            floated="right"
            size="mini"
            onClick={onClosePopup}
            src={close}
          />
        </Header>
      </Modal.Header>

      <Modal.Content scrolling className={clsx(locationName)}>

        <p>{headerData.subHeader}</p>

        {headerData.highlightedHeader && (
          <Header as="h3">{headerData.highlightedHeader}</Header>
        )}

        {locationName === 'types' && (
          <UserTravelPreferences from pageName="travelProfile" onContinue={closePopup} />
        )}

        {locationName === 'airports' && (
          <UserAirportPreferences from onContinue={closePopup} />
        )}

        {locationName === 'destinations' && (
          <UserDestinations
            onContinue={closePopup}
            isModalPopup
            displayTypeProp={DisplayType.Grid}
          />
        )}

        {locationName === 'excludedDestinations' && (
          <UserDestinations
            onContinue={closePopup}
            isModalPopup
            displayTypeProp={DisplayType.List}
            pageName="excludedDestinations"
          />
        )}

      </Modal.Content>

    </Modal>
  );
};
