import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Icon,
  Card,
  Grid,
  Table,
  Header,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import { IUserAccountType, subscriptionStatus } from '../../interfaces/myAccountType';
import BrbEndPoints from '../../Api/BrbEndPoints';
import { updateUserProfileImage, getUserProfileImageDetails } from '../../Api/myAccountApi';
import useApiQuery from '../../Hooks/ApiQuery';
import { showNotification } from '../../components/BRBNotification/ShowNotification';
import BRBPinkText from '../../components/BRBPinkText';
import { dashboardUserImageUpdate } from '../../features/dashboard/dashboardSlice';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import useSubscriptionQuery from '../../Hooks/useSubscriptionQuery';
import useRewardsPointsQuery from '../../Hooks/useRewardsPointsQuery';
import { getPauseCancelUrl, getUpdatePlanUrl } from '../../utils/externalUrls';

export interface Props {
  userProfileUpdatedImage?: string | null | undefined;
}

export const MyAccountSubscription = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const user: IUserAccountType = useSelector(
    (state: any) => state.dashboard.user,
  );

  const { data: subscriptionDetails } = useSubscriptionQuery();

  const queryClient = useQueryClient();

  const { data: userProfileImgDetails } = useApiQuery<string>(
    ['profileImage', user.email],
    { url: BrbEndPoints.getUserProfileImage },
    getUserProfileImageDetails,
  );

  const { data: rewardPoints } = useRewardsPointsQuery();

  const onUpdatePlanClick = () => {
    const url = getUpdatePlanUrl({ name: user.preferredName, emailAddress: user.email });
    window.open(url, '_blank');
  };

  const [showError, setError] = useState(false);

  const handleProfileImage = (event: any) => {
    const fileData = event.target.files[0];
    const fileType = event.target.files[0].type;

    if (
      fileType === 'image/jpeg'
      || fileType === 'image/jpg'
      || fileType === 'image/png'
    ) {
      setError(false);
      const formData = new FormData();
      formData.append('file', fileData);

      updateUserProfileImage({
        url: BrbEndPoints.saveUserProfileImage,
        data: formData,
      }).then((res: string) => {
        queryClient.invalidateQueries(['profileImage', user.email]);
        queryClient.invalidateQueries('userRewardsPoints');
        queryClient.invalidateQueries('rewardsHistory');
        // setProfileImage(res);
        dispatch(dashboardUserImageUpdate(res));
        showNotification.success({
          title: 'Success',
          content: 'Image details updated sucessfully!',
        });
      });
    } else {
      setError(true);
    }
  };

  const subStatus = (item?: string) => {
    switch (item) {
      case 'SUBSCRIBED':
        return 'Subscribed';
      case 'PAUSED':
        return 'Paused';
      case 'NOT_SUBSCRIBED':
      default:
        return 'Not Subscribed';
    }
  };

  return (
    <div className="mySubscription">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              <Header.Content className="subscription">
                My
                {' '}
                <strong>Subscription</strong>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row reversed="mobile">
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            className="mySubscriptionTable"
          >
            <div className="myAccountUserInfo">
              <Card>
                <Card.Content>
                  <Table className="user-info">
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Status:</Table.Cell>
                        <Table.Cell>
                          <strong>
                            {subStatus(subscriptionDetails?.status)}
                          </strong>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Travellers:</Table.Cell>
                        <Table.Cell>
                          {!subscriptionDetails?.travellers && 'Not Set'}
                          {subscriptionDetails?.travellers === 1 && '1 Person'}
                          {!!subscriptionDetails?.travellers && subscriptionDetails?.travellers > 1 && `${subscriptionDetails.travellers} People`}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Night / Days:</Table.Cell>
                        <Table.Cell>
                          {subscriptionDetails?.nights
                            ? `${subscriptionDetails?.nights} Nights`
                            : 'Not Set'}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Cost:</Table.Cell>
                        <Table.Cell>
                          {`£${subscriptionDetails ? ((subscriptionDetails?.amount / 100).toFixed(2)) : 0.00} / month`}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Points earned:</Table.Cell>
                        <Table.Cell>
                          <strong>
                            {`${rewardPoints ?? 0} points`}
                          </strong>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>
            </div>
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            className="mySubscriptionID"
          >
            <Card className="subscription">
              <Card.Content>

                <div className="profile-img">
                  <div className="input-type-file">

                    <Icon className="profile-placeholder" name="user outline" />

                    {userProfileImgDetails && (
                      <div className="input-file-preview">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img src={userProfileImgDetails} className="preview-img" alt="Your current profile photo" />
                      </div>
                    )}

                    <input
                      type="file"
                      onChange={handleProfileImage}
                    />

                    <div className="input-file-label">
                      <span>+</span>
                      <span>
                        {userProfileImgDetails ? 'Update' : 'Upload'}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    {showError === true && (
                      <ErrorMessage>
                        Unsupported file. Please select a .jpg
                        or .png image file.
                      </ErrorMessage>
                    )}
                  </div>
                </div>

                <Card.Header>{user.preferredName}</Card.Header>

                {user?.city && (
                  <Card.Meta>
                    <Icon name="map marker alternate" />
                    {' '}
                    <span className="date">{user?.city}</span>
                  </Card.Meta>
                )}

              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="update-button">
          <Grid.Column width={16} textAlign="center">
            {(subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Subscribed || subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Paused) ? (
              <>

                <BRBButton onClick={onUpdatePlanClick}>Update Plan</BRBButton>
                <p className="pause-subscribe">
                  <a
                    href={getPauseCancelUrl({ name: user.preferredName, emailAddress: user.email })}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BRBPinkText>Pause/Cancel Subscription</BRBPinkText>
                  </a>
                </p>

              </>
            ) : (
              <BRBButton onClick={() => history.push('/dashboard#subscribe')}>
                Subscribe
              </BRBButton>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
