import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Segment,
  Card,
  Message,
  Grid,
  GridColumn,
  Header,
} from 'semantic-ui-react';
import ReactCodeInput from 'react-verification-code-input';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import { codeUpdate, resendCode, signUpErrorUpdate } from '../../signupSlice';
import './VerifyCode.less';
import { BRBButton } from '../../../../components/BRBButton/BRBButton';
import { Layout } from '../../../../components/Layout/Layout';
import BRBSwiper from '../../../../components/BRBSwiper';
import { slidesData } from '../../../../mockData/signup';
import { Spinner } from '../../../../components/BRBSpinner/BRBSpinner';
import { showNotification } from '../../../../components/BRBNotification/ShowNotification';

export const VerifyCode = () => {
  const dispatch = useDispatch();
  const signUpError = useSelector((state: any) => state.signup.signUpError);
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const resendCodeStatus = useSelector(
    (state: any) => state.signup.codeUpdateStatus,
  );
  useEffect(() => {
    document.body.style.height = '100%';
  }, []);
  useEffect(() => () => {
    dispatch(signUpErrorUpdate(null));
  }, [dispatch]);
  const verify = () => {
    if (code.length < 6) {
      return;
    }
    setLoading(true);
    dispatch(codeUpdate(code));
  };

  const codeResend = () => {
    setLoading(true);
    dispatch(resendCode());
    showNotification.success({
      title: 'Success!',
      content: 'Verification code re-sent successfully!',
    });
  };

  // useEffect(() => {
  //   if (resendCodeStatus || signUpError) setLoading(false);
  // }, [resendCodeStatus, signUpError]);

  const onSlideChange = (swiper: Swiper) => {
    let image = '';
    switch (swiper.activeIndex) {
      case 0:
        image = 'Lake_Como.jpg';
        break;
      case 1:
        image = 'budget-easily.png';
        break;
      case 2:
        image = 'best-hotels.png';
        break;
      default:
        image = 'Lake_Como.jpg';
        break;
    }
    document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/${image})`;
    document.body.style.height = 'auto';
  };

  const slides = slidesData.map((slide) => (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1" className="swiper-header">
            {slide.header}
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={7}>
          <p className="swiper-sub-header">{slide.subHeader}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ));

  return (
    <Layout signUp>
      <Grid columns={2} centered stackable>
        <GridColumn width={8} className="swiper-column">
          <BRBSwiper
            slides={slides}
            spaceBetween={60}
            effect="fade"
            pagination={{
              clickable: true,
            }}
            onSlideChange={onSlideChange}
            allowTouchMove
          />
        </GridColumn>
        <GridColumn width={6}>
          <Segment className="verify-code">
            {loading && !(signUpError && signUpError.message) ? (
              <Spinner />
            ) : (
              ''
            )}
            <Card centered>
              <Card.Content className="social-buttons">
                <Card.Header>Verify your email</Card.Header>
                <div className="sub-text">
                  Enter the code that was just sent to your email address to
                  activate your BRB account.
                </div>
              </Card.Content>
              <Card.Content>
                <ReactCodeInput
                  fields={6}
                  onComplete={(val: string) => setCode(val)}
                />
                {signUpError && signUpError.message && (
                  <Message error>
                    <strong>Error:</strong>
                    {' '}
                    {signUpError.message}
                  </Message>
                )}
                <BRBButton fluid disabled={!code} onClick={verify}>
                  Finish
                </BRBButton>
                <div className="resend">
                  Didn’t receive your code?
                  <Link to="#" onClick={codeResend}>
                    Click here
                  </Link>
                  to resend.
                </div>
              </Card.Content>
            </Card>
          </Segment>
        </GridColumn>
      </Grid>
    </Layout>
  );
};
