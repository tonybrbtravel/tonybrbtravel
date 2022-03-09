import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faLaptopCode, faPalette } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';
import { Col, Row, Nav, Tab, Card, Form, Button, Modal, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';

import { Checkbox } from "semantic-ui-react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { getDropDetailsById, updateDropDetails } from '../../Redux/actions/dropManagementActions';
import axios from 'axios';
import { Auth } from "aws-amplify";
import TimePicker from "react-time-picker";
import { Routes } from "../../routes";



export default () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [validated, setValidated] = useState(false);
    const [showDefault, setShowDefault] = useState(false);
    const [outBoundDepartureDate, setOutBoundDepartureDate] = useState('');
    const [outBoundArrivalDate, setOutBoundArrivalDate] = useState('');
    const [returnDepartureDate, setReturnDepartureDate] = useState('');
    const [returnArrivalDate, setReturnArrivalDate] = useState('');
    const { register, handleSubmit, setValue } = useForm();
    const queryDropId = localStorage.dropId;
    const [dropDetailsData, setDropDetailsData] = useState({});
    const [outboundDepaturetime, setOutboundDepaturetime] = useState("");
    const [outboundArrivaltime, setOutboundArrivaltime] = useState("");
    const [returnDepaturetime, setReturnDepaturetime] = useState("");
    const [returnArrivaltime, setReturnArrivaltime] = useState("");
    const [modalMessageError, setModalMessageError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [airportCodes, setAirportCodes] = useState([]);
    const [flightCarrierIds, setflightCarrierIds] = useState([]);
    const [hotelIds, sethotelIds] = useState([]);
    const [destinationIds, setdestinationIds] = useState([]);
    const [shouldRedirect,setShouldRedirect]=useState(false);

    const onChangeOutBound = time => {
        if(time!==null)
        setOutboundDepaturetime(time + ":00");
    }

    const onChangeOutBoundArrival = time => { 
         if(time!==null)
        setOutboundArrivaltime(time + ":00");
    }
    const onChangeReturn = time => {
        if(time!==null)
        setReturnDepaturetime(time + ":00");
    }
    const onChangeReturnArrival = time => 
    {  if(time!==null)
        setReturnArrivaltime(time + ":00");
    }
    const getAirportApiUrl = process.env.REACT_APP_OPS_URL + '/ops/airport/?size=90';
    const getCarrierUrl = process.env.REACT_APP_OPS_URL + '/ops/flightCarrier/?size=100';
    const getHotelsUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/?size=100';
    const getDestinationUrl = process.env.REACT_APP_OPS_URL + '/ops/cities/?size=20';

    const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/dropService/';
    useEffect(() => {
        const fetchData = async () => {
            const session = await Auth.currentSession();
            const token = session.idToken.jwtToken;
            axios({
                url: apiUrl + queryDropId,
                method: "get",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                let dropDetailsbyid = response.data;
                setDropDetailsData(dropDetailsbyid);
                console.log('dropDetailsbyid===', dropDetailsbyid);
                setValue('id', queryDropId);
                setValue('status', dropDetailsbyid['status']);
                setValue('soldOut', dropDetailsbyid['soldOut']);
                setValue('destinationId', dropDetailsbyid['destinationId']);
                // setValue('outboundFlight.departureDate', dropDetailsbyid.outboundFlight ? moment(dropDetailsbyid.outboundFlight['departureDate']).format("YYYY-MM-DD") : "");
                setOutBoundDepartureDate(dropDetailsbyid.outboundFlight ? moment(dropDetailsbyid.outboundFlight['departureDate']).format("YYYY-MM-DD") : "")
                setOutboundDepaturetime(dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['departureTime'] : null);
                // setValue('outboundFlight.departureTime', dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['departureTime'] : "");
                setValue('outboundFlight.departureAirportCode', dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['departureAirportCode'] : "");
                // setValue('outboundFlight.arrivalDate', dropDetailsbyid.outboundFlight ? moment(dropDetailsbyid.outboundFlight['arrivalDate']).format("YYYY-MM-DD") : "");
                setOutBoundArrivalDate(dropDetailsbyid.outboundFlight ? moment(dropDetailsbyid.outboundFlight['arrivalDate']).format("YYYY-MM-DD") : "");
                setOutboundArrivaltime(dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['arrivalTime'] : null);
                // setValue('outboundFlight.arrivalTime', dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['arrivalTime'] : "");
                setValue('outboundFlight.arrivalAirportCode', dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['arrivalAirportCode'] : "");
                setValue('outboundFlight.flightCarrierId', dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['flightCarrierId'] : "");
                setValue('outboundFlight.flightNum', dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['flightNum'] : "");
                setValue('outboundFlight.bookingEmail', dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['bookingEmail'] : "");
                setValue('outboundFlight.bookingRef', dropDetailsbyid.outboundFlight ? dropDetailsbyid.outboundFlight['bookingRef'] : "");
                setReturnDepartureDate(dropDetailsbyid.returnFlight ? moment(dropDetailsbyid.returnFlight['departureDate']).format("YYYY-MM-DD") : "");
                // setValue('returnFlight.departureDate', dropDetailsbyid.returnFlight ? moment(dropDetailsbyid.returnFlight['departureDate']).format("YYYY-MM-DD") : "");
                setReturnDepaturetime(dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['departureTime'] : null);
                // setValue('returnFlight.departureTime', dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['departureTime'] : "");
                setValue('returnFlight.departureAirportCode', dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['departureAirportCode'] : "");
                setReturnArrivalDate(dropDetailsbyid.returnFlight ? moment(dropDetailsbyid.returnFlight['arrivalDate']).format("YYYY-MM-DD") : "");
                // setValue('returnFlight.arrivalDate', dropDetailsbyid.returnFlight ? moment(dropDetailsbyid.returnFlight['arrivalDate']).format("YYYY-MM-DD") : "");
                setReturnArrivaltime(dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['arrivalTime'] : null);
                // setValue('returnFlight.arrivalTime', dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['arrivalTime'] : "");
                setValue('returnFlight.arrivalAirportCode', dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['arrivalAirportCode'] : "");
                setValue('returnFlight.flightCarrierId', dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['flightCarrierId'] : "");
                setValue('returnFlight.flightNum', dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['flightNum'] : "");
                setValue('returnFlight.bookingEmail', dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['bookingEmail'] : "");
                setValue('returnFlight.bookingRef', dropDetailsbyid.returnFlight ? dropDetailsbyid.returnFlight['bookingRef'] : "");
                setValue('hotelId', dropDetailsbyid['hotelId']);
                setValue('dropAccomodation.roomType', dropDetailsbyid.dropAccomodation ? dropDetailsbyid.dropAccomodation['roomType'] : "");
                setValue('dropAccomodation.breakfastIncluded', dropDetailsbyid.dropAccomodation ? dropDetailsbyid.dropAccomodation['breakfastIncluded'] : false);
            }).catch(error => {
                console.log(error)
            })
            ///
            axios({
                url: getAirportApiUrl,
                method: "get",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                setAirportCodes(response.data);
            }).catch(error => {
                console.log(error)
            })
            axios({
                url: getCarrierUrl,
                method: "get",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                setflightCarrierIds(response.data.content);
            }).catch(error => {
                console.log(error)
            })
            axios({
                url: getDestinationUrl,
                method: "get",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                setdestinationIds(response.data);
            }).catch(error => {
                console.log(error)
            })

            axios({
                url: getHotelsUrl,
                method: "get",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                sethotelIds(response.data.content);
            }).catch(error => {
                console.log(error)
            })
        }
        fetchData();
    }, [])

 

    const handleClose = () => 
    {setShowDefault(false);
        if(shouldRedirect&&isFormValid)
        history.push("/DropManagementDetails")
    }


    const onSubmit = ((data, event) => {
        const form = event.target;
        setIsFormValid(true);
        if (form.checkValidity() === false) {
            setIsFormValid(false);
            event.preventDefault();
            event.stopPropagation();
            setModalMessageError("please fill all the fields in all the sections")

        }
        setValidated(true);
        const requestBody = {
            dropId: queryDropId,
            title: dropDetailsData.title,
            start_date: moment(dropDetailsData.start_date).format("YYYY-MM-DD"),
            travelStartDate: moment(dropDetailsData.travelStartDate).format("YYYY-MM-DD"),
            travelEndDate: moment(dropDetailsData.travelEndDate).format("YYYY-MM-DD"),
            destinationId: data['destinationId'],
            hotelId: data['hotelId'],
            pax: dropDetailsData.pax,
            totalUnits: dropDetailsData.totalUnits,
            price: dropDetailsData.price,
            packageImage: dropDetailsData.packageImage,
            description: dropDetailsData.description,
            rtoldocUrl: dropDetailsData.rtoldocUrl,
            soldOut: data['soldOut'],
            status: data['status'],
            dropAccomodation: data['dropAccomodation'],
            outboundFlight: {
                departureDate: moment(outBoundDepartureDate).format('YYYY-MM-DD'),
                departureTime: outboundDepaturetime,
                departureAirportCode: data.outboundFlight.departureAirportCode,
                arrivalDate: moment(outBoundArrivalDate).format('YYYY-MM-DD'),
                arrivalTime: outboundArrivaltime,
                arrivalAirportCode: data.outboundFlight.arrivalAirportCode,
                flightCarrierId: data.outboundFlight.flightCarrierId,
                flightNum: data.outboundFlight.flightNum,
                bookingEmail: data.outboundFlight.bookingEmail,
                bookingRef: data.outboundFlight.bookingRef
            },
            returnFlight: {
                departureDate: moment(returnDepartureDate).format('YYYY-MM-DD'),
                departureTime: returnDepaturetime,
                departureAirportCode: data.returnFlight.departureAirportCode,
                arrivalDate: moment(returnArrivalDate).format('YYYY-MM-DD'),
                arrivalTime: returnArrivaltime,
                arrivalAirportCode: data.returnFlight.arrivalAirportCode,
                flightCarrierId: data.returnFlight.flightCarrierId,
                flightNum: data.returnFlight.flightNum,
                bookingEmail: data.returnFlight.bookingEmail,
                bookingRef: data.returnFlight.bookingRef
            },
        }

        if (form.checkValidity() === true) {
        dispatch(updateDropDetails(requestBody));
        }
        setShowDefault(true);
    }
    );

    const updateDropManagement = useSelector(state => state.updateDropDetails.updateDropDetails.data);
    const updateDropManagementError = useSelector(state => state.updateDropDetails.error);
    useEffect(()=>{
        if(updateDropManagementError===null)
        setShouldRedirect(true);
        else
        setShouldRedirect(false);
    },[updateDropManagementError])
    const modalMessage = (updateDropManagementError === null ? updateDropManagement : updateDropManagementError)

    return (
        <div>
            <Tab.Container defaultActiveKey="dropDetails">
                <Row>
                    <Col lg={12}>
                        <Nav className="nav-tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="dropDetails" className="mb-sm-3 mb-md-0">
                                    Drop Details
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="dropDestinationAndFlights" className="mb-sm-3 mb-md-0">
                                    Drop Destination & Flights
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="dropAccommodation" className="mb-sm-3 mb-md-0">
                                    Drop Accommodation
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col lg={12}>
                        <Tab.Content>
                            <Tab.Pane eventKey="dropDetails" className="py-4">
                                <Card border="light" className="bg-white shadow-sm mb-4">
                                    <Card.Body>
                                        {/*<h5 className="mb-4">General information</h5>*/}
                                        <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="dropId">
                                                        <Form.Label>Drop ID</Form.Label>
                                                        <Form.Control required type="number" readOnly {...register("id")} placeholder="" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="dropStatus">
                                                        <Form.Label>Drop Status</Form.Label>
                                                        <Form.Control required type="text"  {...register("status")} placeholder="" />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Drop Status.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="soldout">
                                                        <Form.Check type="checkbox" label="Sold out" {...register("soldOut")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/* <Button variant="danger" className="m-1" onClick={closeDropDetails}>Close</Button> */}
                                            <Button variant="danger" as={Link} to={Routes.DropManagementDetails.path} className="m-1">Cancel</Button>
                                            <Button variant="success" type="submit" className="m-1">Update</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="dropDestinationAndFlights" className="py-4">
                                <Card border="light" className="bg-white shadow-sm mb-4">
                                    <Card.Body>
                                        {/*<h5 className="mb-4">General information</h5>*/}
                                        <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group>
                                                            <Form.Label>Destination</Form.Label>
                                                            {destinationIds.length>0&&
                                                            <Form.Select required type="" {...register("destinationId")}>
                                                                <option disabled selected value="">Select Destination</option>
                                                                {destinationIds.map(({ cityId, cityName }, index) => <option value={cityId} >{cityName}</option>)}
                                                            </Form.Select>
                                                            }
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Destination.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                </Col>
                                            </Row>
                                            <h5 className="mb-4 ">Outbound Flight</h5>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outbounddeparturedate">
                                                        <Form.Label>Departure date</Form.Label>
                                                        <Datetime
                                                            timeFormat={false}
                                                            onChange={setOutBoundDepartureDate}
                                                            renderInput={(props, openCalendar) => (
                                                                <InputGroup>
                                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        value={outBoundDepartureDate ? moment(outBoundDepartureDate).format("DD/MM/YYYY") : ""}
                                                                        placeholder="DD/MM/YYYY"
                                                                        onFocus={openCalendar} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a Departure date.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            )} />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outbounddeparturetime">
                                                        <Form.Label>Departure time</Form.Label>
                                                        <div style={{ marginTop: "10px" }}>
                                                            <TimePicker
                                                                onChange={onChangeOutBound}
                                                                value={outboundDepaturetime}
                                                                locale="sv-sv"
                                                                disableClock={true}
                                                                clearIcon={null}
                                                            />
                                                        </div>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Departure time.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outbounddepartureairport">
                                                        <Form.Label>Departure airport</Form.Label>
                                                        {airportCodes.length>0&&
                                                        <Form.Select required type="" {...register("outboundFlight.departureAirportCode")} >
                                                        <option disabled selected value="">Select Departure airport</option>
                                                            {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                        </Form.Select>}
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Departure airport.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outboundarrivaldate">
                                                        <Form.Label>Arrival date</Form.Label>
                                                        <Datetime
                                                            timeFormat={false}
                                                            onChange={setOutBoundArrivalDate}
                                                            renderInput={(props, openCalendar) => (
                                                                <InputGroup>
                                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        value={outBoundArrivalDate ? moment(outBoundArrivalDate).format("DD/MM/YYYY") : ""}
                                                                        placeholder="DD/MM/YYYY"
                                                                        onFocus={openCalendar} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a Arrival date.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            )} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outboundarrivaltime">
                                                        <Form.Label>Arrival time</Form.Label>
                                                        <div style={{ marginTop: "10px" }}>
                                                            <TimePicker
                                                                onChange={onChangeOutBoundArrival}
                                                                value={outboundArrivaltime}
                                                                locale="sv-sv"
                                                                disableClock={true}
                                                                clearIcon={null}
                                                            />
                                                        </div>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Arrival time.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outboundarrivalairport">
                                                        <Form.Label>Arrival airport</Form.Label>
                                                        {airportCodes.length>0&&
                                                        <Form.Select required type="" {...register("outboundFlight.arrivalAirportCode")}>
                                                        <option disabled selected value="">Select Departure airport</option>
                                                            {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                        </Form.Select>}
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Arrival airport.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outboundcarrier">
                                                        <Form.Label>Carrier</Form.Label>
                                                        {flightCarrierIds.length>0&&
                                                        <Form.Select required type="" {...register("outboundFlight.flightCarrierId")} >
                                                        <option disabled selected value="">Select Carrier</option>
                                                            {flightCarrierIds.map(({ carrierId, carrierName }, index) => <option value={carrierId} >{carrierName}</option>)}
                                                        </Form.Select>}
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Carrier.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outboundflightnumber">
                                                        <Form.Label>Flight Number</Form.Label>
                                                        <Form.Control required type="number" {...register("outboundFlight.flightNum")} placeholder="" />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Flight Number.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outboundbookingemail">
                                                        <Form.Label>Booking email</Form.Label>
                                                        <Form.Control required type="text" {...register("outboundFlight.bookingEmail")} placeholder="" />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Booking email.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="outboundbookingreference">
                                                        <Form.Label>Booking reference</Form.Label>
                                                        <Form.Control required type="text" {...register("outboundFlight.bookingRef")} placeholder="" />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Booking reference.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <h5 className="mb-4 ">Return Flight</h5>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returndeparturedate">
                                                        <Form.Label>Departure date</Form.Label>
                                                        <Datetime
                                                            timeFormat={false}
                                                            onChange={setReturnDepartureDate}
                                                            renderInput={(props, openCalendar) => (
                                                                <InputGroup>
                                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        value={returnDepartureDate ? moment(returnDepartureDate).format("DD/MM/YYYY") : ""}
                                                                        placeholder="DD/MM/YYYY"
                                                                        onFocus={openCalendar} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a Departure date.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            )} />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returndeparturetime">
                                                        <Form.Label>Departure time</Form.Label>
                                                        <div style={{ marginTop: "10px" }}>
                                                            <TimePicker
                                                                onChange={onChangeReturn}
                                                                value={returnDepaturetime}
                                                                locale="sv-sv"
                                                                disableClock={true}
                                                                clearIcon={null}
                                                            />
                                                        </div>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Departure time.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returndepartureairport">
                                                        <Form.Label>Departure airport</Form.Label>
                                                        {airportCodes.length>0&&
                                                        <Form.Select required type="" {...register("returnFlight.departureAirportCode")} >
                                                        <option disabled selected value="">Select Departure airport</option>
                                                            {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                        </Form.Select>}
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Departure airport.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returnarrivaldate">
                                                        <Form.Label>Arrival date</Form.Label>
                                                        <Datetime
                                                            timeFormat={false}
                                                            onChange={setReturnArrivalDate}
                                                            renderInput={(props, openCalendar) => (
                                                                <InputGroup>
                                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        value={returnArrivalDate ? moment(returnArrivalDate).format("DD/MM/YYYY") : ""}
                                                                        placeholder="DD/MM/YYYY"
                                                                        onFocus={openCalendar} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a Arrival date.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            )} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returnarrivaltime">
                                                        <Form.Label>Arrival time</Form.Label>
                                                        <div style={{ marginTop: "10px" }}>
                                                            <TimePicker
                                                                onChange={onChangeReturnArrival}
                                                                value={returnArrivaltime}
                                                                locale="sv-sv"
                                                                disableClock={true}
                                                                clearIcon={null}
                                                            />
                                                        </div>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Arrival time.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returnarrivalAirport">
                                                        <Form.Label>Arrival airport</Form.Label>
                                                        {airportCodes.length>0&&
                                                        <Form.Select required type="text" {...register("returnFlight.arrivalAirportCode")}>
                                                        <option disabled selected value="">Select Departure airport</option>
                                                            {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                        </Form.Select>}
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Arrival airport.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returncarrier">
                                                        <Form.Label>Carrier</Form.Label>
                                                        {flightCarrierIds.length>0&&
                                                        <Form.Select required type="number" {...register("returnFlight.flightCarrierId")} >
                                                        <option disabled selected value="">Select Carrier</option>
                                                            {flightCarrierIds.map(({ carrierId, carrierName }, index) => <option value={carrierId} >{carrierName}</option>)}
                                                        </Form.Select>}
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Carrier.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returnflightnumber">
                                                        <Form.Label>Flight Number</Form.Label>
                                                        <Form.Control required type="number" {...register("returnFlight.flightNum")} placeholder="" />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Flight Number.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returnbookingemail">
                                                        <Form.Label>Booking email</Form.Label>
                                                        <Form.Control required type="text" {...register("returnFlight.bookingEmail")} placeholder="" />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Booking email.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="returnbookingreference">
                                                        <Form.Label>Booking reference</Form.Label>
                                                        <Form.Control required type="text" {...register("returnFlight.bookingRef")} placeholder="" />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Booking reference.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/* <Button variant="danger" className="m-1" onClick={closeDropDetails}>Close</Button> */}
                                            <Button variant="danger" as={Link} to={Routes.DropManagementDetails.path} className="m-1">Cancel</Button>
                                            <Button variant="success" type="submit" className="m-1">Update</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="dropAccommodation" className="py-4">
                                <Card border="light" className="bg-white shadow-sm mb-4">
                                    <Card.Body>
                                        {/*<h5 className="mb-4">General information</h5>*/}
                                        <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="hotel">
                                                        <Form.Label>Hotel</Form.Label>
                                                        {hotelIds.length>0&&
                                                        <Form.Select required type="" {...register("hotelId")}>
                                                        <option disabled selected value="">Select Hotel</option>
                                                                {hotelIds.map(({ hotelId, hotelName }, index) => <option value={hotelId} >{hotelName}</option>)}
                                                        </Form.Select>}
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Hotel.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="roomtype">
                                                        <Form.Label>Room type</Form.Label>
                                                        <Form.Control required type="text" {...register("dropAccomodation.roomType")} placeholder="" />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Room type.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="breakfast">
                                                        <Form.Check type="checkbox" label="Breakfast" {...register("dropAccomodation.breakfastIncluded")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/* <Button variant="danger" className="m-1" onClick={closeDropDetails}>Close</Button> */}
                                            <Button variant="danger" as={Link} to={Routes.DropManagementDetails.path} className="m-1">Cancel</Button>
                                            <Button variant="success" type="submit" className="m-1">Update</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Update Drop Details</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                {!isFormValid ?
                    <Modal.Body>
                        <p> {modalMessageError}</p>
                    </Modal.Body> : <Modal.Body><p>{modalMessage}</p></Modal.Body>}
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};