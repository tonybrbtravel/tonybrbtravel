
import React, { useState,useEffect } from "react";
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faLaptopCode, faPalette } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Col, Row, Nav, Tab, Card, Form, Button,Modal, Container, InputGroup } from '@themesberg/react-bootstrap';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { getHotelDetailsById,updateHotelDetails,deleteHotelDetails } from "../../Redux/actions/hotelManagementActions";
import axios from "axios";
import { Auth } from "aws-amplify";
import ImageUploader from "react-images-upload";
import { Routes } from "../../routes";

export default () => {
    var requestBody;
    var hotelDetailsbyid;
    const history = useHistory();
    const dispath = useDispatch();
    const location = useLocation();
    const queryid = localStorage.hotelId;
    const { register, handleSubmit ,setValue} = useForm();
    const [showDefault, setShowDefault] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isFormValid,setIsFormValid] =useState(false);
    const [destinationIds, setdestinationIds] = useState([]);
    const [isRedirecting,setIsRedirecting]=useState(false);
    const handleClose = () => {setShowDefault(false);
    if(isRedirecting===true){
        history.push("/HotelManagementDetails")
    }
       }
    const [uploadImages, setUploadImages] = useState([]);
    const [defaultImages ,setDefaultImages] = useState([]);
    const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/';
    const getDestinationUrl = process.env.REACT_APP_OPS_URL + '/ops/cities/?size=10';
    useEffect(() => {
        async function fetchData() {
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
        axios({
            url: apiUrl + queryid,
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            hotelDetailsbyid = response.data;
            console.log('bnnnnnnnnnnnnnnnnn......', hotelDetailsbyid);
            setValue('hotelName', hotelDetailsbyid['hotelName']);
            setValue('destinationId', hotelDetailsbyid.city.cityId);
            setValue('tripAdvisorId', hotelDetailsbyid['tripAdvisorId']);
            setValue('starRating', hotelDetailsbyid['starRating']);
            setValue('address', hotelDetailsbyid['address']);
            setValue('phone', hotelDetailsbyid['phone']);
            setValue('mapUrl', hotelDetailsbyid['mapUrl']);
            setValue('description', hotelDetailsbyid['description']);
            setValue('hotelDirection', hotelDetailsbyid['hotelDirection']);
            setValue('checkinDetails', hotelDetailsbyid['checkinDetails']);
            setValue('latitude', hotelDetailsbyid['latitude']);
            setValue('longitude', hotelDetailsbyid['longitude']);
        setDefaultImages( hotelDetailsbyid.hotelImage.map(x=>(x.imageUrl)))
        }).catch(error => {
            console.log(error)
        })

        
    }
    fetchData();
    }, [])
    //image uploader
    var images = [];
    const onDrop = (pictureFiles, pictureDataURLs) => {
        for (let i = 0; i < pictureDataURLs.length; i++) {
            var object_image = {
                "id": i,
                "imageUrl": pictureDataURLs[i],
                "hotelId": i
            }
            images.push(object_image)
        }
        setUploadImages(images)
    }
        //update Hotel Details
    const onSubmit = ((data,event) => {
        const form = event.target;
setIsFormValid(true);
if (form.checkValidity() === false) {

setIsFormValid(false);
event.preventDefault();
event.stopPropagation();
}  
        
        requestBody = data;
        // requestBody['contentUrl'] = "http://url.com";
        //requestBody['destinationId'] = 1
        requestBody['hotelImage'] = uploadImages
        // requestBody['hotelImage'] =  [
        //     {
        //         "id": 3,
        //         "imageUrl": "0980980",
        //         "hotelId": 2
        //     },
        //     {
        //         "id": 1,
        //         "imageUrl": "yujgig",
        //         "hotelId": 2
        //     },
        //     {
        //         "id": 2,
        //         "imageUrl": "0980980",
        //         "hotelId": 2
        //     }
        // ]
        requestBody['id'] = queryid;
        console.log("request",JSON.stringify(requestBody))
        if(form.checkValidity()===true){
        dispath(updateHotelDetails(requestBody));
        }
        setValidated(true)
        setShowDefault(true);
    }
    );
    const updatehotels = useSelector(state => state.updatehotelDetails.updatehotel.data);
    const updatehotelserror = useSelector(state => state.updatehotelDetails.error);

    const updatemodalMessage  = (updatehotelserror === null ? updatehotels : updatehotelserror);
    useEffect(()=>{
        if(updatehotelserror!==null)
        setIsRedirecting(false);
        else
        setIsRedirecting(true);
    })

// const defaultImages= [
//     "https://media.smarteragent.com/unsafe/http://cdn.photos.sparkplatform.com/fl/20190819183614687947000000-o.jpg",
//     "https://media.smarteragent.com/unsafe/http://cdn.photos.sparkplatform.com/fl/20190819183639357715000000-o.jpg",
//     "https://media.smarteragent.com/unsafe/http://cdn.photos.sparkplatform.com/fl/20190819183701098384000000-o.jpg"
//   ]

    return (
<div>
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Update Hotel Details</h5>
                <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="hotelname">
                                <Form.Label>Hotel Name</Form.Label>
                                <Form.Control type="text" {...register("hotelName")}/>
                                <Form.Control.Feedback type="invalid">
                                      Please provide a valid hotel name.
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="city">
                                <Form.Label>City</Form.Label>
                                {destinationIds.length>0&&
                                <Form.Select type="" {...register("destinationId")}>
                                        <option disabled selected value="">Select City</option>
                                        {destinationIds.map((x, index) => <option value={x.cityId}>{x.cityName}</option>)}
                                    </Form.Select>}
                                {/* <Form.Control  required type="" {...register("destinationId")}/> */}
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
                                <Form.Control type="" {...register("tripAdvisorId")} />
                                <Form.Control.Feedback type="invalid">
                                      Please provide a valid trip advisor link/id.
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="starrating">
                                <Form.Label>Star rating</Form.Label>
                                <Form.Control type="number" {...register("starRating")} />
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
                                <Form.Control   as="textarea" rows="3" type="" {...register("address")}/>
                                <Form.Control.Feedback type="invalid">
                                      Please provide a valid address.
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" {...register("phone")} />
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
                                <Form.Control type="" {...register("mapUrl")} />
                                <Form.Control.Feedback type="invalid">
                                      Please provide a valid map URL.
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="hoteldescription">
                                <Form.Label>Hotel Description </Form.Label>
                                <Form.Control  as="textarea" rows="3" type="" {...register("description")}/>
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
                                <Form.Control type="" {...register("hotelDirection")}/>
                                <Form.Control.Feedback type="invalid">
                                      Please provide valid hotel directions.
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="checkindetails">
                                <Form.Label>Check In Details</Form.Label>
                                <Form.Control  as="textarea" rows="3" type="" {...register("checkinDetails")}/>
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
                                <Form.Control type="" {...register("latitude")}/>
                                <Form.Control.Feedback type="invalid">
                                      Please provide a valid lattitude.
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="longitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control type="" {...register("longitude")}/>
                                <Form.Control.Feedback type="invalid">
                                      Please provide a valid longitude.
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            {/*<Form.Group id="adress">
                                <Form.Label>5 Images (Uploaded by us)</Form.Label>
                                <Form.Control required type="file" />
    </Form.Group>*/}
                            <ImageUploader
                                withIcon={false}
                                withPreview={true}
                                buttonText="Choose images"
                                onChange={onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880}
                                defaultImages={defaultImages}
                              />
                        </Col>
                    </Row>
                    <Button variant="danger" as={Link} to={Routes.HotelManagementDetails.path} className="m-1">Cancel</Button>
        <Button variant="success"  type="submit" className="m-1">Update</Button>

                </Form>
            </Card.Body>

        </Card>
        {isFormValid&&
        <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Update Hotel</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p> {updatemodalMessage} </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
}
        </div>
        




    );
};