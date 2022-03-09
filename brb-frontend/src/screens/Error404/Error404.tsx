import { Link } from 'react-router-dom';

import TextPanel from '../_panels/TextPanel';

import logo from '../../images/logo.svg';
import Colors from '../../themes/Colors';

const Error404 = () => (
  <TextPanel textBackground={Colors.brbOffwhite} foregroundColor={Colors.brbBlue}>
    <img src={logo} alt="BeRightBack logo" />
    <h1>
      Error&nbsp;404:
      {' '}
      <span className="accent">Not&nbsp;Found</span>
    </h1>
    <p>
      Something’s gone wrong, and the page you’re looking for could not be found.
    </p>
    <p>
      <Link to="/">
        &larr; Go right back to Be Right Back.
      </Link>
    </p>
  </TextPanel>
);

export default Error404;
