import { Image } from 'semantic-ui-react';
import logo from '../../../../assets/images/logo.svg';
import './TripTypesHeader.less';

export const TripHeader = () => (
  <div>
    <Image src={logo} centered />
  </div>
);
