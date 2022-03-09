import { Image } from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';

export const TravelProfileHeader = () => (
  <div style={{ textAlign: 'left' }}>
    <Image src={logo} centered className="logo" />
  </div>
);
