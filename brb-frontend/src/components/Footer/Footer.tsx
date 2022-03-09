import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';
import atol from '../../assets/images/atol-protected-square-with-padding.png';
import './Footer.less';

export const Footer = () => (
  <footer>
    <div className="ui container">
      <div className="footer-container">
        <ul>
          <li>
            <h4>Customers</h4>
          </li>
          <li>
            <a href={`${process.env.REACT_APP_MARKETING_WEBSITE}`} target="_blank" rel="noreferrer">Home</a>
          </li>
          <li>
            <a href={`${process.env.REACT_APP_MARKETING_WEBSITE}about/`} target="_blank" rel="noreferrer">About Us</a>
          </li>
          <li>
            <a href={`${process.env.REACT_APP_MARKETING_WEBSITE}#how-it-works`} target="_blank" rel="noreferrer">How it works</a>
          </li>
          <li>
            <a href={`${process.env.REACT_APP_MARKETING_WEBSITE}destinations/`} target="_blank" rel="noreferrer">Destinations</a>
          </li>
          <li>
            <a href={`${process.env.REACT_APP_MARKETING_WEBSITE}#reviews`} target="_blank" rel="noreferrer">Reviews</a>
          </li>
          <li>
            <a href={`${process.env.REACT_APP_MARKETING_WEBSITE}journal/`} target="_blank" rel="noreferrer">Journal</a>
          </li>
          <li>
            <a href={`${process.env.REACT_APP_MARKETING_WEBSITE}pricing/`} target="_blank" rel="noreferrer">Pricing</a>
          </li>
          {/* <li>
            <a href="">Gifting</a>
          </li> */}
        </ul>
        <ul className="black-text">
          <li>
            <h4>Company</h4>
          </li>
          <li>
            FAO: BeRightBack
            <br />
            Founders Factory
            <br />
            Northcliffe House
            <br />
            Young Street
            <br />
            London, W8 5EH
          </li>
          <li className="buffer-space">
            <a href="mailto:hello@berightback.travel">Email Us</a>
          </li>
          <li>
            <button type="button" className="outline-btn" onClick={() => window.open(`${process.env.REACT_APP_MARKETING_WEBSITE}about/`, '_blank')}>We’re Hiring!</button>
          </li>
        </ul>
        <ul>
          <li>
            <h4>Further Information</h4>
          </li>
          <li>
            <Link to="/membership-conditions" target="_blank">Membership conditions</Link>
          </li>
          <li>
            <Link to="/terms-and-conditions" target="_blank">Booking terms &amp; conditions</Link>
          </li>
          <li>
            <Link to="/privacy-policy" target="_blank">Privacy policy</Link>
          </li>
          <li>
            <a href={`${process.env.REACT_APP_MARKETING_WEBSITE}students/`} target="_blank" rel="noreferrer">Students</a>
          </li>
          <li>
            <a href="https://intercom.help/brb/en/">FAQs</a>
          </li>
          <li className="buffer-space">
            <div>
              <Image className="footer-image" src={atol} />
            </div>
          </li>
        </ul>

        <ul>
          <li>
            <h4>Follow Us</h4>
          </li>
          <li>
            <a href="https://instagram.com/brb.travel/">Instagram</a>
          </li>
          {/* <li>
              <a href="https://facebook.com/travelbrb/">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com/travelbrb/">Twitter</a>
            </li> */}
          <li className="buffer-space">
            <div>
              <Image src={logo} className="footer-logo footer-image" />
            </div>
          </li>
        </ul>
      </div>
      <p className="footer-site-content">Site content © BeRightBack 2020</p>
    </div>
  </footer>
);
