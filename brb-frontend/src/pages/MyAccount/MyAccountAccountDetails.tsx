import {
  useEffect, useRef, useState, useMemo, useCallback,
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form, Grid, Header, Image,
} from 'semantic-ui-react';
import PhoneInput from 'react-phone-input-2';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from 'libphonenumber-js';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import { SubHeading } from '../../components/SubHeading';
import { updateUserAccountDetails } from './MyAccountSlice';
import tick from '../../images/icons/tick.png';
import { getBase64 } from '../../utils/helper';
import BrbEndPoints from '../../Api/BrbEndPoints';
import {
  saveUserProfileInfo,
  changePassword,
  updateUserProfileImage,
  getUserProfileImageDetails,
} from '../../Api/myAccountApi';
import {
  selectUser, dashboardUserUpdate,
  dashboardUserImageUpdate,
  fetchSSOUserDetails,
} from '../../features/dashboard/dashboardSlice';
import { IUserAccountType } from '../../interfaces/myAccountType';
import { mobileCountryCodes } from '../../mockData/mobileCodes';
import { showNotification } from '../../components/BRBNotification/ShowNotification';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import 'react-phone-input-2/lib/style.css';
import { SignOut } from '../../Api/api';
import useApiQuery from '../../Hooks/ApiQuery';

const includeProfilePhotoInEditForm = false;

export interface Props {
  onSetUserImage: (arg: string) => void;
}

export const MyAccountAccountDetails = ({ onSetUserImage }: Props) => {
  const user: IUserAccountType = useSelector(
    (state: any) => state.dashboard.user,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSSOUserDetails());
  });

  const ssoUser = useSelector((state: any) => state.dashboard.ssoUserName);

  const isSSOUser = ssoUser ? ssoUser.includes('Google') : false;

  const [userDetails, setUserDetails] = useState<IUserAccountType>(user);

  const [validNumber, setValidNumber] = useState<boolean>(true);
  const [phnoLength, setPhnoLength] = useState<any>();
  const [validatePhone, setValidatePhone] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    shouldFocusError: true,
    defaultValues: {
      userImage: '',
      preferredName: '',
      emailAddress: userDetails?.email,
      password: '',
      phoneNumber: userDetails?.phone,
      deliveryDetails: userDetails?.address,
      newPassword: '',
      confirmPassword: '',
      countryCode: '',
      addressLine2: userDetails.address2,
      city: userDetails.city,
      postcode: userDetails.postCode,
    },
  });

  useEffect(() => {
    setValue('preferredName', userDetails.preferredName);
    setValue('emailAddress', userDetails.email);
    setValue('phoneNumber', userDetails.phone);
    setValue('deliveryDetails', userDetails.address);
    setValue('addressLine2', userDetails.address2);
    setValue('city', userDetails?.city);
    setValue('postcode', userDetails.postCode);
  }, [userDetails]);

  const newPassword = watch('newPassword', '');

  const [showError, setError] = useState(false);
  const [showSelImage, setShowSelImage] = useState<string>();

  const fileChangedHandler = (event: any) => {
    const userselImage = event.target.files[0];
    console.log(userselImage);
    if (userselImage && userselImage !== '' && typeof userselImage !== 'undefined') {
      const fileType = event.target.files[0].type;
      if (
        fileType === 'image/jpeg'
        || fileType === 'image/jpg'
        || fileType === 'image/png'
      ) {
        setError(false);
        getBase64(userselImage).then((res: any) => setShowSelImage(res));
      } else {
        setError(true);
      }
    } else {
      setShowSelImage('');
    }
  };

  const handleChangePhone = (
    value: any,
    data: any,
    event: any,
    formattedValue: any,
  ) => {
    if (value === data.dialCode) {
      setValidatePhone(true);
    } else {
      const phoneValidation = isValidPhoneNumber(value, data.countryCode.toUpperCase());
      setValidatePhone(phoneValidation);
    }
    setValue('phoneNumber', formattedValue);
  };

  const queryClient = useQueryClient();
  const history = useHistory();

  const saveUserInfo = (form: any) => {
    if (validatePhone) {
      saveUserProfileInfo({
        url: `${BrbEndPoints.saveUserAccountDetails}update-user/${user.id}`,
        data: {
          id: user.id,
          preferredName: form.preferredName,
          phone: form.phoneNumber,
          address: form.deliveryDetails,
          address2: form.addressLine2,
          city: form.city,
          postCode: form.postcode,
        },
      }).then((response) => {
        if (response) {
          setUserDetails(response);
          dispatch(dashboardUserUpdate(response));
          showNotification.success({
            title: 'Success',
            content: 'User Details Updated Successfully!',
          });
        }
      });
    }
  };

  const onSubmit = (form: any) => {
    // return false;
    if (form.userImage.length && !showError) {
      const userImage = form.userImage[0];
      const formData = new FormData();
      formData.append('file', userImage);
      updateUserProfileImage({
        url: BrbEndPoints.saveUserProfileImage,
        data: formData,
      }).then((res: string) => {
        console.log(res);
        if (res) {
          queryClient.invalidateQueries(['profileImage', user.email]);
          queryClient.invalidateQueries('userRewardsPoints');
          queryClient.invalidateQueries('rewardsHistory');
          setShowSelImage('');
          dispatch(dashboardUserImageUpdate(res));
          // showNotification.success({
          //   title: "Success",
          //   content: "Image Details Updated Successfully!",
          // });
        } else {
          showNotification.error({
            title: 'Error',
            content: 'Something went wrong! Please try again!',
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    if (form.password.length > 0) {
      const oldPassword = form.password;
      const newPassword = form.confirmPassword;
      changePassword(oldPassword, newPassword).then((data: any) => {
        if (!data) {
          showNotification.error({
            title: 'Error',
            content: 'Password update failed! ',
          });
        } else {
          saveUserInfo(form);
          SignOut().then((res) => {
            history.push('/signin');
          });
        }
      });
    } else {
      saveUserInfo(form);
    }
  };

  const { data: userProfileImgDetails } = useApiQuery(
    ['profileImage', user.email],
    { url: BrbEndPoints.getUserProfileImage },
    getUserProfileImageDetails,
  );

  return (
    <div className="myAccountDetails">

      <Header>
        <SubHeading>
          <img className="mydetails-logo" src={tick} alt="tick-icon" />
          {' '}
          <span style={{ color: '#e94560' }}>Account</span>
          {' '}
          Details
        </SubHeading>
        <Header.Subheader>
          Provide your personal details, how we can reach you and where you’d
          like your reveal postcards to be sent.
        </Header.Subheader>
      </Header>

      <Grid.Row>
        <Grid.Column>
          <Form onSubmit={handleSubmit(onSubmit)}>

            {includeProfilePhotoInEditForm && (
              <>
                <div className="upload-file-column">
                  <div className="input-type-file">
                    {userProfileImgDetails && (
                      <div className="input-file-preview">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img src={userProfileImgDetails} className="preview-img" alt="Your current profile photo" />
                      </div>
                    )}
                    {showSelImage && (
                      <div className="input-file-preview">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img src={showSelImage} className="preview-img" alt="New profile photo" />
                      </div>
                    )}
                    <div className="input-file-preview">
                      <span>+</span>
                      <span>Upload</span>
                    </div>
                    <input
                      type="file"
                      {...register('userImage')}
                      onChange={fileChangedHandler}
                    />
                  </div>

                  <div className="text-center">
                    {showError && (
                      <ErrorMessage>
                        File type not supported. You must select an image file.
                      </ErrorMessage>
                    )}
                    <div className="header">{user.preferredName}</div>
                    <div className="meta">
                      {user?.city && (
                        <>
                          <i
                            aria-hidden="true"
                            className="map marker alternate icon"
                          />
                          <span className="date">{user?.city}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            <Form.Group widths="equal">
              <Form.Field error={!!errors.preferredName}>
                <label>Preferred Name</label>
                <div className="ui fluid input">
                  <input
                    {...register('preferredName', {
                      required: true,
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: 'Cannot contain special characters',
                      },
                      validate: (value: string) => value.length <= 32,
                    })}
                    placeholder="Preferred name"
                  />
                </div>
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

              <Form.Field error={!!errors.emailAddress}>
                <label>Email Address</label>
                <div className="ui fluid input">
                  <input
                    {...register('emailAddress', { required: true })}
                    placeholder="Email Address"
                    readOnly
                  />
                </div>
                {errors.emailAddress && (
                  <ErrorMessage>Your Email Address is required</ErrorMessage>
                )}
              </Form.Field>
            </Form.Group>
            {!isSSOUser ? (
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  autoComplete="current-password"
                  type="password"
                  label="Old Password"
                  placeholder="Password"
                  {...register('password', {
                    validate: {
                      required: (value) => {
                        if (!value && getValues('confirmPassword')) return 'This field is required';
                        return true;
                      },
                    },
                  })}
                  error={
                    errors.password && (
                      <ErrorMessage>This field is required</ErrorMessage>
                    )
                  }
                />
                <Form.Input
                  fluid
                  autoComplete="new-password"
                  type="password"
                  label="New Password"
                  placeholder="New password"
                  {...register('newPassword', {
                    validate: {
                      required: (value) => {
                        if (!value && getValues('password') && getValues('newPassword')) return 'This field is required';
                        return true;
                      },
                    },
                  })}
                  error={
                    errors.newPassword && (
                      <ErrorMessage>This field is required</ErrorMessage>
                    )
                  }
                />
              </Form.Group>
            ) : (
              <></>
            )}

            <Form.Group widths="equal">
              {!isSSOUser ? (
                <Form.Input
                  fluid
                  autoComplete="new-password"
                  type="password"
                  label="Confirm new password"
                  placeholder="Confirm new password"
                  {...register('confirmPassword', {
                    validate: (value) => value === newPassword || 'The new passwords do not match',
                  })}
                  error={
                    errors.confirmPassword && (
                      <ErrorMessage>
                        {errors.confirmPassword.message}
                      </ErrorMessage>
                    )
                  }
                />
              ) : (
                <></>
              )}
              <Form.Field error={!!errors.phoneNumber}>
                <label>Phone Number (Emergency Only)</label>
                <div className="ui fluid input">
                  <PhoneInput
                    country="gb"
                    disableSearchIcon
                    onChange={handleChangePhone}
                    inputClass="ui fluid input"
                    placeholder="Phone Number"
                    value={userDetails?.phone}
                    countryCodeEditable={false}
                  />

                  <input type="hidden" {...register('phoneNumber')} />
                </div>
                {!validatePhone && (<ErrorMessage>Invalid Number</ErrorMessage>)}
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <label>Address Line 1</label>
                <div className="ui fluid input">
                  <input
                    type="text"
                    {...register('deliveryDetails', { required: true })}
                    placeholder="Address Line 1"
                  />
                </div>
                {errors.deliveryDetails && (
                  <ErrorMessage>Address Line 1 is required</ErrorMessage>
                )}
              </Form.Field>
              <Form.Field>
                <label>Address Line 2 (optional)</label>
                <div className="ui fluid input">
                  <input
                    type="text"
                    {...register('addressLine2')}
                    placeholder="Address Line 2"
                  />
                </div>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>City</label>
                <div className="ui fluid input">
                  <input type="text" {...register('city', { required: true })} placeholder="City" />
                </div>
                {errors.city && (
                  <ErrorMessage>City is required</ErrorMessage>
                )}
              </Form.Field>
              <Form.Field>
                <label>Postcode</label>
                <div className="ui fluid input">
                  <input
                    type="text"
                    {...register('postcode', { required: true })}
                    placeholder="Postcode"
                  />
                </div>
                {errors.postcode && (
                  <ErrorMessage>Postcode is required</ErrorMessage>
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group className="form-cta">
              <BRBButton>Update</BRBButton>
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </div>
  );
};
