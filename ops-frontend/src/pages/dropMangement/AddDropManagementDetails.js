import React, { useState,useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Col, Row, Card, Form, Button, Modal, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addDropDetailsRequest } from '../../Redux/actions/dropManagementActions';
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';
import { Routes } from "../../routes";
import axios from 'axios';
import { Auth } from "aws-amplify";


export default function AddDropManagementDetails() {
    const [validated, setValidated] = useState(false);
    const [starDate, setStarDate] = useState('');
    const [travelStartDate, setTravelStartDate] = useState('');
    const [travelEndDate, setTravelEndDate] = useState('');
    const [showDefault, setShowDefault] = useState(false);
    const [modalMessageError, setModalMessageError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [destinationIds, setdestinationIds] = useState([]);
    const [hotelIds, sethotelIds] = useState([]);
    const [isRedirecting,setIsRedirecting]=useState(false);

    const history=useHistory();

    const dispath = useDispatch();
    const { register, handleSubmit } = useForm();
    const addDropDetails = useSelector(state => state.addDropDetails.addDropDetailsResponse.error);

    ////////////////////
const getDestinationUrl = process.env.REACT_APP_OPS_URL + '/ops/cities/?size=20';
const getHotelsUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/?size=100';
useEffect(() => {
  const fetchData = async () => {
      const session = await Auth.currentSession();
      const token = session.idToken.jwtToken;
      axios({
          url: getDestinationUrl,
          method: "get",
          headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
          },
      }).then((response) => {
        //   console.log("getDestinationUrl====", response.data);
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
        //   console.log("getHotelsUrl======", response.data.content);
          sethotelIds(response.data.content);
      }).catch(error => {
          console.log(error)
      })
  };

  fetchData()

}, []);
  ////////////////////////////
    const onSubmit = ((data, event) => {
        var requestBody = data;
        const form = event.target;
        setIsFormValid(true);
        if (form.checkValidity() === false) {
            console.log("form validity false");
            setIsFormValid(false);
            event.preventDefault();
            event.stopPropagation();
            setModalMessageError("please fill all the fields in all the sections")
        }
        setValidated(true);
        const updatedRequestBodyData = {
            title: data['title'],
            start_date: moment(starDate).format("YYYY-MM-DD"),
            travelStartDate: moment(travelStartDate).format("YYYY-MM-DD"),
            travelEndDate: moment(travelEndDate).format("YYYY-MM-DD"),
            destinationId: data['destinationId'],
            hotelId: data['hotelId'],
            pax: data['pax'],
            totalUnits: data['totalUnits'],
            price: data['price'],
            packageImage: data['packageImage'],
            description: data['description'],
            rtoldocUrl: data['rtoldocUrl'],
        }
        if (form.checkValidity() === true) {
            console.log("dispatching add request");
        dispath(addDropDetailsRequest(updatedRequestBodyData));
        }
        setShowDefault(true);
    }
    );
    const addDropManagement = useSelector(state => state.addDropDetails.addDropDetailsResponse.data);
    const addDropManagementError = useSelector(state => state.addDropDetails.error);
    useEffect(()=>{
        if(addDropManagementError===null)
        setIsRedirecting(true);
        else
        setIsRedirecting(false);
    })
    const addModalMessage = (addDropManagementError === null ? addDropManagement : addDropManagementError)

    const handleClose = () =>{
         setShowDefault(false);
         if(isRedirecting===true){
             history.push("/DropManagementDetails");
         }
    }
    return (
        <div>
            <h4 className="mb-4">Add Drop Management Details</h4>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required type="text"  {...register("title")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a title.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="startdate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Datetime
                                        timeFormat={false}
                                        onChange={setStarDate}
                                        renderInput={(props, openCalendar) => (
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={starDate ? moment(starDate).format("DD/MM/YYYY") : ""}
                                                    placeholder="DD/MM/YYYY"
                                                    onFocus={openCalendar} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a start date.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        )} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="travelstartdate">
                                    <Form.Label>Travel Start Date</Form.Label>
                                    <Datetime
                                        timeFormat={false}
                                        onChange={setTravelStartDate}
                                        renderInput={(props, openCalendar) => (
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={travelStartDate ? moment(travelStartDate).format("DD/MM/YYYY") : ""}
                                                    placeholder="DD/MM/YYYY"
                                                    onFocus={openCalendar} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a travel start date.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        )} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="travelenddate">
                                    <Form.Label>Travel End Date</Form.Label>
                                    <Datetime
                                        timeFormat={false}
                                        onChange={setTravelEndDate}
                                        renderInput={(props, openCalendar) => (
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={travelEndDate ? moment(travelEndDate).format("DD/MM/YYYY") : ""}
                                                    placeholder="DD/MM/YYYY"
                                                    onFocus={openCalendar} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a travel end date.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        )} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="destinationid">
                                    <Form.Label>Destination Id</Form.Label>
                                    <Form.Select required type="" {...register("destinationId")}  >
                                    <option disabled selected value="">Select Destination</option>
                                    {destinationIds.map(({ cityId, cityName }, index) => <option value={cityId} >{cityName}</option>)}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a Destination Id.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="hotelid">
                                    <Form.Label>Hotel Id</Form.Label>
                                    <Form.Select required type="" {...register("hotelId")}  >
                                    <option disabled selected value="">Select Hotel</option>
                                        {hotelIds.map(({ hotelId, hotelName }, index) => <option value={hotelId} >{hotelName}</option>)}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a Hotel Id.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="pax">
                                    <Form.Label>Pax</Form.Label>
                                    <Form.Control required type="number" {...register("pax")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a Pax.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="totalunits">
                                    <Form.Label>Total Units</Form.Label>
                                    <Form.Control required type="number" {...register("totalUnits")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a Total Units.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required type="text" {...register("price")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a Price.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="packageImage">
                                    <Form.Label>Package Image</Form.Label>
                                    <Form.Control required type="text" {...register("packageImage")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a Package Image.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="3" required type="text" {...register("description")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a Description.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="rtoldocUrl">
                                    <Form.Label>RTolDocUrl</Form.Label>
                                    <Form.Control required type="text" {...register("rtoldocUrl")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a RTolDocUrl.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="danger" as={Link} to={Routes.DropManagementDetails.path} className="m-1">Cancel</Button>
                        <Button variant="success" type="submit" className="m-1">Save</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Add Drop Management Details</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                {!isFormValid ?
                    <Modal.Body>
                        <p> {modalMessageError}</p>
                    </Modal.Body> : <Modal.Body><p>{addModalMessage}</p></Modal.Body>}
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}