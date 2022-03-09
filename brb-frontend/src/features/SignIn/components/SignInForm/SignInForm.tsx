import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Segment, Card, Button, Icon, Form, Message, Loader, Dimmer,
} from 'semantic-ui-react';
import { BRBButton } from '../../../../components/BRBButton/BRBButton';
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage';
import { SignUp } from '../../../../interfaces/signup';
import { signInErrorUpdate, signInFormUpdate } from '../../signinSlice';
import './SignInForm.less';
import { Spinner } from '../../../../components/BRBSpinner/BRBSpinner';
import BRBPinkText from '../../../../components/BRBPinkText';

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const signInError = useSelector((state: any) => state.signin.signInError);
  const [loggedInState, setLoggedInState] = useState<boolean>(false);

  const onSubmit = (form: SignUp) => {
    setLoggedInState(true);
    dispatch(signInFormUpdate(form));
  };

  const redirectToGoogleSignIn = () => {
    history.push('/social-signup/google');
  };

  useEffect(() => {
    setLoggedInState(false);
  }, [signInError]);

  useEffect(() => () => {
    dispatch(signInErrorUpdate(null));
  }, [dispatch]);

  return (
    <Segment>
      {loggedInState ? <Spinner /> : ''}
      <Card centered>
        <Card.Content className="social-buttons">
          <Card.Header>Sign In</Card.Header>
          <Button
            color="google plus"
            size="huge"
            onClick={redirectToGoogleSignIn}
          >
            <Icon name="google" size="large" />
            {' '}
            Sign in with Google
          </Button>
          {/* <Button className="facebook-button" size="huge" floated="right">
            <Icon name="facebook" size="large" />
          </Button> */}
        </Card.Content>
        <Card.Content>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <Form.Field error={!!errors.email}>
              <label>Email </label>
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
                autoComplete="current-password"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <ErrorMessage>Password field is required.</ErrorMessage>
              )}
            </Form.Field>

            {signInError && signInError.message && (
              <Message error>
                <strong>Error:</strong>
                {' '}
                {signInError.message || signInError}
              </Message>
            )}

            <BRBButton type="submit" className="signup-submit">
              Sign In
            </BRBButton>

            <div className="not-a-member">

              <div>
                <div className="forgot-link">
                  Forgot your password?
                  <Link to="/forgot-password">
                    <BRBPinkText>Reset</BRBPinkText>
                  </Link>
                </div>
                Not a member?
                {' '}
                <Link to="/email-signup">Sign up now</Link>
              </div>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </Segment>
  );
};
