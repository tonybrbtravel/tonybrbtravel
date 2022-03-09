import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Header } from 'semantic-ui-react';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import { SubHeading } from '../../components/SubHeading';
import { updateUserEmailPreferences } from './MyAccountSlice';
import whiteTick from '../../images/icons/white-tick.png';
import useApiQuery from '../../Hooks/ApiQuery';
import { getEmailPreference } from '../../Api/brbApi';
import BrbEndPoints from '../../Api/BrbEndPoints';
import { EmailPreferencesType } from '../../interfaces/emailPreferencesType';
import { saveUserEmailPreferences } from '../../Api/myAccountApi';
import { showNotification } from '../../components/BRBNotification/ShowNotification';
import { IUserAccountType } from '../../interfaces/myAccountType';
import { dashboardUserUpdate } from '../../features/dashboard/dashboardSlice';

export const MyAccountEmailPreferences = () => {
  const user: IUserAccountType = useSelector(
    (state: any) => state.dashboard.user,
  );

  const [emailData, setEmailPreferenceData] = useState<EmailPreferencesType[]>(
    [],
  );

  const dispatch = useDispatch();

  const [emailSelPref, setEmailSelPref] = useState<any>(user?.emailPreferences || []);

  const { data: emailPreference } = useApiQuery<any>(
    BrbEndPoints.getEmailPreference,
    { url: BrbEndPoints.getEmailPreference },
    getEmailPreference,
  );
  useEffect(() => {
    if (emailPreference && emailPreference.length > 0) {
      setEmailPreferenceData(emailPreference);
    }
  }, [emailPreference]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (form: any) => {
    const formData = form.email_pref;
    const emailData = formData ? formData.filter(Boolean) : [];
    saveUserEmailPreferences({
      url: BrbEndPoints.updateUserEmailPreferences,
      data: emailData,
    }).then((res) => {
      if (res) {
        console.log('resss', res);
        setEmailSelPref(res.emailPreferences);
        dispatch(dashboardUserUpdate(res));
        showNotification.success({
          title: 'Success!',
          content: 'Data updated successfully',
        });
      } else {
        showNotification.error({
          title: 'Failed!',
          content: 'Something went wrong! Please try again!',
        });
      }
    });
  };

  return (
    <>
      <div className="emailPreferences">
        <Header as="h2">
          {/* <Icon name='mail' /> */}
          <Header.Content>
            <SubHeading>
              <img
                src={whiteTick}
                className="emailpreferences-logo"
                alt="tick-icon"
              />
              &nbsp;
              <span style={{ color: '#E94560' }}>Email </span>
              Preferences
            </SubHeading>
          </Header.Content>
          <Header.Subheader className="tag-line">
            Receive weekly travel offers (drops) and travel tips (newsletter)
            tailored to you.
          </Header.Subheader>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {emailData.map((item: EmailPreferencesType, i) => {
            const fieldName = `email_pref[${i}]`;
            return (
              <div className="email-preference-check-box" key={fieldName}>
                <div className="email-preference-check-box ui checkbox">
                  <input
                    type="checkbox"
                    value={item.id}
                    id={fieldName}
                    {...register(`${fieldName}`)}
                    checked={emailSelPref && emailSelPref?.indexOf(item.id) >= 0}
                    onChange={(event: any) => {
                      const index = emailSelPref ? emailSelPref?.indexOf(item.id) : [];
                      const emailArr = emailSelPref && [...emailSelPref];
                      if (emailArr && index >= 0) {
                        emailArr?.splice(index, 1);
                        setEmailSelPref([...emailArr]);
                      } else {
                        emailArr?.push(item.id);
                        setEmailSelPref([...emailArr]);
                      }
                    }}
                    // checked={checkedVal!=="" ? checkedVal : false}
                  />
                  <label htmlFor={fieldName}>
                    {item.emailPreferenceName}
                    {' '}
                    (
                    {item.description}
                    )
                  </label>
                </div>
              </div>
            );
          })}
          <div
            className="save-preferences-cta-btn"
            style={{ textAlign: 'center' }}
          >
            <BRBButton>Save Email Preferences</BRBButton>
          </div>
        </Form>
      </div>
    </>
  );
};
