

import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faLaptopCode, faPalette } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Col, Row, Nav, Tab, Card, Form, Button, Modal, Container, InputGroup, ListGroup, ListGroupItem } from '@themesberg/react-bootstrap';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Routes } from "../../routes";
import axios from "axios";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import MultiSelect from "react-multi-select-component";
import { updateCustomerDetails } from '../../Redux/actions/customerMangementActions';


export default () => {
    const [birthday, setBirthday] = useState("");
    const [postData, setPostData] = useState({});
    var customerDetailsbyid;
    const dispath = useDispatch();
    const location = useLocation();
    const queryid = localStorage.customerid;
    const [additionalTravellersData, setAdditionalTravellersData] = useState([]);
    const [airports, setAirports] = useState([]);
    const [preferredTripTypes, setPreferredTripTypes] = useState([]);
    const [topTenCities, setTopTenCities] = useState([]);
    const [excludedDestination, setExcludedDestination] = useState([]);
    const [hotelPreferences, setHotelPreferences] = useState([]);
    const [preferredActivities, setPreferredActivities] = useState([]);
    const [showDefault, setShowDefault] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [shouldRedirect,setShouldRedirect]=useState(false);
    const history=useHistory();
    localStorage.setItem('toDashboard',false);
    const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/customers/';
    //getcustomerDetailsbyid
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
                customerDetailsbyid = response.data;
                setPostData(response.data);
                //Customer Details
                setValue('customerId', customerDetailsbyid.user ? customerDetailsbyid.user['id'] : "");
                setValue('emailAddress', customerDetailsbyid.user ? customerDetailsbyid.user['email'] : "");
                setValue('subscriptionStatus', customerDetailsbyid.subscription && (customerDetailsbyid.subscription.status.toLowerCase() === "active"||customerDetailsbyid.subscription.status.toLowerCase() === "subscribed") ?"SUBSCRIBED" : "NOT SUBSCRIBED");
                setValue('stripeemailaddress', customerDetailsbyid.user ? customerDetailsbyid.user['email'] : "");
                setValue('referralcode', customerDetailsbyid.user ? customerDetailsbyid.user['referralcode'] : "");
                //Personal information
                setValue('firstName', customerDetailsbyid.personalInfo ? customerDetailsbyid.personalInfo['firstName'] : "");
                setValue('lastName', customerDetailsbyid.personalInfo ? customerDetailsbyid.personalInfo['lastName'] : "");
                setValue('preferredname', customerDetailsbyid.personalInfo ? customerDetailsbyid.personalInfo['preferredName'] : "");
                setValue('phonenumber', customerDetailsbyid.personalInfo ? customerDetailsbyid.personalInfo['phone'] : "");
                setValue('dateofbirthday', customerDetailsbyid.personalInfo && customerDetailsbyid.personalInfo['dateOfBirth'] ? moment(customerDetailsbyid.personalInfo['dateOfBirth']).format("DD-MM-YYYY") : "");
                setValue('gender', customerDetailsbyid.personalInfo ? customerDetailsbyid.personalInfo['gender'] : "");
                setValue('datejoined', customerDetailsbyid.personalInfo ? moment(customerDetailsbyid.personalInfo['dateJoined']).format("DD-MM-YYYY") : "");
                setValue('lastlogin', customerDetailsbyid.personalInfo ? customerDetailsbyid.personalInfo['lastLogin'] : "");
                setValue('internalnotes', customerDetailsbyid.personalInfo ? customerDetailsbyid.personalInfo['internalNotes'] : "");
                //Address
                setValue('firstline', customerDetailsbyid.address ? customerDetailsbyid.address['address'] : "");
                setValue('secondline', customerDetailsbyid.address ? customerDetailsbyid.address['address2'] : "");
                setValue('city', customerDetailsbyid.address ? customerDetailsbyid.address['city'] : "");
                setValue('postcode', customerDetailsbyid.address ? customerDetailsbyid.address['postCode'] : "");
                setValue('dateupdated', customerDetailsbyid.address && customerDetailsbyid.address['dateUpdated'] ? moment(customerDetailsbyid.address['dateUpdated']).format('DD-MM-YYYY') : "");
                //TravelDetails
                setValue('nationality', customerDetailsbyid.traveller ? customerDetailsbyid.traveller['nationality'] : "");
                setValue('travelDocumentType', customerDetailsbyid.traveller ? customerDetailsbyid.traveller['travelDocumentType'] : "");
                setValue('travelDocumentNumber', customerDetailsbyid.traveller ? customerDetailsbyid.traveller['passportNo'] : "");
                setValue('countryID', customerDetailsbyid.traveller ? customerDetailsbyid.traveller.countryId : "");
                setValue('tddateupdated', customerDetailsbyid.traveller && customerDetailsbyid.traveller['updatedAt'] ? moment(customerDetailsbyid.traveller['updatedAt']).format('DD-MM-YYYY') : "");
                //SubscriptionDetails
                setValue('subscriptiontype', customerDetailsbyid.subscription ? customerDetailsbyid.subscription['travellers'] + " travellers " + customerDetailsbyid.subscription['nights'] + " nights" : "");
                setValue('startDate', customerDetailsbyid.subscription && customerDetailsbyid.subscription['startDate'] ? moment(customerDetailsbyid.subscription['startDate']).format('DD-MM-YYYY') : "");
                setValue('canceledAt', customerDetailsbyid.subscription ? customerDetailsbyid.subscription['canceledAt'] : "");
                setValue('trialStart', customerDetailsbyid.subscription && customerDetailsbyid.subscription['trialStart']? moment(customerDetailsbyid.subscription['trialStart']).format('DD-MM-YYYY') : "");
                setValue('trialEnd', customerDetailsbyid.subscription &&customerDetailsbyid.subscription['trialEnd'] ? moment(customerDetailsbyid.subscription['trialEnd']).format('DD-MM-YYYY') : "");
                setValue('totalFundsAvailable', customerDetailsbyid.subscription ? customerDetailsbyid.subscription['fundAvailable'] / 100 : "");
                setValue('totalFundsUsed', customerDetailsbyid.subscription ? customerDetailsbyid.subscription['fundUsed'] / 100 : "");
                setValue('totalFundsSaved', customerDetailsbyid.subscription ? customerDetailsbyid.subscription['fundSaved'] / 100 : "");

                //Additional travellers
                setAdditionalTravellersData(customerDetailsbyid.additionalTravellers ? customerDetailsbyid.additionalTravellers : []);
                // Travel preference
                setAirports(customerDetailsbyid.travellerPreference.airports ? customerDetailsbyid.travellerPreference.airports.outboundAirports.map(item => (
                    {
                        label: item.airportName,
                        value: item.id
                    }
                )) : []);
                setTopTenCities(customerDetailsbyid.travellerPreference.top10Destinations ? customerDetailsbyid.travellerPreference.top10Destinations.destinations.map(item => (
                    {
                        label: item.destinationName,
                        value: item.id
                    }
                )) : []);
                setExcludedDestination(customerDetailsbyid.travellerPreference.excludedDestinations ? customerDetailsbyid.travellerPreference.excludedDestinations.destinations.map(item => (
                    {
                        label: item.destinationName,
                        value: item.id
                    }
                )) : []);
                setHotelPreferences(customerDetailsbyid.travellerPreference.hotelPreferences ? customerDetailsbyid.travellerPreference.hotelPreferences.preferences.map(item => (
                    {
                        label: item.name,
                        value: item.id
                    }
                )) : []);
                setPreferredActivities(customerDetailsbyid.travellerPreference.preferredActivities ? customerDetailsbyid.travellerPreference.preferredActivities.activities.map(item => (
                    {
                        label: item.name,
                        value: item.id
                    }
                )) : []);
                setPreferredTripTypes(customerDetailsbyid.travellerPreference.travelPreferences.tripTypes ? customerDetailsbyid.travellerPreference.travelPreferences.tripTypes.map(item => (
                    {
                        label: item.name,
                        value: item.id
                    }
                )) : []);
            }).catch(error => {
                console.log(error)
            })
        }
        fetchData();
    }, []);

    const onSubmit = ((data) => {
        var requestBody = postData;
        requestBody.user['email'] = data.emailAddress;
        requestBody.personalInfo['internalNotes'] = data.internalnotes;
        dispath(updateCustomerDetails(requestBody));
        setShowDefault(true);
    }
    );

    const handleClose = () => 
    {
        setShowDefault(false);
        if(shouldRedirect)
        history.push("/CustomerManagementDetails");
    }
    const updateCustomer = useSelector(state => state.updateCustomerDetails.updateCustomers.data);
    const updateCustomererror = useSelector(state => state.updateCustomerDetails.error);
    useEffect(()=>{
        if(updateCustomererror===null)
        setShouldRedirect(true);
        else
        setShouldRedirect(false);
    },[updateCustomererror])
    const updatemodalMessage = (updateCustomererror === null ? updateCustomer : updateCustomererror)


    return (
        <div>
            <h5 className="mb-4">Update Customer Details</h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Tab.Container defaultActiveKey="customerDetails">
                    <Row>
                        <Col lg={12}>
                            <Nav className="nav-tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey="customerDetails" className="mb-sm-3 mb-md-0">
                                        Customer Details
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="personalInformation" className="mb-sm-3 mb-md-0">
                                        Personal Information
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="address" className="mb-sm-3 mb-md-0">
                                        Address
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="travellerDetails" className="mb-sm-3 mb-md-0">
                                        Travel Details
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="subscriptionDetails" className="mb-sm-3 mb-md-0">
                                        Subscription Details
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="travelPreferences" className="mb-sm-3 mb-md-0">
                                        Travel preferences
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="additionalTravellers" className="mb-sm-3 mb-md-0">
                                        Additional  Travellers
                                    </Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Col>
                        <Col lg={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="customerDetails" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}

                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group >
                                                        <Form.Label>BRB Customer Id</Form.Label>
                                                        <Form.Control required readOnly type="number"  {...register("customerId")} />
                                                    </Form.Group>
                                                </Col>
                                                {/* <Col md={6} className="mb-3">
                                                    <Form.Group >
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control required type="email" readOnly  {...register("emailAddress")} />
                                                    </Form.Group>
                                                </Col> */}
                                                {/* </Row>
                                            <Row> */}
                                                <Col md={6} className="mb-3">
                                                    <Form.Group >
                                                        <Form.Label>Subscription status</Form.Label>
                                                        <Form.Control required readOnly type="text" {...register("subscriptionStatus")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group >
                                                        <Form.Label>Stripe email address</Form.Label>
                                                        <Form.Control required readOnly type="email" {...register("stripeemailaddress")} />
                                                    </Form.Group>
                                                </Col>
                                                {/* </Row>
                                            <Row> */}
                                                <Col md={6} className="mb-3">
                                                    <Form.Group >
                                                        <Form.Label>Referral Code</Form.Label>
                                                        <Form.Control required readOnly type="number" {...register("referralcode")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Button variant="info" as={Link} to={Routes.ForgotPassword.path} className="m-1">Reset Password</Button>
                                                </Col>
                                            </Row>


                                            <Button variant="danger" as={Link} to={Routes.CustomerManagementDetails.path} className="m-1">Cancel</Button>
                                            <Button variant="success" type="submit" className="m-1">Update</Button>

                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="personalInformation" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>First Name</Form.Label>
                                                            <Form.Control readOnly required type="text" {...register("firstName")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Last Name</Form.Label>
                                                            <Form.Control readOnly required type="text" {...register("lastName")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Preferred name</Form.Label>
                                                            <Form.Control readOnly required type="text" {...register("preferredname")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Phone Number</Form.Label>
                                                            <Form.Control readOnly required type="text" {...register("phonenumber")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="align-items-center">
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Date of Birth</Form.Label>
                                                            <Form.Control readOnly required type="text" {...register("dateofbirthday")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Title</Form.Label>
                                                            <Form.Control readOnly required type="text" {...register("gender")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Date joined</Form.Label>
                                                            <Form.Control readOnly required type="text" {...register("datejoined")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Last log-in</Form.Label>
                                                            <Form.Control readOnly required type="text" {...register("lastlogin")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Internal notes</Form.Label>
                                                            <Form.Control required as="textarea" rows="3" type="text" {...register("internalnotes")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Button variant="danger" as={Link} to={Routes.CustomerManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="address" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>First line</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("firstline")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Second line</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("secondline")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>City</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("city")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Postcode</Form.Label>
                                                            <Form.Control required readOnly type="" {...register("postcode")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Date updated</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("dateupdated")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Button variant="danger" as={Link} to={Routes.CustomerManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="travellerDetails" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Nationality</Form.Label>
                                                            <Form.Control required readOnly type="text"  {...register("nationality")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Travel document type</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("travelDocumentType")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    {/* <Col md={6} className="mb-3">
                                                    <Form.Group >
                                                        <Form.Label>Travel document number</Form.Label>
                                                        <Form.Control required readOnly type="number" {...register("travelDocumentNumber")} />
                                                    </Form.Group>
                                                </Col> */}
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="countryID">
                                                            <Form.Label>Country ID</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("countryID")} />
                                                        </Form.Group>
                                                    </Col>
                                                    {/* </Row>
                                            <Row> */}
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Date updated</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("tddateupdated")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Button variant="danger" as={Link} to={Routes.CustomerManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>

                                </Tab.Pane>
                                <Tab.Pane eventKey="subscriptionDetails" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Subscription Plan</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("subscriptiontype")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Date subscribed</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("startDate")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Date cancelled</Form.Label>
                                                            <Form.Control required readOnly type="number" {...register("canceledAt")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Trial Start</Form.Label>
                                                            <Form.Control required readOnly type="number" {...register("trialStart")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Trial End</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("trialEnd")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Total Funds Saved</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("totalFundsSaved")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Total Funds Used</Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("totalFundsUsed")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Total Funds Available </Form.Label>
                                                            <Form.Control required readOnly type="text" {...register("totalFundsAvailable")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    <Button variant="danger" as={Link} to={Routes.CustomerManagementDetails.path} className="m-1">Cancel</Button>
                                    <Button variant="success" type="submit" className="m-1">Update</Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey="travelPreferences" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="preferredTripTypes">
                                                            <Form.Label>Preferred trip types</Form.Label>
                                                            {/* <Form.Control required readOnly type="" /> */}
                                                            <ListGroup style={{ backgroundColor: "#f5f8fb", border: "0.25px solid", height: "150px", overflow: "auto" }}>
                                                                {preferredTripTypes.map(x =>
                                                                    <ListGroupItem style={{ backgroundColor: "#f5f8fb" }}>{x.label}</ListGroupItem>)}
                                                            </ListGroup>
                                                            {/* <Form.Control as="textarea" rows="5" readOnly required type="" >
                                                                {preferredTripTypes.map(x => (
                                                                    <p>{x.label}</p>
                                                                ))}
                                                            </Form.Control> */}
                                                            {/* {preferredTripTypes.map(x => (
                                                                <p>{x.label}</p>
                                                            ))} */}

                                                            {/* {/* <MultiSelect
                                                                disabled
                                                                options={preferredTripTypes}
                                                                selected={preferredTripTypes}
                                                                labelledBy={"Select"}
                                                            /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="preferredAirports">
                                                            <Form.Label>Preferred airports</Form.Label>
                                                            <ListGroup style={{ backgroundColor: "#f5f8fb", border: "0.25px solid", height: "150px", overflow: "auto" }}>
                                                                {airports.map(x =>
                                                                    <ListGroupItem style={{ backgroundColor: "#f5f8fb" }}>{x.label}</ListGroupItem>)}
                                                            </ListGroup>
                                                            {/* <MultiSelect
                                                                disabled
                                                                options={airports}
                                                                selected={airports}
                                                                labelledBy={"Select"}
                                                            /> */}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="top10Cities">
                                                            <Form.Label>Top 10 cities</Form.Label>
                                                            <ListGroup style={{ backgroundColor: "#f5f8fb", border: "0.25px solid", height: "150px", overflow: "auto" }}>
                                                                {topTenCities.map(x =>
                                                                    <ListGroupItem style={{ backgroundColor: "#f5f8fb" }}>{x.label}</ListGroupItem>)}
                                                            </ListGroup>
                                                            {/* <MultiSelect
                                                                disabled
                                                                options={topTenCities}
                                                                selected={topTenCities}
                                                                labelledBy={"Select"}
                                                            /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="excludedDestinations">
                                                            <Form.Label>Excluded destinations</Form.Label>
                                                            <Form.Group rows="5" >
                                                                <ListGroup style={{
                                                                    backgroundColor: "#f5f8fb",
                                                                    border: "0.25px solid",
                                                                    height: "150px", overflow: "auto", backgroundColor: "#f5f8fb"
                                                                }}>
                                                                    {excludedDestination.map(x =>
                                                                        <ListGroupItem style={{ backgroundColor: "#f5f8fb" }}>{x.label}</ListGroupItem>)}
                                                                </ListGroup>
                                                            </Form.Group>
                                                            {/* <MultiSelect
                                                                disabled
                                                                options={excludedDestination}
                                                                selected={excludedDestination}
                                                                labelledBy={"Select"}
                                                            /> */}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="hotelPreferences">
                                                            <Form.Label>Hotel preferences</Form.Label>
                                                            <ListGroup style={{ backgroundColor: "#f5f8fb", border: "0.25px solid", height: "150px", overflow: "auto" }}>
                                                                {hotelPreferences.map(x =>
                                                                    <ListGroupItem style={{ backgroundColor: "#f5f8fb" }}>{x.label}</ListGroupItem>)}
                                                            </ListGroup>
                                                            {/* <MultiSelect
                                                                disabled
                                                                options={hotelPreferences}
                                                                selected={hotelPreferences}
                                                                labelledBy={"Select"}
                                                            /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="preferredActivities">
                                                            <Form.Label>Preferred activities</Form.Label>
                                                            <ListGroup style={{
                                                                border: "0.25px solid",
                                                                height: "150px", overflow: "auto",
                                                                backgroundColor: "#f5f8fb"
                                                            }}>
                                                                {preferredActivities.map(x =>
                                                                    <ListGroupItem style={{ backgroundColor: "#f5f8fb" }}>{x.label}</ListGroupItem>)}
                                                            </ListGroup>
                                                            {/* <MultiSelect
                                                                disabled
                                                                options={preferredActivities}
                                                                selected={preferredActivities}
                                                                labelledBy={"Select"}
                                                            /> */}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Button variant="danger" as={Link} to={Routes.CustomerManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>

                                </Tab.Pane>
                                <Tab.Pane eventKey="additionalTravellers" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group>
                                                {additionalTravellersData.length > 0 ?

                                                    additionalTravellersData.map(({ firstName, lastName, dob, nationality, travelDocumentType, countryId }, index) => <Fragment>
                                                        <Row>
                                                            <h5> Addtional Traveller {index + 1}</h5>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>First name</Form.Label>
                                                                    <Form.Control required readOnly type="" value={firstName} />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Last name </Form.Label>
                                                                    <Form.Control required readOnly type="" value={lastName} />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>DOB</Form.Label>
                                                                    <Form.Control required readOnly type="" value={moment(dob).format("DD-MM-YYYY")} />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Nationality</Form.Label>
                                                                    <Form.Control required readOnly type="" value={nationality} />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Travel Document type</Form.Label>
                                                                    <Form.Control required readOnly type="" value={travelDocumentType} />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Country ID</Form.Label>
                                                                    <Form.Control required readOnly type="" value={countryId} />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row></Fragment>)
                                                    : <h4>No additional traveller data found</h4>
                                                }
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    <Button variant="danger" as={Link} to={Routes.CustomerManagementDetails.path} className="m-1">Cancel</Button>
                                    <Button variant="success" type="submit" className="m-1">Update</Button>
                                </Tab.Pane>

                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title className="h6">Update Customer Details</Modal.Title>
                        <Button variant="close" aria-label="Close" onClick={handleClose} />
                    </Modal.Header>
                    <Modal.Body>
                        <p> {updatemodalMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>  </div >


    );
};