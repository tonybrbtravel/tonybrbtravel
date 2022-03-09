import React from 'react'
import { Link } from 'gatsby'

import {
  Wrapper,
  InnerContainer,
  BtnLink,
  Grid,
  Block,
  Legal
} from './styles'

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Wrapper>
      <InnerContainer>
        <Grid>
          <Block>
            <h5>Customers</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about/">About us</Link></li>
              <li><Link to="/#how-it-works">How it works</Link></li>
              <li><Link to="/destinations/">Destinations</Link></li>
              <li><Link to="/#reviews">Reviews</Link></li>
              <li><Link to="/journal/">Journal</Link></li>
              <li><Link to="/pricing/">Pricing</Link></li>
              <li><Link to="/gifting/">Gifting</Link></li>
              <li><Link to="/employee-benefits/">Employee benefits</Link></li>
            </ul>
          </Block>
          <Block>
            <h5>Company</h5>
            <p>
              FAO: BeRightBack<br />
              Founders Factory<br />
              Northcliffe House<br />
              Young St.<br />
              London, W8 5EH
            </p>
            <p>
              <a href="mailto:hello@berightback.travel">Email us</a>
            </p>
            <p>
              <BtnLink to="/about/">We're hiring!</BtnLink>
            </p>
          </Block>
          <Block>
            <h5>Further information</h5>
            <ul>
              <li>
                <a
                  href="https://app1.berightback.travel/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://app1.berightback.travel/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li><Link to="/students/">Students</Link></li>
              <li><a href="https://intercom.help/brb/">FAQs</a></li>
            </ul>
          </Block>
          <Block>
            <h5>Follow Us</h5>
            <ul>
              <li>
                <a
                  href="https://instagram.com/brb.travel/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/travelbrb/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </Block>
        </Grid>
        <Legal>Site content &copy; BeRightBack {year}</Legal>
      </InnerContainer>
    </Wrapper>
  );
}

export default Footer
