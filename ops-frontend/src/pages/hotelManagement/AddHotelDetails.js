import React, { useState,useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Routes } from "../../routes";
import { Link, useHistory, withRouter } from 'react-router-dom';
import ImageUploader from "react-images-upload";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faLaptopCode, faPalette } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Col, Row, Nav, Tab, Card, Form, Button, Modal, Container, InputGroup } from '@themesberg/react-bootstrap';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addHotelDetails } from '../../Redux/actions/hotelManagementActions';
import { Auth } from "aws-amplify";
import axios from 'axios';


export default () => {
    var requestBody;
    const [showDefault, setShowDefault] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isFormValid,setIsFormValid]=useState(false);
    const [destinationIds, setdestinationIds] = useState([]);
    const dispath = useDispatch();
    const { register, handleSubmit } = useForm();
    const [uploadImages, setUploadImages] = useState([]);
    const [isRedirecting,setIsRedirecting]=useState(false);
    const history=useHistory();
    const handleClose = () =>{ 
        setShowDefault(false);
        if(isRedirecting===true)
        history.push("/HotelManagementDetails")
    }

    var images = [];
    const onDrop = (pictureFiles, pictureDataURLs) => {
        for (let i = 0; i < pictureDataURLs.length; i++) {
            var object_image = {
                "imageUrl": pictureDataURLs[i]
            }
            images.push(object_image)
        }
        setUploadImages(images)
    }
    const onSubmit = ((data, event) => {
        const form = event.target;
setIsFormValid(true);
if (form.checkValidity() === false) {
setIsFormValid(false);
event.preventDefault();
event.stopPropagation();
}  
        requestBody = data;
        // requestBody['contentUrl'] = "http://url.com";
        requestBody['hotelImage'] = uploadImages;
        setValidated(true)
        if(form.checkValidity()===true){
        dispath(addHotelDetails(requestBody));
        }
        setShowDefault(true);
    }
    );
    const getDestinationUrl = process.env.REACT_APP_OPS_URL + '/ops/cities/?size=20';

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
                setdestinationIds(response.data);
            }).catch(error => {
                console.log(error)
            })

        };

        fetchData()

    }, []);

    const addhotel = useSelector(state => state.addHotelDetails.addhotel.data);
    const addhotelserror = useSelector(state => state.addHotelDetails.error);
    const addmodalMessage = (addhotelserror === null ? addhotel : addhotelserror);
    useEffect(()=>{
        if(addhotelserror===null){
            setIsRedirecting(true);
        }
        else{
            setIsRedirecting(false);
        }
    },[addhotelserror])
   
    return (
        <div>
            <h4 className="mb-4">Add Hotel Details</h4>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    {/*<h5 className="mb-4">Add Hotel</h5>*/}
                    <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="hotelname">
                                    <Form.Label>Hotel Name</Form.Label>
                                    <Form.Control required type="text"  {...register("hotelName")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid hotel name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Select required type="" {...register("destinationId")}>
                                        <option disabled selected value="">Select City</option>
                                        {destinationIds.map(({ cityId, cityName }, index) => <option value={cityId} >{cityName}</option>)}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid City.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="tripadvisorid">
                                    <Form.Label>Tripadvisor link / id</Form.Label>
                                    <Form.Control required type="" {...register("tripAdvisorId")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid trip advisor link/id.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="starrating">
                                    <Form.Label>Star rating</Form.Label>
                                    <Form.Control required type="number" {...register("starRating")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid star rating.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="adress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control as="textarea" rows="3" required type="" {...register("address")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control required type="" {...register("phone")} placeholder="" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid phone number.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="mapurl">
                                    <Form.Label>Map URL</Form.Label>
                                    <Form.Control required type="" {...register("map_url")} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid map URL.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="hoteldescription">
                                    <Form.Label>Hotel Description</Form.Label>
                                    <Form.Control as="textarea" rows="3" required type=""  {...register("description")} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid hotel description.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="hoteldirections">
                                    <Form.Label>Hotel Directions</Form.Label>
                                    <Form.Control required type="" {...register("hotelDirection")} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide valid hotel directions.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="checkindetails">
                                    <Form.Label>Check In Details</Form.Label>
                                    <Form.Control as="textarea" rows="3" required type="" {...register("checkinDetails")} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide  valid Check in details.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="lattitude">
                                    <Form.Label>Lattitude</Form.Label>
                                    <Form.Control required type="" {...register("latitude")} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid lattitude.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="longitude">
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control required type="" {...register("longitude")} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid longitude.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                {/*<Form.Group id="imagesUpload">
                                    <Form.Label>5 Images (Uploaded by us)</Form.Label>
                                    <Form.Control required type="file" multiple onChange={onFileChange} />
    </Form.Group>*/}
                                <ImageUploader
                                    withIcon={false}
                                    withPreview={true}
                                    buttonText="Choose images"
                                    onChange={onDrop}
                                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                    maxFileSize={5242880}
                                />
                            </Col>
                        </Row>
                        <Button variant="danger" as={Link} to={Routes.HotelManagementDetails.path} className="m-1">Cancel</Button>
                        <Button variant="success" type="submit" className="m-1">Save</Button>
                    </Form>
                </Card.Body>

            </Card>
            {/*<Button variant="danger" className="m-1">Cancel</Button>
            <Button variant="success" className="m-1">Save</Button>*/}
             {isFormValid&&
            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Add Hotel</Modal.Title>
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