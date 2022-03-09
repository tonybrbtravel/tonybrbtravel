
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Modal } from '@themesberg/react-bootstrap';
import { updateFlightsDetails} from '../../Redux/actions/flightsManagementActions';
import axios from "axios";
import { Auth } from "aws-amplify";
import { Routes } from "../../routes";




export default () => {
    const history = useHistory();
    var requestBody;
    var flightDetailsbyid;
    const [showDefault, setShowDefault] = useState(false);
    const dispath = useDispatch();
    const queryid = localStorage.carrierid;
    const { register, handleSubmit, setValue } = useForm();
    const [isFormValid,setIsFormValid]=useState(false);
    const [validated, setValidated] = useState(false);
    const [isRedirecting,setIsRedirecting]=useState(false);
    const handleClose = () =>
    { setShowDefault(false);
        if(isRedirecting===true){
            history.push("/FlightManagementDetails")
        }

    }

    ///////////////Get FlightDetailsById
    const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/flightCarrier/';

        
        useEffect(() => {
            async function fetchData() {
            // API Call code
            const session = await Auth.currentSession();
            const token = session.idToken.jwtToken;
            axios({
                url: apiUrl + queryid,
                method: "get",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                flightDetailsbyid = response.data;
                console.log('bnnnnnnnnnnnnnnnnn......', flightDetailsbyid);
                setValue('carrierName', flightDetailsbyid['carrierName']);
                setValue('webCheckinUrl', flightDetailsbyid['webCheckinUrl']);
                setValue('bookingEmail', flightDetailsbyid['bookingEmail']);
                setValue('baggageAllowance', flightDetailsbyid['baggageAllowance']);
                setValue('priorityBoardingCost', flightDetailsbyid['priorityBoardingCost']);
            }).catch(error => {
                console.log(error)
            })
            }
            fetchData();
            },[])

    const onSubmit = ((data,event) => {
        const form = event.target;
setIsFormValid(true);
if (form.checkValidity() === false) {

setIsFormValid(false);
event.preventDefault();
event.stopPropagation();
}  
        requestBody = data;
        requestBody['status'] = "ACTIVE"
        requestBody['id'] = queryid;
        setValidated(true);
        if(form.checkValidity()===true){
        dispath(updateFlightsDetails(requestBody));
        }
        setShowDefault(true);
    }
    );

    const updateFlights = useSelector(state => state.updateFlightDetails.updateflights.data);
    const updateflightserror = useSelector(state => state.updateFlightDetails.error);
    const updatemodalMessage  = (updateflightserror === null ?  updateFlights : updateflightserror)
    useEffect(()=>{
        if(updateflightserror===null){
            setIsRedirecting(true)
        }
        else{
            setIsRedirecting(false);
        }
    })

    return (
        <div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">Update Fight Details</h5>
                    <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="hotelname">
                                    <Form.Label>Carrier Name</Form.Label>
                                    <Form.Control type="text"  {...register("carrierName")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                      Please provide a valid Carrier name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="city">
                                    <Form.Label>Website bookings page</Form.Label>
                                    <Form.Control type="" {...register("webCheckinUrl")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                      Please provide a valid website bookings page.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="starrating">
                                    <Form.Label>Booking Email</Form.Label>
                                    <Form.Control type="" {...register("bookingEmail")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                      Please provide a valid booking email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="adress">
                                    <Form.Label>Standard Baggage Allowance</Form.Label>
                                    <Form.Control type="" {...register("baggageAllowance")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                      Please provide a valid standard baggage allowance.
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Col>
                        </Row>
                        <Row>

                            <Col md={6} className="mb-3">
                                <Form.Group id="phone">
                                    <Form.Label>Priority Boarding Cost</Form.Label>
                                    <Form.Control type="number" {...register("priorityBoardingCost")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                      Please provide a valid priority boarding cost.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="danger" as={Link} to={Routes.FlightManagementDetails.path} className="m-1">Cancel</Button>
                        <Button variant="success" type="submit" className="m-1">Update</Button>
                    </Form>
                </Card.Body>

            </Card>
            {isFormValid&&
            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Update Flight</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p> { updatemodalMessage} </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>}
        </div>
    );
};