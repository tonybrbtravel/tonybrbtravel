
import React,{ useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Routes } from "../routes";
import { Auth } from "aws-amplify";
import { ForgotPasswordVerifyCode } from './AsyncFunctions';
import { Link, useHistory} from 'react-router-dom';


export default () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const emailVerifyUrl = 'https://apistaging.berightback.travel/user/profile/email/';
  const [email,setEmail] = useState(null)
  const [showError,setShowError]=useState(false);
  const [errorMessage,setErrorMessage]=useState('');
  const onSubmit = ((data,event) =>{
    console.log('data.......',data)
    axios({
      url: emailVerifyUrl + data.email,
      method: "get",
      headers: {
          "Content-Type": "application/json",
      },
  }).then((response) => {
      console.log('response...........',response.data)
      if(response.data === "exists"){
        ForgotPasswordVerifyCode(data.email).then((data) => {
          if(data) {            
            history.push('/new-password');
          }
        })
      }else{
        setShowError(true);
        setErrorMessage("No user exists with this email ID")
        
      }
  }).catch(error => {
      console.log(error)
      setShowError(true);
      setErrorMessage(error.message)

  })

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
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Forgot your password?</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Enter Email</Form.Label>
                    <InputGroup id="email">
                      <Form.Control required autoFocus type="email" placeholder="Enter email address"  {...register("email")}/>
                    </InputGroup>
                  </div>
                  <Button variant="primary" type="submit" className="w-100">
                    Recover password
                  </Button>
                  {showError&&<h4 style={{ color: 'red' }}>{errorMessage}</h4>}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};