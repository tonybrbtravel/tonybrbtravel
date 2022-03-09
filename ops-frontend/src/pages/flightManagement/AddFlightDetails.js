import React, { useState,useEffect } from "react";
import { Link, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Col, Row,  Card, Form, Button,Modal} from '@themesberg/react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {addFlightsDetails} from '../../Redux/actions/flightsManagementActions';
import { Routes } from "../../routes";

export default () => {
    var requestBody;
    const [validated, setValidated] = useState(false);
    const [showDefault, setShowDefault] = useState(false);
    const [isFormValid,setIsFormValid]=useState(false)
    const dispath = useDispatch();
    const history=useHistory();
    const { register, handleSubmit } = useForm();
    const [isRedirecting,setIsRedirecting]=useState(false);
    const handleClose = () => {
        setShowDefault(false);
        if(isRedirecting===true){
            history.push("/CarrierManagementDetails")
        }
    }

    const onSubmit = ((data,event) =>{
//alert(JSON.stringify(data)
const form = event.target;
setIsFormValid(true);
if (form.checkValidity() === false) {

setIsFormValid(false);
event.preventDefault();
event.stopPropagation();
}  
requestBody= data;
requestBody['status'] = "Active"

setValidated(true);
if(form.checkValidity()===true){
    dispath(addFlightsDetails(requestBody));
}
setShowDefault(true);
    } 
);
    
    const addflights = useSelector(state => state.addFlightDetails.addflights.data);
    const addflightserror = useSelector(state => state.addFlightDetails.error);
    useEffect(()=>{
        if(addflightserror===null){
        setIsRedirecting(true);}
        else{
        setIsRedirecting(false);}
    })
    const addmodalMessage  = (addflightserror === null ?  addflights : addflightserror)

    return (
        <div>
            <h4 className="mb-4">Add Carrier Details</h4>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="hotelname">
                                    <Form.Label>Carrier Name</Form.Label>
                                    <Form.Control required type="text"  {...register("carrierName")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                      Please provide a valid Carrier name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="city">
                                    <Form.Label>Website bookings page</Form.Label>
                                    <Form.Control required type="" {...register("webCheckinInURL")} placeholder="" />
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
                                    <Form.Control required type="" {...register("bookingEmail")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                      Please provide a valid booking email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="adress">
                                    <Form.Label>Standard Baggage Allowance</Form.Label>
                                    <Form.Control required type="" {...register("baggage_allowance")} placeholder="" />
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
                                    <Form.Control required type="number" {...register("priorityBoardingCost")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                      Please provide a valid priority boarding cost.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="danger" as={Link} to={Routes.FlightManagementDetails.path} className="m-1">Cancel</Button>
                        <Button variant="success" type="submit" className="m-1">Save</Button>
                    </Form>
                </Card.Body>

            </Card>
            {isFormValid&&
            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
    <Modal.Header>
      <Modal.Title className="h6">Add Flight</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
            <p> {addmodalMessage} </p>
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