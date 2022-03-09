import { Segment, Card, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { validateUserEmailExistsorNot } from '../../Api/myAccountApi';
import BrbEndPoints from '../../Api/BrbEndPoints';
import { UpdateConfirmPassword } from '../../Api/api';
import { showNotification } from '../../components/BRBNotification/ShowNotification';
import { Spinner } from '../../components/BRBSpinner/BRBSpinner';

export const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [updatePassFormLoading, setUpdatePassFormLoading] = useState<boolean>(false);

  const onSubmit = (form: {
    email: string;
    code: string;
    password: string;
  }) => {
    setUpdatePassFormLoading(true);
    const { email } = form;
    const { code } = form;
    const { password } = form;
    if (email) {
      validateUserEmailExistsorNot({
        url: BrbEndPoints.userEmailVerify + email,
      }).then((res) => {
        setUpdatePassFormLoading(false);
        if (res === 'exists') {
          UpdateConfirmPassword(email, code, password)
            .then((data: any) => {
              const response = data ? data?.message : '';
              if (data?.message) {
                showNotification.error({
                  title: 'Error',
                  content: data?.message,
                });
              } else {
                showNotification.success({
                  title: 'Success',
                  content: 'Password updated sucessfully',
                });

                history.push('/signin');
              }
            })
            .catch((err) => {
              console.log('errrr', err);
            });
        } else {
          showNotification.error({
            title: 'Error',
            content: 'User Email not exists.',
          });
        }
      });
    }
  };

  return (
    <Segment>
      {updatePassFormLoading ? <Spinner /> : ''}
      <Card centered>
        <Card.Content className="social-buttons">
          <Card.Header>New Password</Card.Header>
        </Card.Content>
      </Card>
      <Card.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field error={errors.email ?? false}>
            <label>Email </label>
            <input
              placeholder="Email"
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
              <ErrorMessage>Please enter valid email address.</ErrorMessage>
            )}
          </Form.Field>
          <Form.Field error={errors.code ?? false}>
            <label>Verification Code </label>
            <input
              placeholder="Code"
              {...register('code', {
                required: true,
              })}
            />
            {errors.code?.type === 'required' && (
              <ErrorMessage>Code is required.</ErrorMessage>
            )}
          </Form.Field>
          <Form.Field error={errors.password ?? false}>
            <label>New Password </label>
            <input
              type="password"
              {...register('password', {
                required: true,
              })}
              placeholder="Password"
            />
            {errors.password?.type === 'required' && (
              <ErrorMessage>Password is required.</ErrorMessage>
            )}
          </Form.Field>
          <BRBButton type="submit" className="signup-submit">
            Submit
          </BRBButton>
        </Form>
      </Card.Content>
    </Segment>
  );
};
