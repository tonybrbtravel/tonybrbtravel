
import React,{ useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup,Modal } from '@themesberg/react-bootstrap';
//import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Routes } from "../routes";
import { Auth } from "aws-amplify";
import { UpdateConfirmPassword } from './AsyncFunctions';
import { Link, useHistory, withRouter } from 'react-router-dom';



export default () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const emailVerifyUrl = 'https://apistaging.berightback.travel/user/profile/email/';
  const [email,setEmail] = useState(null)
  const [showMessage,setShowMessage]=useState(false);
  const [errorMessage,setErrorMessage]=useState('');
  const [isRedirecting,setIsRedirecting]=useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => {
    const toDashboard=localStorage.toDashboard;
    setShowDefault(false);
    if(isRedirecting===true){
      if(toDashboard)
        history.push("/")
        else{
          history.push("/CustomerManagementDetails")
        }
    }
       }
  
  const onSubmit = ((data,event) =>{
    UpdateConfirmPassword(data.email,data.code,data.password).then((data) => {
      if(data===undefined) {
        // history.push("/");
        setIsRedirecting(true);
        setShowDefault(true);
        setShowMessage(false);

      }
      else{
        setIsRedirecting(false);
        setShowMessage(true);
        setErrorMessage(data.message);
      }
      // getSignInInfo();
    }).catch((err) => {
      console.log("error", err);
       setShowMessage(true);
    setErrorMessage(err)
    });
  
  })

  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
            </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="\signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3> New password?</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Your Email</Form.Label>
                    <InputGroup id="email">
                      <Form.Control required autoFocus type="email" placeholder="Enter email address"  {...register("email")}/>
                    </InputGroup>
                  </div>
                  <div className="mb-4">
                    <Form.Label htmlFor="code">Verification code</Form.Label>
                    <InputGroup id="code">
                      <Form.Control required type="" placeholder="Enter verification code"  {...register("code")}/>
                    </InputGroup>
                  </div>
                  <div className="mb-4">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <InputGroup id="password">
                      <Form.Control required  type="password" placeholder="Enter password"  {...register("password")}/>
                    </InputGroup>
                  </div>
                  <Button variant="primary" type="submit" className="w-100">
                    Submit
                  </Button>
                  {showMessage&&<h4 style={{ color: 'red' }}>{errorMessage}</h4>}
                  <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Password Updated</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p> You have successfully reset your password!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};