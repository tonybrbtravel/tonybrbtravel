import { Segment, Card, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { validateUserEmailExistsorNot } from '../../Api/myAccountApi';
import BrbEndPoints from '../../Api/BrbEndPoints';
import { ForgotPasswordVerifyCode } from '../../Api/api';
import { showNotification } from '../../components/BRBNotification/ShowNotification';
import { Spinner } from '../../components/BRBSpinner/BRBSpinner';
import Spacer from '../../components/Spacer';
import Metrics from '../../themes/Metrics';

export const ForgotPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();
  const [forgotFormLoading, setForgotFormLoading] = useState<boolean>(false);

  const onSubmit = (form: { email: string }) => {
    const { email } = form;
    setForgotFormLoading(true);
    if (email) {
      ForgotPasswordVerifyCode(email)
        .then(() => {
          setForgotFormLoading(false);
          showNotification.success({
            title: 'Password reset',
            content: 'If the email address you provided matched a user record you’ll receive a reset code shortly.',
          });
          history.push('/update-password');
        });
    }
  };

  return (
    <Segment>
      {forgotFormLoading ? <Spinner /> : ''}
      <Card centered>
        <Card.Content className="social-buttons">
          <Card.Header>Password Reset</Card.Header>
          <Card.Description>
            Enter the email address that you used to register to BRB. We’ll send
            you an email with a link to reset your password.
          </Card.Description>
          <Spacer height={Metrics.smallSpacer} />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field error={errors.email ?? false}>
              <label>Email</label>
              <input
                placeholder="Email"
                {...register(
                  'email',
                  {
                    required: true,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format',
                    },
                  },
                )}
              />
              {errors.email?.type === 'required' && (
                <ErrorMessage>Email is required.</ErrorMessage>
              )}
              {errors.email?.type === 'pattern' && (
                <ErrorMessage>
                  Please enter a valid email address.
                </ErrorMessage>
              )}
            </Form.Field>
            <BRBButton type="submit" className="signup-submit">Submit</BRBButton>
            <div className="not-a-member">
              <div>Already a member?</div>
              <Link to="/signin">Sign-in</Link>
            </div>
          </Form>
        </Card.Content>
      </Card>

    </Segment>
  );
};
