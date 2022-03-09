import { useState } from 'react';
import { Grid, Header, Image, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import BRBPinkText from '../BRBPinkText';
import {
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
} from './BRBCommunitySelfieImages';
import { saveUserSelfie } from '../../Api/dashboardApi';
import BrbEndPoints from '../../Api/BrbEndPoints';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { showNotification } from '../BRBNotification/ShowNotification';

import './BRBCommunity.less';

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20];

const selfieImages = images.sort(() => Math.random() - 0.5).splice(0, 8);

const BRBCommunity = () => {
  const { register, handleSubmit } = useForm();
  const [currentSelfies, setCurrentSelfies] = useState<string[]>(selfieImages);
  const [showError, setError] = useState(false);
  const [selfieImage, setSelfieImage] = useState<string>();

  const addSelfieImage = (newSrc: string | null) => {
    if (newSrc) {
      selfieImages.pop();
      selfieImages.unshift(newSrc);
      setCurrentSelfies(selfieImages);
    }
  };

  const fileChangedHandler = (event: any) => {
    const [file] = event.target.files;
    if (!file) {
      setSelfieImage(undefined);
      showNotification.error({
        title: 'Error',
        content: 'Please select an image to upload',
      });
      return;
    }

    const fileType = file.type;
    if (fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png') {
      setError(false);
    } else {
      setError(true);
    }

    if (FileReader) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setSelfieImage(fileReader.result?.toString());
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onFileSubmit = (form: any) => {
    if (form.userSelfie && !showError) {
      const userSelfie = form.userSelfie[0];
      const formData = new FormData();
      formData.append('file', userSelfie);

      saveUserSelfie({
        url: BrbEndPoints.uploadUserSelfie,
        data: formData,
      }).then((res: string) => {
        if (res) {
          showNotification.success({
            title: 'Success',
            content: 'Selfie Uploaded Successfully!',
          });
          addSelfieImage(selfieImage || null);
          setSelfieImage(undefined);
        } else {
          showNotification.error({
            title: 'Error',
            content: 'Something went wrong! Please try again!',
          });
        }
      });
    }

    if (form.userSelfie.length === 0) {
      showNotification.error({
        title: 'Error',
        content: 'Please select an image to upload',
      });
    }
  };

  return (
    <div className="brb-community-container">
      <div className="ui container">

        <Grid columns={2} padded>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={13} computer={13}>
              <Header image as="h2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="44"
                  viewBox="0 0 48 44"
                  fill="none"
                >
                  <path
                    d="M23.1086 7.03939L24.2358 8.32322L25.363 7.03939L26.7682 5.43884C30.7282 0.928633 38.0389 0.162551 43.0428 3.8101C45.3731 5.50877 46.3813 8.12684 46.4902 10.9427C46.6 13.7831 45.7773 16.6381 44.6706 18.4894C38.3738 29.0233 33.5195 34.3406 24.1976 42.0855C19.2768 38.3376 15.712 35.5936 12.6549 32.5254C9.43734 29.2961 6.75941 25.6809 3.73875 20.1256C0.364295 13.9196 0.69709 7.25918 5.42876 3.81009C10.4327 0.162552 17.7434 0.928636 21.7033 5.43885L23.1086 7.03939Z"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                <Header.Content>
                  <BRBPinkText>BRB</BRBPinkText>
                  {' '}
                  Community
                  <span className="brb-pink-text small" data-tooltip="Upload your reveal selfie and post on Instagram for a chance to win unique prizes each month">
                    +Prize draw
                    <i aria-hidden="true" className="question circle outline small icon help-icon" />
                  </span>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column computer={3} only="computer">
              <h2>#BeRightBack</h2>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid columns={2} padded>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={13} computer={13}>
              <div className="community-subhead">
                <h2>Got Your Postcard?</h2>
                <h2>
                  Upload A Selfie To
                  {' '}
                  <BRBPinkText>Win Rewards.</BRBPinkText>
                </h2>
              </div>
              <p>
                Take a selfie with your postcard and send it to us for a chance
                to win amazing rewards each month. Don’t forget to share it on
                Instagram and tag
                {' '}
                <a href="https://www.instagram.com/brb.travel/" target="_blank" rel="noreferrer">
                  @brb.travel
                </a>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row>

            <Grid.Column mobile="16" tablet="5" computer="5">
              <Form onSubmit={handleSubmit(onFileSubmit)}>
                <div className="drag-n-drop-container" style={{ backgroundImage: `url(${selfieImage})` }}>
                  <div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="49"
                      height="49"
                      viewBox="0 0 49 49"
                      fill="none"
                    >
                      <path
                        d="M-1.04924e-06 24.0039C-1.32752e-06 17.6377 2.53775 11.5322 7.05498 7.03064C11.5722 2.52904 17.6989 7.17056e-05 24.0872 7.14264e-05C30.4755 7.11471e-05 36.6022 2.52904 41.1194 7.03064C45.6367 11.5322 48.1744 17.6377 48.1744 24.0039C48.1744 30.3702 45.6367 36.4756 41.1194 40.9772C36.6022 45.4788 30.4755 48.0078 24.0872 48.0078C17.6989 48.0078 11.5722 45.4788 7.05498 40.9772C2.53775 36.4756 -7.70966e-07 30.3702 -1.04924e-06 24.0039H-1.04924e-06ZM22.5818 34.5056C22.5818 34.9035 22.7404 35.2851 23.0227 35.5665C23.305 35.8478 23.6879 36.0059 24.0872 36.0059C24.4865 36.0059 24.8694 35.8478 25.1517 35.5665C25.4341 35.2851 25.5927 34.9035 25.5927 34.5056L25.5927 17.1238L32.0541 23.5659C32.194 23.7054 32.3602 23.816 32.5431 23.8915C32.726 23.967 32.922 24.0058 33.1199 24.0058C33.3179 24.0058 33.5139 23.967 33.6968 23.8915C33.8796 23.816 34.0458 23.7054 34.1858 23.5659C34.3258 23.4264 34.4368 23.2608 34.5125 23.0785C34.5883 22.8963 34.6273 22.701 34.6273 22.5037C34.6273 22.3064 34.5883 22.1111 34.5125 21.9289C34.4368 21.7466 34.3258 21.581 34.1858 21.4415L25.1531 12.4401C25.0132 12.3004 24.8471 12.1895 24.6642 12.1139C24.4813 12.0383 24.2852 11.9993 24.0872 11.9993C23.8892 11.9993 23.6931 12.0383 23.5102 12.1139C23.3273 12.1895 23.1612 12.3004 23.0214 12.4401L13.9886 21.4415C13.8487 21.581 13.7376 21.7466 13.6619 21.9289C13.5861 22.1111 13.5472 22.3064 13.5472 22.5037C13.5472 22.701 13.5861 22.8963 13.6619 23.0785C13.7376 23.2608 13.8487 23.4264 13.9886 23.5659C14.1286 23.7054 14.2948 23.816 14.4777 23.8915C14.6605 23.967 14.8566 24.0058 15.0545 24.0058C15.2525 24.0058 15.4485 23.967 15.6313 23.8915C15.8142 23.816 15.9804 23.7054 16.1204 23.5659L22.5818 17.1238L22.5818 34.5056Z"
                        fill="currentColor"
                      />
                    </svg>

                    <p>
                      <span>
                        Drag and drop or
                        {' '}
                        <u>browse</u>
                      </span>
                    </p>

                    <input type="file" {...register('userSelfie')} onChange={fileChangedHandler} accept=".png,.jpg,.jpeg" />

                  </div>
                </div>

                {
                  showError === true
                    ? <ErrorMessage>Unsupported file. You must use only .jpg &amp; .png</ErrorMessage>
                    : ''
                }

                <button type="submit" className="ui circular secondary button brb-button" disabled={!selfieImage}>
                  {
                    selfieImage
                      ? 'Upload this image'
                      : 'Choose your selfie'
                  }
                  {
                    selfieImage && <small>+Win Rewards</small>
                  }
                </button>

              </Form>
            </Grid.Column>

            <Grid.Column width={11} only="computer tablet">
              <Grid>

                <Grid.Row columns={4}>
                  <Grid.Column width={4}>
                    <Image className="simple-animate-in" src={currentSelfies[0]} />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image className="simple-animate-in" src={currentSelfies[1]} />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image className="simple-animate-in" src={currentSelfies[2]} />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image className="simple-animate-in" src={currentSelfies[3]} />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={4}>
                  <Grid.Column width={4}>
                    <Image className="simple-animate-in" src={currentSelfies[4]} />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image className="simple-animate-in" src={currentSelfies[5]} />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image className="simple-animate-in" src={currentSelfies[6]} />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image className="simple-animate-in" src={currentSelfies[7]} />
                  </Grid.Column>
                </Grid.Row>

              </Grid>
            </Grid.Column>

          </Grid.Row>
        </Grid>
        <Grid />
      </div>
    </div>
  );
};

export default BRBCommunity;
