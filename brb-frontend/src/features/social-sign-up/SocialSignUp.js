import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';

import Colors from '../../themes/Colors';
import fbicon from '../../app/icon_facebook.png';
import emailIcon from '../../app/email_icon.png';

import {
  socialSignUpFormUpdate,
  cognitoSuccessUpdate,
} from './socialSignupSlice';
import { signInAuthenticatedUpdate } from '../SignIn/signinSlice';

import { H1 } from '../../components/H1';

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

export const SocialSignUp = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const checkUser = async () => {
    const user = await Auth.currentUserInfo();
    if (user == null) {
      history.push('/signin');
      // alert("You are not logged in");
    } else {
      // alert("You are logged in as: " + user.attributes.name);
    }
  };

  const { provider } = useParams();

  const signOut = () => {
    console.log('signout functioon call');
    Auth.signOut().then((data) => {
      console.log('signout response call');
    });

    localStorage.clear();
    sessionStorage.clear();
    history.push('/signin');
  };

  const createUser = async () => {
    console.log("Create User");
    const user = await Auth.currentUserInfo();
    const userForm = {};
    userForm.email = user.attributes.email;

    userForm.preferredName = user.attributes.name;

    dispatch(socialSignUpFormUpdate(userForm));
    dispatch(cognitoSuccessUpdate(true));
  };

  const redirectToEmailSignUp = () => {
    history.push('/email-signup');
  };

  useEffect(() => {
    checkUser();
    Hub.listen('auth', (data) => {
      const { payload } = data;
      console.log('payload data', payload);
      if (payload.event === 'signIn') {
        /* flag as authenticated */
        console.log("Signed In event received from Cognito");
        dispatch(signInAuthenticatedUpdate(true));
        createUser();
      }
      if (payload.event === 'signUp') {
        /* flag as authenticated */
        console.log("Signed Up event received from Cognito");
        dispatch(signInAuthenticatedUpdate(true));
        createUser();
      }

      if (payload.event === 'signOut') {
        signOut();
      }
      if (payload.event === 'signIn_failure') {
        console.log("Sign-in or Sign-up failure");
      }
    });
    if (provider) {
      if (provider === 'facebook') {
        Auth.federatedSignIn({ provider: 'Facebook' });
      } else {
        Auth.federatedSignIn({ provider: 'Google' });
      }
    }
  });

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

  return <FlexWrapper />;
};
