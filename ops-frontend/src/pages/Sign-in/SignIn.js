
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck,Modal, Container, InputGroup } from '@themesberg/react-bootstrap';
import { useForm } from "react-hook-form";
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { Link, useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signInFormUpdate } from "./signinSlice";
import {getSignInDetails} from "../../Redux/actions/signInActions";
import { signIn } from "./saga";
import { Auth } from "aws-amplify";
import Preloader from "../../components/Preloader";
export default () => {
  let session, token;
  const [signedIn, setSignedIn] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  localStorage.setItem('toDashboard',true);

  // const onSubmit = data => dispatch(signInFormUpdate(data))
  const onSubmit = data => {
    setCheckStatus(true);
    dispatch(getSignInDetails(data))
    setSignedIn(true);
  };
  const signinResponse = useSelector(state => state.signInReducer.signinresponse);
  const loading = useSelector(state => state.signInReducer.loading);
  var error = useSelector(state => state.signInReducer.error);
  useEffect(() => {
  
    setIsLoading(loading);
  }, [loading])
  if (signinResponse == "true" && signedIn === true) {
 
    history.push('/Dashboard')
  }
  // else {
  //   error = 'you donot have access to ops-portal'
  // }
  useEffect(() => {
    async function getValues() {
      session = await Auth.currentSession();
      token = session.idToken.jwtToken;
    }
    getValues();
  }, [])


  return (
    <>
      <Preloader show={isLoading ? true : false} />
      {!isLoading &&
        <main>

          <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
            <Container>
              {/*<p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
  </p>*/}
              <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
                <Col xs={12} className="d-flex align-items-center justify-content-center">
                  <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                      <h3 className="mb-0">Sign in to  Ops portal</h3>
                    </div>
                    <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group id="email" className="mb-4">
                        <Form.Label>Your Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="email" {...register("email")} placeholder="example@company.com" />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Group id="password" className="mb-4">
                          <Form.Label>Your Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control required type="password"  {...register("password")} placeholder="Password" />
                          </InputGroup>
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <Form.Check type="checkbox">
                            <FormCheck.Input id="defaultCheck5" defaultValue={true} className="me-2" {...register("check")} />
                            <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                          </Form.Check>
                          <Card.Link className="small text-end" as={Link} to={Routes.ForgotPassword.path}>Lost password?</Card.Link>
                        </div>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="w-100">
                        Sign in
                      </Button>
                    </Form>
                    {
                      checkStatus && <h4 style={{ color: 'red' }}>{error}</h4>
                    }

                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>}
    </>
  );
};
