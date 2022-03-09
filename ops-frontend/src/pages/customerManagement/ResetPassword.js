
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link,useHistory } from 'react-router-dom';

import { Routes } from "../../routes";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { getResetPasswordDetails } from './../../Redux/actions/resetPasswordActions'
import { useSelector, useDispatch } from 'react-redux';

export default () => {
  const dispath = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const onSubmit = ((data) => {
    dispath(getResetPasswordDetails(data));
  }
  );
  var error;
  const resetPassword = useSelector(state => state.resetPasswordDetails.resetPasswordresponse);
  const resetPassworderror = useSelector(state => state.resetPasswordDetails.error);
  if (resetPassword !== null){
  history.push('/CustomerManagementDetails')
  }
  else {
    error = resetPassworderror;
  }
  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            {/*<p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
  </p>*/}
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control  required type="email" placeholder="example@company.com" {...register("email")} />
                    </InputGroup>
                  </Form.Group> */}
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password" {...register("oldPassword")} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Confirm Password" {...register("newPassword")} />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Reset password
                  </Button>
                  <h4 style={{ color: 'red' }}>{error}</h4>
                </Form>
              </div>
            </Col>
            
          </Row>
        </Container>
      </section>
    </main>
  );
};
