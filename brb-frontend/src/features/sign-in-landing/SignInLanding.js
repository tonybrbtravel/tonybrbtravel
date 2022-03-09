import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom';
import Amplify, { Auth, Hub } from 'aws-amplify';

import { FacebookCircle } from '@styled-icons/boxicons-logos/FacebookCircle';
import GoogleButton from 'react-google-button';
import Colors from '../../themes/Colors';
import fbicon from '../../app/icon_facebook.png';
import emailIcon from '../../app/email_icon.png';
import brbLogo from '../../app/brb_logo.svg';

import config from './config';
import { H1 } from '../../components/H1';
import Spacer from '../../components/Spacer';
import Metrics from '../../themes/Metrics';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media screen and (min-width: 720px) {
    flex-direction: row;
    height: 100vh;
  }
`;

const FormWrapper = styled.div`
  padding: 30px 20px 0px 20px;
  width: 90%;

  @media screen and (min-width: 800px) {
    padding: 30px 60px;
    width: 50%;
    margin: auto;
  }
`;

const H1c = styled(H1)`
  text-align: center;
  padding: 0;
  font-size: 24px;
  letter-spacing: -0.86px;
  margin-bottom: 16px;

  @media screen and (min-width: 640px) {
    font-size: 32px;
  }
`;

const LinkS = styled(Link)`
  color: ${Colors.blue};
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909090;
  margin-bottom: 30px;

  a {
    color: ${Colors.red};
  }
`;

const BtnFacebook = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  background: #3b5998;
  color: white;
  border: 0px transparent;
  text-align: center;
  margin: 5px;
  display: inline-block;
  font-size: 32px;
  background-image: url(${fbicon});
  background-repeat: no-repeat;
  background-position: 10px center;
`;

const BtnGoogle = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  background: #3b5998;
  color: white;
  border: 0px transparent;
  text-align: center;
  margin: 5px;
  display: inline-block;
  font-size: 32px;
  background-image: url(${fbicon});
  background-repeat: no-repeat;
  background-position: 10px center;
`;

const BtnEmailSignUp = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  background: #000;
  color: white;
  border: 0px transparent;
  text-align: center;
  margin: 5px;
  display: inline-block;
  font-size: 32px;
  background-image: url(${emailIcon});
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 30px;
`;

export const SignInLanding = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const checkUser = async () => {
    const user = await Auth.currentUserInfo();
    if (user == null) {
      alert('You are not logged in');
    } else {
      alert(`You are logged in as: ${user.attributes.name}`);
    }
  };

  const signOut = () => {
    Auth.signOut().then((data) => alert(`signed out: ${data}`));
  };

  const redirectToEmailSignUp = () => {
    history.push('/email-signup');
  };

  const redirectToSocialSignUp = () => {
    history.push('/social-signup/facebook');
  };

  const redirectToGoogleSignUp = () => {
    history.push('/social-signup/google');
  };

  const TandC = (
    <Label>
      <span>
        By creating an account, you accept our
        {' '}
        <Link to="/terms-and-conditions" target="_blank">
          terms and conditions
        </Link>
        {' '}
        and our
        {' '}
        <Link to="/privacy-policy" target="_blank">
          privacy policy
        </Link>
      </span>
    </Label>
  );

  return (
    <FlexWrapper>
      <FormWrapper>
        <H1c>Sign Up</H1c>
        <BtnFacebook onClick={redirectToSocialSignUp}>
          Continue with Facebook
          {' '}
        </BtnFacebook>
        <GoogleButton onClick={redirectToGoogleSignUp}>
          Continue with Google
          {' '}
        </GoogleButton>
        <BtnEmailSignUp onClick={redirectToEmailSignUp}>
          Sign up with your email address
        </BtnEmailSignUp>
        TO REMOVE
        {' '}
        <button onClick={checkUser}>Check log in status</button>
        <button onClick={signOut}>Sign Out</button>
        <Spacer height={Metrics.tinySpacer} />
        {TandC}
        <p
          style={{
            margin: '20px 0',
            fontSize: '18px',
            textAlign: 'center',
          }}
        >
          Already have an account?
          {' '}
          <LinkS to="/signin">Sign in</LinkS>
        </p>
      </FormWrapper>
    </FlexWrapper>
  );
};
