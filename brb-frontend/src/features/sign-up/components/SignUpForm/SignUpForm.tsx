import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Segment,
  Card,
  Button,
  Icon,
  Checkbox,
  Form,
  Message,
} from 'semantic-ui-react';
import { BRBButton } from '../../../../components/BRBButton/BRBButton';
import { signUpErrorUpdate, userExists } from '../../signupSlice';
import { SignUp } from '../../../../interfaces/signup';
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage';
import MembershipConditions from '../../../t-and-c/MembershipConditions';
import PrivacyPolicy from '../../../t-and-c/PrivacyPolicy';
import { Spinner } from '../../../../components/BRBSpinner/BRBSpinner';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const history = useHistory();
  const signUpError = useSelector((state: any) => state.signup.signUpError);
  const dispatch = useDispatch();
  const [modalMembershipConditions, setModalMembershipConditions] = useState<boolean>(false);
  const [modalPrivacyPolicy, setModalPrivacyPolicy] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: SignUp) => {
    setLoading(true);
    dispatch(userExists(data));
  };

  const redirectToGoogleSignUp = () => {
    history.push('/social-signup/google');
  };

  const redirectToFacebookignUp = () => {
    history.push('/social-signup/facebook');
  };

  useEffect(() => {
    if (signUpError) setLoading(false);
  }, [signUpError]);

  useEffect(() => () => {
    dispatch(signUpErrorUpdate(null));
  }, [dispatch]);

  return (
    <Segment>
      {loading ? <Spinner /> : ''}
      <Card centered>
        <Card.Content className="social-buttons">
          <Card.Header>Sign Up</Card.Header>
          <Button
            color="google plus"
            size="huge"
            onClick={redirectToGoogleSignUp}
          >
            <Icon name="google" size="large" />
            {' '}
            Sign up with Google
          </Button>
          {/* <Button
            className="facebook-button"
            size="huge"
            floated="right"
            onClick={redirectToFacebookignUp}
          >
            <Icon name="facebook" size="large" />
          </Button> */}
        </Card.Content>
        <Card.Content>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field error={!!errors.preferredName}>
              <label>Your Preferred Name</label>
              <input
                {...register('preferredName', {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: 'Cannot contain special characters',
                  },
                  validate: (value: string) => value.length <= 32,
                })}
              />
              {errors.preferredName?.type === 'required' && (
                <ErrorMessage>Your Preferred Name is required.</ErrorMessage>
              )}
              {errors.preferredName?.type === 'validate' && (
                <ErrorMessage>Your Preferred Name should be less than 32 characters.</ErrorMessage>
              )}
              {errors.preferredName?.type === 'pattern' && (
                <ErrorMessage>Cannot contain special characters.</ErrorMessage>
              )}
            </Form.Field>
            <Form.Field error={!!errors.email}>
              <label>Email</label>
              <input
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
              />
              {errors.email?.type === 'required' && (
                <ErrorMessage>Email is required.</ErrorMessage>
              )}
              {errors.email?.type === 'pattern' && (
                <ErrorMessage>
                  Entered value does not match email format.
                </ErrorMessage>
              )}
            </Form.Field>
            <Form.Field error={!!errors.password}>
              <label>Password</label>
              <input
                type="password"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <ErrorMessage>Password is required.</ErrorMessage>
              )}
            </Form.Field>
            <Form.Field error={!!errors.termsAndConditions}>
              <div className="terms-conditions-container">
                <Checkbox
                  value={1}
                  label=""
                  {...register('termsAndConditions', { required: true })}
                />
                <div className="terms-conditions">
                  <div>
                    By creating an account, I accept the
                    <span>
                      {' '}
                      <a onClick={() => setModalMembershipConditions(true)}>
                        Membership Conditions
                      </a>
                    </span>
                    {' '}
                    and
                    {' '}
                    <span>
                      <a onClick={() => setModalPrivacyPolicy(true)}>
                        Privacy Policy
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              {errors.termsAndConditions && (
                <ErrorMessage>
                  Please accept Membership Conditions & Privacy Policy.
                </ErrorMessage>
              )}
            </Form.Field>
            {signUpError && signUpError && (
              <Message error>
                <strong>Error:</strong>
                {' '}
                {signUpError.message || signUpError}
              </Message>
            )}
            <BRBButton type="submit" className="signup-submit">
              Sign Up
            </BRBButton>
            <div className="not-a-member">
              <div>Already a member?</div>
              <Link to="/signin">Sign-in</Link>
            </div>
          </Form>
        </Card.Content>
      </Card>

      {modalMembershipConditions && (
        <MembershipConditions
          isOpened={modalMembershipConditions}
          onClosePopup={() => setModalMembershipConditions(false)}
        />
      )}

      {modalPrivacyPolicy && (
        <PrivacyPolicy
          isOpened={modalPrivacyPolicy}
          onClosePopup={() => setModalPrivacyPolicy(false)}
        />
      )}

    </Segment>
  );
};
