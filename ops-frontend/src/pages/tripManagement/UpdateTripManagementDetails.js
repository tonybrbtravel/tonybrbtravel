
import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faLaptopCode, faPalette } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Col, Row, Nav, Tab, Card, Form, Button, Modal, FormCheck, Container, InputGroup, ListGroup, ListGroupItem } from '@themesberg/react-bootstrap';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { getTripDetailsById } from "../../Redux/actions/tripsManagementActions";
import axios from "axios";
import { useForm } from "react-hook-form";
import { deleteTripsDetails, updateTripsDetails, updateTripsDetailsFulfill } from "../../Redux/actions/tripsManagementActions";
import { Auth } from "aws-amplify";
import TimePicker from "react-time-picker";
import MultiSelect from "react-multi-select-component";
import { Routes } from "../../routes";


export default () => {
    var travellerCount = 0;
    var requestBody;
    var tripDetailsbyid;
    let brbUser, filteredAdditionalTravellerdata, tripTypesArray;
    const history = useHistory();
    const dispatch = useDispatch();
    const queryid = localStorage.tripid;
    const { register, handleSubmit, setValue, setError, clearErrors, getValues, formState: { errors } } = useForm();
    // Date picker states
    const [starDate, setStarDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [revealedOnDate, setRevealedOnDate] = useState('');
    const [outboundDepartureDate, setOutboundDepartureDate] = useState('');
    const [outboundArrivalDate, setOutboundArrivalDate] = useState('');
    const [returnDepartureDate, setReturnDepartureDate] = useState('');
    const [returnArrivalDate, setReturnArrivalDate] = useState('');
    // Time picker states
    const [outboundDepaturetime, setOutboundDepaturetime] = useState("");
    const [outboundArrivaltime, setOutboundArrivaltime] = useState("");
    const [returnDepaturetime, setReturnDepaturetime] = useState("");
    const [returnArrivaltime, setReturnArrivaltime] = useState("");
    const [preferredDepartureTime, setPreferredDepartureTime] = useState("");
    const [depaturetimeOutboundDestination2, setDepaturetimeOutboundDestination2] = useState("");
    const [preferredDepaturetimeDestination2, setPreferredDepaturetimeDestination2] = useState("");
    const [depaturetimeReturnFlightDestination2, setDepaturetimeReturnFlightDestination2] = useState("");
    const [arrivaltimeOutboundDestination2, setArrivaltimeOutboundDestination2] = useState("");
    const [arrivaltimeReturnFlightDestination2, setArrivaltimeReturnFlightDestination2] = useState("");
    // Component states
    const [validated, setValidated] = useState(false);
    const [additionalTravellersData, setAdditionalTravellersData] = useState([]);
    const [departureAirports, setDepartureAirports] = useState([]);
    const [excludedAirports, setExcludedAirports] = useState([]);
    const [tenDestinations, setTenDestinations] = useState([]);
    const [airportCodes, setAirportCodes] = useState([]);
    const [destinationIds, setdestinationIds] = useState([]);
    const [flightCarrierIds, setflightCarrierIds] = useState([]);
    const [hotelIds, sethotelIds] = useState([]);
    const [roomType, setRoomType] = useState([]);
    const [numTravellers, setNumTravellers] = useState(0);
    const [showDefault, setShowDefault] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [revealedStatus, setRevealedStatus] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [filteredAdditionalTravellerData, setFilteredAdditionalTravellerData] = useState([]);
    const [tripName, setTripName] = useState('');
    const [tripTheme, setTripTheme] = useState('');
    const [isStayCation, setIsStayCation] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [cityCount, setCityCount] = useState(0);
    const [tripDetailsResponse,setTripDetailsResponse]=useState([]);

    const [tripNetCreditValue, setTripNetCreditValue] = useState(0);
    const [tripNetPrice, setTripNetPrice] = useState(1);
    const [additionalTravellerCount, setAdditionalTravellerCount] = useState(1);
    const [totalTravellerCount, setTotalTravellerCount] = useState(0);
    const [currenttripPrice, setCurrentTripPrice] = useState(0);
    const [tripDetailsObject, setTripDetailsObject] = useState({});
    const [tripCreditValue, setTripCreditValue] = useState('');
    const [tripCancellationValue, setTripCancellationValue] = useState('');
    const [tripExtrasValue, setTripExtrasValue] = useState('');
    const [flightCost, setFlightCost] = useState(0.00);
    const [hotelCost, setHotelCost] = useState(0.00);
    const [feesAmt, setFeesAmt] = useState(0.00);
    const [extrasAmt, setExtrasAmt] = useState(0.00);
    const [flightRefund, setFlightRefund] = useState(0.00);
    const [hotelRefund, setHotelRefund] = useState(0.00);
    const [feesRefund, setFeesRefund] = useState(0.00);
    const [extrasRefund, setExtrasRefund] = useState(0.00);
    const [netTripCost, setNetTripCost] = useState(0.00);
    const [tripCostValue, setTripCostValue] = useState(0.00);
    const [tripCostRefund, setTripCostRefund] = useState(0.00);
    const [netgm, setNetgm] = useState('');
    const [customerIdFetched, setCustomerIdFetched] = useState('');
    const [customerMailFetched, setCustomerMailFetched] = useState('');
    const [customerStatusFetched, setCustomerStatusFetched] = useState('');
    const [customerNotesFetched, setCustomerNotesFetched] = useState('');
    const [netgmpercent, setNetgmpercent] = useState('');
    const [outboundDepartureDateDestination2, setOutboundDepartureDateDestination2] = useState('');
    const [outboundArrivalDateDestination2, setOutboundArrivalDateDestination2] = useState('');
    const [returnDepartureDateDestination2, setReturnDepartureDateDestination2] = useState('');
    const [returnArrivalDateDestination2, setReturnArrivalDateDestination2] = useState('');
    const [travellerCountApi, setTravellerCountApi] = useState(0);
    const [nights, setNights] = useState(0);
    const [additionalLength, setAdditionalLength] = useState(0);
    const [showCancelledBy, setShowCancelledBy] = useState(false);
    const [showSecondDestinationSection, setShowSecondDestinationSection] = useState(false);
    const [isRedirecting,setIsRedirecting]=useState(false);
    const [stripeCustomerId,setStripeCustomerId]=useState(false);
    const [topUpAmount,setTopUpAmt]=useState(0);
    const [tripPreference,setTripPreference]=useState(0);
    const [passportCountry,setPassportCountry]=useState('');
    const [hotelPreferences,setHotelPreferences]=useState([]);
    const [preferredActivities,setPreferredActivities]=useState([]);

    const [bookingreference, setBookingReference]=useState([]);
    const [tripTypes, setTripTypes]=useState([]);
 
    const handleTripStatusChange = (event) => {
        if (event.target.value === "4") {

            setShowCancelledBy(true);
        }
        else setShowCancelledBy(false);
        if (event.target.value === "2") {
            setRevealedStatus(true);
            setRevealedOnDate(moment());

        }
        else setRevealedStatus(false);
    }

    const handleRevealedOnChange = (event) => {
        setRevealedOnDate(event);
    }

    const fetchTripPriceApi = async () => {
       /* const session = await Auth.currentSession();
        const token = session.idToken.jwtToken;
        const tripPriceUrl = process.env.REACT_APP_TRIP_URL + '/trip-price/';

        const numberofNights = moment(endDate).diff(moment(starDate), 'days');
	
        const additionalTravellerCount = additionalTravellersData.length;
        var travellers = getValues('numberoftravellers');

       if(travellers!==''&&additionalTravellerCount>0&&numberofNights>0){
        axios({
            url: tripPriceUrl + travellers + "/" + additionalTravellerCount + "/" + numberofNights + "/",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            setCurrentTripPrice(response.data.tripPrice / 100);
        }).catch(error => {
            console.log(error)
        })
    }
    else{
        console.log("Invalid request");
    } */
    }

    useEffect(() => {
        fetchTripPriceApi();
    }, [additionalTravellersData])
    // Selectors
    const updatetrip = useSelector(state => state.updateTripDetails.updatetrip.data);
    const updateTripError = useSelector(state => state.updateTripDetails.error);
    const updateTrip=useSelector(state=>state.updateTripDetails);

    useEffect(()=>{
        if(updateTripError===null)
        setIsRedirecting(true);
        else
        setIsRedirecting(false);
    },[updateTripError])
    // const placeholderString="Anything|ChillOut|GoodEats|NightLife|Staycation"
    // Constants
    const tripStatus = [
        { key: "Created", value: 0, text: "Created" },
        { key: "Locked", value: 1, text: "Locked" },
        { key: "Revealed", value: 2, text: "Revealed" },
        { key: "Booked", value: 3, text: "Booked" },
        { key: "Deleted", value: 4, text: "Cancelled" },
        // { key: "Completed", value: 5, text: "Completed" }
    ]
    const apiUrl = process.env.REACT_APP_TRIP_URL + '/trip/trip-ops/';
    const getAirportApiUrl = process.env.REACT_APP_OPS_URL + '/ops/airport/?size=90';
    const getDestinationUrl = process.env.REACT_APP_OPS_URL + '/ops/cities/?size=20';
    const getCarrierUrl = process.env.REACT_APP_OPS_URL + '/ops/flightCarrier/getActiveCarriers/?size=90';
    const getHotelsUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/getActiveHotelDetails/?size=20';
    // Functions
    const handleClose = () => 
    {
        setShowDefault(false);
        if(isFormValid===true&&isRedirecting===true)
        history.push("/TripManagementDetails");
    }
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
    const onChangeReturnArrival = time => {
        if(time!==null)
    setReturnArrivaltime(time + ":00");
    }
    const onChangeOutBoundDestination2 = time => {
        if(time!==null)
        setDepaturetimeOutboundDestination2(time + ":00");
    }
    const onChangePreferredTimeDestination2 = time => setPreferredDepaturetimeDestination2(time);
    const onChangeReturnFligthDestination2 = time => 
    {
        if(time!==null)
        setDepaturetimeReturnFlightDestination2(time + ":00");
    }
    const onChangeArrivalOutBoundDestination2 = time => 
    {
        if(time!==null)
    setArrivaltimeOutboundDestination2(time + ":00");
    }
    const onChangeArrivalReturnFlightDestination2 = time => {
        if(time!==null)
        setArrivaltimeReturnFlightDestination2(time + ":00");
    }
    const deleteTrip = (() => {
        dispatch(deleteTripsDetails(queryid));
        history.push('/TripManagementDetails/')
    })
    const tripTypeArray = [{ label: "1", value: "Anything" },
    { label: "2", value: "Chill Out" },
    { label: "3", value: "Culture" },
    { label: "4", value: "Good Eats" },
    { label: "5", value: "Nightlife" },
    { label: "6", value: "Picturesque" },
    { label: "7", value: "Quirky" },
    { label: "8", value: "Romance" },
    { label: "9", value: "Staycation" }]

    const selectTripStatus = (tripStatusKey) => {
        var test = tripStatus.find(x => x.key === tripStatusKey);
        return test.value;
    }


    const getRoomOptions = (numTravellers) => {
        let obj;
        if (numTravellers === 1) {
            return obj = [{ "id": "Single Room", "name": "Single Room" }]

        }

        else if (numTravellers === 2) {
            return obj = [{ 'id': "Double Room", 'name': "Double Room" }, { 'id': "Twin Room", 'name': "Twin Room" }]

        }
        else if (numTravellers === 3) {
            return obj = [{ 'id': "1 Double Bed & 1 Single Bed", 'name': "1 Double Bed & 1 Single Bed" },
            { 'id': "3 Single Beds", 'name': "3 Single Beds" }]

        }
        else if (numTravellers === 4) {
            return obj = [{ 'id': "2 Double Beds", 'name': "2 Double Beds" },
            { 'id': "1 Double Bed & 2 Single Beds", 'name': "1 Double Bed & 2 Single Beds" },
            { 'id': "4 Single Beds", 'name': "4 Single Beds" }]

        }
        else {
            return []
        }
    }
    const handleEndDateChange = (event) => {
        setEndDate(event)

        var shouldShowError = moment(event).diff(moment(starDate), 'days') > 14 ? true : false;

        if (shouldShowError === true) {
            setError("endDate", {
                type: "max",
                message: "please enter a valid end date within 14 days of your start date"
            })

        }
        else {
            clearErrors('endDate')
        }
    }
    const handleTripCostSection = (event) => {

        let value, netCost, gm, gmpercent;
        if (event.target.name === "flightcost") {
            setFlightCost(parseFloat(event.target.value));
            value = (parseFloat(event.target.value) + parseFloat(hotelCost) + parseFloat(feesAmt) + parseFloat(extrasAmt)).toFixed(2);
            setTripCostValue(parseFloat(value));
            netCost = (value - tripCostRefund).toFixed(2);
            setNetTripCost(netCost);
            gm = (tripNetPrice - netCost).toFixed(2);
            setNetgm(gm);
            gmpercent = ((gm / tripNetPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);
        }
        if (event.target.name === "hotelscost") {
            setHotelCost(parseFloat(event.target.value));
            value = (parseFloat(event.target.value) + parseFloat(flightCost) + parseFloat(feesAmt) + parseFloat(extrasAmt)).toFixed(2);
            setTripCostValue(parseFloat(value));
            netCost = (value - tripCostRefund).toFixed(2);
            setNetTripCost(netCost);
            gm = (tripNetPrice - netCost).toFixed(2);
            setNetgm(gm);
            gmpercent = ((gm / tripNetPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);

        }
        if (event.target.name === "fees") {
            setFeesAmt(parseFloat(event.target.value));
            value = (parseFloat(event.target.value) + hotelCost + flightCost + extrasAmt).toFixed(2);
            setTripCostValue(parseFloat(value));
            netCost = (value - tripCostRefund).toFixed(2);
            setNetTripCost(netCost)

            gm = (tripNetPrice - netCost).toFixed(2);
            setNetgm(gm);
            gmpercent = ((gm / tripNetPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);
        }
        if (event.target.name === "extras") {
            setExtrasAmt(parseFloat(event.target.value));
            value = (parseFloat(event.target.value) + hotelCost + feesAmt + flightCost).toFixed(2);
            setTripCostValue(parseFloat(value));
            netCost = (value - tripCostRefund).toFixed(2);
            setNetTripCost(netCost);
            gm = (tripNetPrice - netCost).toFixed(2);
            setNetgm(gm);
            gmpercent = ((gm / tripNetPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);
        }
        if (event.target.name === "flightRefund") {
            setFlightRefund(parseFloat(event.target.value));
            value = (parseFloat(event.target.value) + hotelRefund + feesRefund + extrasRefund).toFixed(2);
            setTripCostRefund(parseFloat(value));
            netCost = (tripCostValue - value).toFixed(2);
            setNetTripCost(netCost);
            gm = (tripNetPrice - netCost).toFixed(2);
            setNetgm(gm);
            gmpercent = ((gm / tripNetPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);



        }
        if (event.target.name === "hotelRefund") {
            setHotelRefund(parseFloat(event.target.value));
            value = (parseFloat(event.target.value) + flightRefund + feesRefund + extrasRefund).toFixed(2);
            setTripCostRefund(value);
            netCost = (tripCostValue - value).toFixed(2);
            setNetTripCost(netCost);
            gm = (tripNetPrice - netCost).toFixed(2);
            setNetgm(gm);
            gmpercent = ((gm / tripNetPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);

        }
        if (event.target.name === "feesRefund") {
            setFeesRefund(parseFloat(event.target.value));
            value = (parseFloat(event.target.value) + hotelRefund + flightRefund + extrasRefund).toFixed(2);
            setTripCostRefund(value);
            netCost = (tripCostValue - value).toFixed(2);
            setNetTripCost(netCost)
            gm = (tripNetPrice - netCost).toFixed(2);
            setNetgm(gm);
            gmpercent = ((gm / tripNetPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);
        }
        if (event.target.name === "extrasRefund") {
            setExtrasRefund(parseFloat(event.target.value));
            value = (parseFloat(event.target.value) + hotelRefund + feesRefund + flightRefund).toFixed(2);
            setTripCostRefund(value);
            netCost = (tripCostValue - value).toFixed(2);
            setNetTripCost(netCost);
            gm = (tripNetPrice - netCost).toFixed(2);
            setNetgm(gm);
            gmpercent = ((gm / tripNetPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);
        }

    }
    // useEffect(()=>{
    //     fetchData();
    // },[airportCodes])

    useEffect(() => {
        async function fetchcustomerAPI(userid) {
            const session = await Auth.currentSession();
            const token = session.idToken.jwtToken;
            const getCustomerIdsUrl = process.env.REACT_APP_OPS_URL + '/ops/customers/'
            // inputId=;
            axios({
                url: getCustomerIdsUrl + userid,
                method: "get",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                //setCustomerIds(response.data);
                var customerDetailsbyid = response.data
                setValue('customeremailaddress', customerDetailsbyid.user ? customerDetailsbyid.user['email'] : "");
                setValue('subscriptiontype', customerDetailsbyid.subscription ? customerDetailsbyid.subscription['travellers'] + " travellers " + customerDetailsbyid.subscription['nights'] + " nights" : "");
                setValue('customerNotes', customerDetailsbyid.personalInfo ? customerDetailsbyid.personalInfo['internalNotes'] : "");

            }).catch(error => {
                console.log(error)
            })
        }
        async function fetchActivityInfo(customerId){
            const session = await Auth.currentSession();
            const token = session.idToken.jwtToken;
            const getCustomerIdsUrl = process.env.REACT_APP_OPS_URL + '/ops/customers/'
            // inputId=;
            axios({
                url: getCustomerIdsUrl + customerId,
                method: "get",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                //setCustomerIds(response.data);
                var customerDetailsbyid = response.data;
                console.log("for preferredactivities");
                console.log("customerDetailsbyid",customerDetailsbyid);
                setHotelPreferences(customerDetailsbyid.travellerPreference?customerDetailsbyid.travellerPreference.hotelPreferences.preferences.map(item=>(
                    {
                        // label: item.name,
                        id: item.id,
                        name: item.name
                    } 
                )):[]);               
                /*setPreferredActivities(customerDetailsbyid.travellerPreference?customerDetailsbyid.travellerPreference.preferredActivities.activities.map(item=>(
                    {
                        id: item.id,
                        name: item.name
                    } )):[]);*/
            }).catch(error => {
                console.log(error)
            })

        }
        async function getDropDownInformation(){
            const session = await Auth.currentSession();
            // fetchTripPriceApi();
            const token = session.idToken.jwtToken;
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
                url: getCarrierUrl,
                method: "get",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                setflightCarrierIds(response.data);
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
                sethotelIds(response.data);
            }).catch(error => {
                console.log(error)
            })
        }
      
        async function fetchData() {
            await getDropDownInformation();
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
                tripDetailsbyid = response.data;
                console.log(JSON.stringify(tripDetailsbyid));
                setTripDetailsObject(tripDetailsbyid);

                setCurrentTripPrice(tripDetailsbyid.tripDetails.tripPrice ? (tripDetailsbyid.tripDetails.tripPrice +  tripDetailsbyid.tripDetails.extraTravllersPrice) / 100 : "");

                //Destination and Flights details
                if (tripDetailsbyid.bookingInfoResponse.destinations != null && tripDetailsbyid.bookingInfoResponse.destinations[0] != null) {
                  setValue('destinationId', tripDetailsbyid.bookingInfoResponse.destinations[0] ? tripDetailsbyid.bookingInfoResponse.destinations[0].destinationId : "");
                  setReturnArrivaltime(tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.arrivalTime : "")
                  setOutboundDepartureDate(tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.departureDate : "");
                  setOutboundDepaturetime(tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.departureTime : "");
                  setValue('departureairport', tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.departureAirportCode : "");
                  setValue('departurePreference', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['departurePreference'] : '')
                  setOutboundArrivalDate(tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.arrivalDate : "");
                  setOutboundArrivaltime(tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.arrivalTime : "");
                  setValue('arrivalairport', tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.arrivalAirportCode : "");
                  setValue('carrier', tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.flightCarrierId : "");
                  setValue('flightnumber', tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.flightNumber : "");
                  setValue('bookingemail', tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.bookingEmail : "");
                  setValue('bookingreference', tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.bookingReference : "");
                  setReturnDepartureDate(tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.departureDate : "");
                  setReturnDepaturetime(tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.departureTime : "");
                  setValue('returndepartureairport', tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.departureAirportCode : "");
                  setValue('returndeparturetime', tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.departureTime : "");
                  setReturnArrivalDate(tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.arrivalDate : "");
                  setValue('returnarrivalairport', tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.arrivalAirportCode : "");
                  setValue('returncarrier', tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.flightCarrierId : "");
                  setValue('returnflightnumber', tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.flightNumber : "");
                  setValue('returnbookingemail', tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.bookingEmail : "");
                  setValue('returnbookingreference', tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.bookingReference : "");


                  //Accommodation
                  setValue('hotelId', tripDetailsbyid.bookingInfoResponse.destinations[0] ? tripDetailsbyid.bookingInfoResponse.destinations[0].hotelInfo[0].hotelId : "");
                  setValue('accommodationbookingReference', tripDetailsbyid.bookingInfoResponse.destinations[0] ? tripDetailsbyid.bookingInfoResponse.destinations[0].hotelInfo[0].bookingReference : "");
                  setValue('accroomtype', tripDetailsbyid.bookingInfoResponse.destinations[0] ? tripDetailsbyid.bookingInfoResponse.destinations[0].hotelInfo[0].roomType : "");
                  setValue('breakfastIncluded', tripDetailsbyid.bookingInfoResponse.destinations[0] ? tripDetailsbyid.bookingInfoResponse.destinations[0].hotelInfo[0].breakfastIncluded : false);

                  }
                  if (tripDetailsbyid.bookingInfoResponse.destinations != null && tripDetailsbyid.bookingInfoResponse.destinations[1] != null) {
                  setValue('destinationId2', tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse.destinations[1].destinationId : "");
                  setOutboundDepartureDateDestination2(tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.departureDate : "");
                  setDepaturetimeOutboundDestination2(tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.departureTime : "");
                  // setValue('departuretime', tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.departureTime : "");



                  //s2
                  setValue('departureairportDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.departureAirportCode : "");
                  setValue('departurePreferenceDestination2', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['departurePreference'] : '')
                  setOutboundArrivalDateDestination2(tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.arrivalDate : "");
                  setArrivaltimeOutboundDestination2(tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.arrivalTime : "");
                  // setValue('arrivaltime', tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightOutBoundDetails.arrivalTime : "");

                                //s2
                                setValue('arrivalairportDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.arrivalAirportCode : "");
                                setValue('carrierDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.flightCarrierId : "");
                                setValue('flightnumberDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.flightNumber : "");
                                setValue('bookingemailDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.bookingEmail : "");
                                setValue('bookingreferenceDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightOutBoundDetails.bookingReference : "");
                                //return details

                                //s2
                                setReturnDepartureDateDestination2(tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.departureDate : "");
                                setDepaturetimeReturnFlightDestination2(tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.departureTime : "");


                                setValue('returndepartureairportDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.departureAirportCode : "");
                                setReturnArrivalDateDestination2(tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.arrivalDate : "");
                                setArrivaltimeReturnFlightDestination2(tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.arrivalTime : "");
                                // setValue('returnarrivaltime', tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[0].flightInBoundDetails.arrivalTime : "");

                                //s2
                                setValue('returnarrivalairportDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.arrivalAirportCode : "");
                                setValue('returncarrierDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.flightCarrierId : "");
                                setValue('returnflightnumberDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.flightNumber : "");
                                setValue('returnbookingemailDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.bookingEmail : "");
                                setValue('returnbookingreferenceDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails ? tripDetailsbyid.bookingInfoResponse.destinations[1].flightInBoundDetails.bookingReference : "");



                  //Accommodation
                                  setValue('hotelIdDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1] ? tripDetailsbyid.bookingInfoResponse.destinations[1].hotelInfo[0].hotelId : "");
                                  setValue('accommodationbookingReferenceDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1] ? tripDetailsbyid.bookingInfoResponse.destinations[1].hotelInfo[0].bookingReference : "");
                                  setValue('roomtypeDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1] ? tripDetailsbyid.bookingInfoResponse.destinations[1].hotelInfo[0].roomType : "");
                                  setValue('breakfastIncludedDestination2', tripDetailsbyid.bookingInfoResponse.destinations[1] ? tripDetailsbyid.bookingInfoResponse.destinations[1].hotelInfo[0].breakfastIncluded : false);
                }

                setValue('numberOfCities', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['numberOfCities'] : "")
                setValue('tripTheme', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['tripTheme'] : "")
                setCityCount(tripDetailsbyid.tripDetails['numberOfCities']);
                if (tripDetailsbyid.tripDetails['numberOfCities'] === 2){
                    setShowSecondDestinationSection(true);}
                else{
                setShowSecondDestinationSection(false);}

                if (tripDetailsbyid.tripDetails != null) {
                    setCustomerIdFetched(tripDetailsbyid.tripDetails.customerId);
                    setCustomerMailFetched(tripDetailsbyid.tripDetails.customerEmail);
                    setCustomerStatusFetched(tripDetailsbyid.tripDetails['subscriptionType']);
                    setCustomerNotesFetched(tripDetailsbyid.tripDetails['customerNotes']);
                }
                setValue('customerId', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails.customerId : "");

                //customer details
                if (tripDetailsbyid.tripDetails && tripDetailsbyid.tripDetails.customerId && tripDetailsbyid.tripDetails.customerEmail !== null) {
                    setValue('customeremailaddress', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails.customerEmail : "");
                    setValue('subscriptiontype', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['subscriptionType'] : "");
                    setValue('customerNotes', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['customerNotes'] : "");
                    setCurrentTripPrice(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse['tripPrice'] / 100 : "");

                }
                else if (tripDetailsbyid.tripDetails.customerId && tripDetailsbyid.tripDetails.customerEmail === null) {
                    fetchcustomerAPI(tripDetailsbyid.tripDetails.customerId);

                }
                setDepartureAirports(tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails.airports.outboundAirports.map(item => (
                    {
                        airportName: item.airportName,
                        id: item.id,
                        airportCode: item.airportCode
                    }
                )) : []);
                setExcludedAirports(tripDetailsbyid.tripDetails &&tripDetailsbyid.tripDetails.exclusions!==null ? tripDetailsbyid.tripDetails.exclusions.destinations.map(item => (
                    {
                        id: item.id,
                    airportCode:item.airportCode,
                    destinationName:item.destinationName
                    }
                )) : []);
                // setValue('excludedairports', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails.exclusions.destinations[0].destinationName : "");
                setTenDestinations(tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails.destinations.destinations.map(item => (
                    {
                        id: item.id,
                    airportCode:item.airportCode,
                    destinationName:item.destinationName
                    }
                )) : []);
                if(tripDetailsbyid.tripDetails.hotels!==null && tripDetailsbyid.tripDetails.activities!==null){
                    setHotelPreferences(tripDetailsbyid.tripDetails?tripDetailsbyid.tripDetails.hotels.preferences.map(item=>(
                        {
                            // label: item.name,
                            id: item.id,
                            name: item.name
                        } 
                    )):[]);
                    
                   
                    setPreferredActivities(tripDetailsbyid.tripDetails?tripDetailsbyid.tripDetails.activities.activities.map(item=>(
                        {
                            id: item.id,
                            name: item.name
                        } )):[]);
                    }
                    else{
                        fetchActivityInfo(tripDetailsbyid.tripDetails.customerId);
                    }
                // setValue('tdestinations', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails.destinations.destinations[0].destinationName : "");
                //trip preferences
                setStarDate(tripDetailsbyid.tripDetails['startDate']);
                setEndDate(tripDetailsbyid.tripDetails['endDate']);
                // setValue('triptype', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['tripType'] : "");
                setValue('triptype', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['tripTypes']['tripTypes'][0].id : "");
                setValue('tripName', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['tripTypes']['tripTypes'][0].name : "");
                if (tripDetailsbyid.tripDetails['tripTypes']['tripTypes'][0].id === "9") {
                    setTripName("Staycation")
                    setIsStayCation(true);
                    setValue('distance', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['tripTypes']['staycation'].distance : "");
                    setValue('dontWantToGo', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['tripTypes']['staycation'].dontWantToGo : "")
                    setValue('preference', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['tripTypes']['staycation'].preference : "")
                    setValue('transport', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['tripTypes']['staycation'].transport : "")


                }

                setValue('preferredDepartureTime', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['departurePreference'] : '')
                setValue('latereturn', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['lateReturn'] : "");
               
                setValue('tripnotes', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['notes'] : "");
                setValue('numberoftravellers', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails.additionalTravellers.length : "");
                var roomTypeResponse=getRoomOptions(tripDetailsbyid.tripDetails.additionalTravellers.length);
                  setRoomType(roomTypeResponse);
                setAdditionalLength(tripDetailsbyid.tripDetails.additionalTravellers.length);
                setTripCancellationValue(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse['cancellationFee'] / 100 : "");
                setTripExtrasValue(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse['extras'] / 100 : "");
                setTripNetPrice(tripDetailsbyid.bookingInfoResponse && tripDetailsbyid.bookingInfoResponse.netPrice !== 0 ? tripDetailsbyid.bookingInfoResponse.netPrice / 100 : "1");
                setNumTravellers(tripDetailsbyid.tripDetails.additionalTravellers.length);
                setStripeCustomerId(tripDetailsbyid.tripDetails?tripDetailsbyid.tripDetails.stripeCustomerId:"");
                // console.log("stripeid",tripDetailsbyid.tripDetails.stripeCustomerId);
                setTopUpAmt(tripDetailsbyid.tripDetails?tripDetailsbyid.tripDetails.topUp:0);
                // console.log("topup",tripDetailsbyid.tripDetails.topUp);
                setTripPreference(tripDetailsbyid.tripDetails&&tripDetailsbyid.tripDetails.tripPreference==="MORNING"?0:1);
                //Additional travellers
                setAdditionalTravellersData(tripDetailsbyid.tripDetails.additionalTravellers ? tripDetailsbyid.tripDetails.additionalTravellers : []);
                // fetchTripPriceApi();
                //alert(JSON.stringify(tripDetailsbyid.tripDetails.additionalTravellers));
                let additionalTravellers = tripDetailsbyid.tripDetails.additionalTravellers
                brbUser = additionalTravellers.filter(x => x.brbUser === true);
                filteredAdditionalTravellerdata = additionalTravellers.filter(x => !brbUser.includes(x));
                if (brbUser.length > 0) {
                    filteredAdditionalTravellerdata.unshift(brbUser[0]);
                }
                setValue('roomtype', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['roomType'] : "");

                //   filteredAdditionalTravellerdata.map(({ brbUser, id, trip, ...items }) => items)
                setFilteredAdditionalTravellerData(filteredAdditionalTravellerdata);
                setPassportCountry(filteredAdditionalTravellerdata[0].nationality);
                // console.log('filteredAdditionalTravellerdata[0].nationality',filteredAdditionalTravellerdata[0].nationality);
                //Trip Details
                setValue('tripstatus', tripDetailsbyid.tripDetails ? selectTripStatus(tripDetailsbyid.tripDetails.tripStatus) : "");
                if (selectTripStatus(tripDetailsbyid.tripDetails.tripStatus) === 2)
                    setRevealedStatus(true);
                else setRevealedStatus(false);
                if (selectTripStatus(tripDetailsbyid.tripDetails.tripStatus) === 4)
                    setShowCancelledBy(true);
                else
                    setShowCancelledBy(false);


                setValue('cancelledby', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['cancelledBy'] : "");
                setValue('revealed', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['revealed'] : "");
                // setRevealedStatus(tripDetailsbyid.tripDetails['revealed']);
                setRevealedOnDate(tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['revealedOnDate'] : "");
                setValue('tripid', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['id'] : "");

                setValue('packagereference', tripDetailsbyid.tripDetails ? tripDetailsbyid.tripDetails['packageRef'] : "");

                setFlightCost(tripDetailsbyid.bookingInfoResponse && tripDetailsbyid.bookingInfoResponse.tripCost != null && tripDetailsbyid.bookingInfoResponse.tripCost[1].value != null ? tripDetailsbyid.bookingInfoResponse.tripCost[1].value / 100 : 0.00);


                if (tripDetailsbyid.bookingInfoResponse.tripCost != null) {
                setHotelCost(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse.tripCost[0].value / 100 : 0.00);

                setExtrasAmt(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse.tripCost[3].value / 100 : 0.00);

                setFeesAmt(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse.tripCost[2].value / 100 : 0.00);

                setFlightRefund(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse.tripCost[5].value / 100 : 0.00);
                setHotelRefund(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse.tripCost[4].value / 100 : 0.00);
                setExtrasRefund(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse.tripCost[7].value / 100 : 0.00);
                setFeesRefund(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse.tripCost[6].value / 100 : 0.00);
                setTripCostRefund(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse.tripCost[8].value / 100 : 0.00);
                }


                // setValue('fees', tripDetailsbyid.tripDetails.additionalTravellers ? tripDetailsbyid.tripDetails.additionalTravellers[0].firstName : "");
                // setValue('extras', tripDetailsbyid.tripDetails.additionalTravellers ? tripDetailsbyid.tripDetails.additionalTravellers[0].lastName : "");
                setTripCostValue(tripDetailsbyid.tripDetails['tripCostCalculated'] ? tripDetailsbyid.tripDetails['tripCostCalculated'] : 0.00);
                setNetTripCost(tripDetailsbyid.tripDetails['netTripCostCalculated'] ? tripDetailsbyid.tripDetails['netTripCostCalculated'] : 0.00);
                setNetgm(tripDetailsbyid.tripDetails['netGMCalculated'] ? tripDetailsbyid.tripDetails['netGMCalculated'] : "");
                //setNetgmpercent(tripDetailsbyid.tripDetails ? (tripDetailsbyid.tripDetails['netGMPercentage']).substring(0, 6) : "");


                if (tripDetailsbyid.bookingInfoResponse['tripPrice'] !== 0) {
                    setCurrentTripPrice(tripDetailsbyid.bookingInfoResponse ? tripDetailsbyid.bookingInfoResponse['tripPrice'] / 100 : "");
                }
                setTripCreditValue(tripDetailsbyid.bookingInfoResponse['tripPrice']  ? tripDetailsbyid.bookingInfoResponse['tripCredit'] / 100 : "");
                setValue('tripcancellationfee', tripDetailsbyid.bookingInfoResponse['cancellationFee'] ? tripDetailsbyid.bookingInfoResponse['cancellationFee'] / 100 : "");
                setValue('tripExtras', tripDetailsbyid.bookingInfoResponse['extras'] ? tripDetailsbyid.bookingInfoResponse['extras'] / 100 : "");
                setTripNetCreditValue(tripDetailsbyid.bookingInfoResponse['netCredit'] ? tripDetailsbyid.bookingInfoResponse['netCredit'] / 100 : "");
                setValue('netprice', tripDetailsbyid.bookingInfoResponse && tripDetailsbyid.bookingInfoResponse['netPrice'] !== 0 ? tripDetailsbyid.bookingInfoResponse['netPrice'] : "1");
                setValue('atolurl', tripDetailsbyid.tripDetails['atolURL'] ? tripDetailsbyid.tripDetails['atolURL'] : "");

            }).catch(error => { 
                console.log(error)
            })

           
        }
        fetchTripPriceApi();
        fetchData();
    }, []);
    useEffect(() => {
        fetchTripPriceApi();
    }, [starDate])
    useEffect(() => {
        fetchTripPriceApi();
    }, [endDate])
    const handleNumberOfCitiesChange = (event) => {
        setCityCount(event.target.value);
        if (event.target.value === "2") {
            setShowSecondDestinationSection(true);
        }
        else {
            setShowSecondDestinationSection(false);
        }
    }
    const handleChangeRoomType=(event)=>{
        console.log("change in room type",event.target.value)
    }
    const handleTripCalculations = (event) => {
        let value;
        //Net Price = (Trip Price + Trip Cancellation Fee + Extras) - Trip Credit.
        if (event.target.name === "tripcredit") {
            setTripCreditValue(event.target.value);
            value = (event.target.value - tripCancellationValue - tripExtrasValue).toFixed(2);
            setTripNetCreditValue(value);
            let netPrice = (currenttripPrice - value).toFixed(2);
            setTripNetPrice(netPrice);
            let gm = (netPrice - netTripCost).toFixed(2);
            setNetgm(gm);
            let gmpercent = ((gm / netPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);
        }
        if (event.target.name === "tripcancellationfee") {
            setTripCancellationValue(event.target.value);

            value = (tripCreditValue - event.target.value - tripExtrasValue).toFixed(2);
            setTripNetCreditValue( (tripCreditValue - event.target.value).toFixed(2) );
            let netPrice = (currenttripPrice - value).toFixed(2);
            setTripNetPrice(netPrice);
            let gm = (netPrice - netTripCost).toFixed(2);
            setNetgm(gm);
            let gmpercent = ((gm / netPrice) * 100).toFixed(2);
            setNetgmpercent(gmpercent);

        }
        if (event.target.name === "tripExtras") {
           setTripExtrasValue(event.target.value);

           value = (tripCreditValue - tripCancellationValue - event.target.value).toFixed(2);
           setTripNetCreditValue((tripCreditValue - tripCancellationValue).toFixed(2));
           let netPrice = (currenttripPrice - value).toFixed(2);
           setTripNetPrice(netPrice);
           let gm = (netPrice - netTripCost).toFixed(2);
           setNetgm(gm);
           let gmpercent = ((gm / netPrice) * 100).toFixed(2);
           setNetgmpercent(gmpercent);
        }

        // const creditvalue=

    }

    const submitStage = ((data, event) => {
       if (window.confirm("Are you fulfilling trip?") == true) {
           onSubmit(data, event, true);
       } else {
           onSubmit(data, event, false);
       }
    });

    const onSubmit = ((data, event, fulfill) => {
        const form = event.target;
        setIsFormValid(true);
        if (form.checkValidity() === false) {
            setIsFormValid(false);
            event.preventDefault();
            event.stopPropagation();
            setModalMessage("please fill all the fields in all the sections")
        }

        setValidated(true);

        var tripNameDefault = tripTypeArray.filter(x => x.label === data.triptype)[0].value

        // var revealedOnDateValue = data.revealed === true ? moment(revealedOnDate).format('YYYY-MM-DD') : null;
        var revealedOnDateValue = moment(revealedOnDate).format('YYYY-MM-DD');
        if (revealedOnDateValue === 'Invalid date') {
            revealedOnDateValue = new Date();
        }

        if (data.triptype === "9") {
            tripTypesArray = {
                "tripTypes": tripNameDefault
                , "staycation": {
                    "preference": data.preference,
                    "transport": data.transport,
                    "distance": data.distance,
                    "dontWantToGo": data.dontWantToGo
                }
            }
        }
        else {
            tripTypesArray = { "tripTypes": [{"id": data.triptype, "name": tripNameDefault}] }
        }

        let count = data.numberOfCities === "1" ? 1 : data.numberOfCities === "2" ? 2 : 0;
        const destination1Info=
            {
            "destinationId": data.destinationId,
            "hotelInfo": [{
                "hotelId": data.hotelId,
                "bookingReference": data.accommodationbookingReference,
                "roomType": data.accroomtype,
                "breakfastIncluded": data.breakfastIncluded

            }],
            "flightInBoundDetails": {
                "departureDate": moment(returnDepartureDate).format('YYYY-MM-DD'),
                "departureTime": returnDepaturetime,
                "departureAirportCode": data.returndepartureairport,
                "arrivalDate": moment(returnArrivalDate).format('YYYY-MM-DD'),
                "arrivalTime": returnArrivaltime,
                "arrivalAirportCode": data.returnarrivalairport,
                "flightCarrierId": data.returncarrier,
                // "flightNumber": data.returnflightnumber,
                "bookingEmail": data.returnbookingemail,
                "bookingReference": data.returnbookingreference

            },
            "flightOutBoundDetails": {
                "departureDate": moment(outboundDepartureDate).format('YYYY-MM-DD'),
                "departureTime": outboundDepaturetime,
                "departureAirportCode": data.departureairport,
                "arrivalDate": moment(outboundArrivalDate).format('YYYY-MM-DD'),
                "arrivalTime": outboundArrivaltime,
                "arrivalAirportCode": data.arrivalairport,
                "flightCarrierId": data.carrier,
                // "flightNumber": data.flightnumber,
                "bookingEmail": data.bookingemail,
                "bookingReference": data.bookingreference

            }
        }
        const destination2Info={
            "destinationId": data.destinationId2,
            "hotelInfo": [{
                "hotelId": data.hotelIdDestination2,
                "bookingReference": data.accommodationbookingReferenceDestination2,
                "roomType": data.roomtypeDestination2,
                "breakfastIncluded": data.breakfastIncludedDestination2,
                // "accroomtype":data.roomtype

            }],
            "flightInBoundDetails": {
                "departureDate": moment(returnDepartureDateDestination2)._isValid?moment(returnDepartureDateDestination2).format('YYYY-MM-DD'):'',
                "departureTime": depaturetimeReturnFlightDestination2,
                "departureAirportCode": data.returndepartureairportDestination2,
                "arrivalDate": moment(returnArrivalDateDestination2)._isValid?moment(returnArrivalDateDestination2).format('YYYY-MM-DD'):'',
                "arrivalTime": arrivaltimeReturnFlightDestination2,
                "arrivalAirportCode": data.returnarrivalairportDestination2,
                "flightCarrierId": data.returncarrierDestination2,
                // "flightNumber": data.returnflightnumberDestination2,
                "bookingEmail": data.returnbookingemailDestination2,
                "bookingReference": data.returnbookingreferenceDestination2
            },
            "flightOutBoundDetails": {
                "departureDate":moment(outboundDepartureDateDestination2)._isValid? moment(outboundDepartureDateDestination2).format('YYYY-MM-DD'):'',
                "departureTime": depaturetimeOutboundDestination2,
                "departureAirportCode": data.departureairportDestination2,
                "arrivalDate": moment(outboundArrivalDateDestination2)._isValid?moment(outboundArrivalDateDestination2).format('YYYY-MM-DD'):'',
                "arrivalTime": arrivaltimeOutboundDestination2,
                "arrivalAirportCode": data.arrivalairportDestination2,
                "flightCarrierId": data.carrierDestination2,
                // "flightNumber": data.flightnumberDestination2,
                "bookingEmail": data.bookingemailDestination2,
                "bookingReference": data.bookingreferenceDestination2
            }
        }
        
       const destinationsArray=[];
       destinationsArray.push(destination1Info);
       if(showSecondDestinationSection){ 
           destinationsArray.push(destination2Info);
       }

        requestBody = {
            "id": queryid,
            "tripDetails": {
                //"tripType": 0,
                "tripTheme": tripTheme,
                //"tripTypes": { "tripTypes": tripName},
                "tripTypes": tripTypesArray,
                "startDate": moment(starDate).format('YYYY-MM-DD'),
                "endDate": moment(endDate).format('YYYY-MM-DD'),
                "stripeCustomerId":stripeCustomerId,
                "tripStatus": data.tripstatus,
                "cancellationStatus": 1,
                "customerId": data.customerId,
                "customerEmail": data.customeremailaddress,
                "subscriptionType": data.subscriptiontype,
                "customerNotes": data.customerNotes,
                // "preferredDepartureTime": "15:35:48",
                "cancelledBy": data.cancelledby,
                // "revealed": data.revealed,
                "revealedOnDate": revealedOnDateValue,
                "packageRef": data.packagereference,
                "tripCostCalculated": tripCostValue,
                "netTripCostCalculated": netTripCost,
                "netGMCalculated": netgm,
                "netGMPercentage": netgmpercent,
                "atolURL": data.atolurl,
                "passportCountry": passportCountry,
                "departurePreference": data.preferredDepartureTime,

                "tripPreference": tripPreference,
                "roomType": data.roomtype,
                "numberOfCities": cityCount,
                "lateReturn": data.latereturn,
                "additionalTravellers": filteredAdditionalTravellerData.map(({ brbUser, id, trip, ...items }) => items),
                "rewards": "rewards1",
                "bookingRef": "firstbook",
                 "tripPrice": currenttripPrice * 100,
                "extraTravllersPrice": 0,
                "topUp": topUpAmount ,
                "refundAmount": tripCostRefund * 100,
                "legacyTrip": "true",
                "notes": data.tripnotes,
                "airports": { "outboundAirports": departureAirports },
                "destinations": {
                    //top10
                    "destinations": tenDestinations
                },
                "exclusions": {
                    //exclusions
                    "destinations": excludedAirports
                },
                "hotels": { "preferences": hotelPreferences},
                "activities": { "activities": preferredActivities},
                "userRewards": { "rewards": [{ "activityId": "1", "activityCode": "Test", "activityName": "Testing", "points": "60" }] },
                "phoneNumber": "9995858558",
                "creditFunds": data.creditFunds * 100,
                "debitFunds": data.debitFunds * 100

            },

            "flightDestAccomDetails": {
                "bookingType": "Trip",
                "tripId": queryid,
                "dropId": "",
                "tripPrice": currenttripPrice * 100,
                "topUp": topUpAmount,
                "tripCredit": tripCreditValue * 100,
                "cancellationFee": tripCancellationValue * 100,
                "extras": tripExtrasValue * 100,
                "netCredit": tripNetCreditValue * 100,
                "bookingEmail": "gvkrao2020@gmail.com",
                "coupon": 123,
                "netPrice": tripNetPrice * 100,
                "noOfTravellers": data.numberoftravellers,
                "tripCost": [{
                    "name": "hotel",
                    "value": hotelCost * 100
                },
                {
                    "name": "flight",
                    "value": flightCost * 100
                },
                {
                    "name": "fees",
                    "value": feesAmt * 100
                },
                {
                    "name": "extras",
                    "value": extrasAmt * 100
                },
                {
                    "name": "hotelRefund",
                    "value": hotelRefund * 100
                },
                {
                    "name": "flightRefund",
                    "value": flightRefund * 100
                },
                {
                    "name": "feesRefund",
                    "value": feesRefund * 100
                },
                {
                    "name": "extrasRefund",
                    "value": extrasRefund * 100
                },
                {
                    "name": "tripCostRefund",
                    "value": tripCostRefund * 100
                }

                ],
                "destinations":destinationsArray
            }
        }
        console.log('requestBody........', JSON.stringify(requestBody))
        if (form.checkValidity() === true) {
            if (fulfill) {
                dispatch(updateTripsDetailsFulfill(requestBody));
            } else {
                dispatch(updateTripsDetails(requestBody));
            }
        }
        setShowDefault(true);
    });

    const handleChangeInTripType = (event) => {
        if (event.currentTarget.value === "Staycation") {
            setIsStayCation(true);
        }
        else {
            setIsStayCation(false);
        }
        var name = tripTypeArray.filter(x => x.label === event.currentTarget.value)[0].value;
        let tripTypeResponse = [{id: event.currentTarget.value, name: name}];
        setTripName(tripTypeResponse); //fix for Trip Type
        setTripTheme(name);

        //setTripTypes(tripTypeJson);
        setValue("triptype", event.currentTarget.value);

        //setTripTheme(event.currentTarget.value);
        /*switch (event.currentTarget.value) {
        		case '2':
        			setTripTheme('Chill Out');
        			break;
                case '3':
                    setTripTheme('Culture')
                    break;
                case '4':
                    setTripTheme('Good Eats')
                    break;
                case '5':
                     setTripTheme('Nightlife')
                     break;
                case '6':
                     setTripTheme('Picturesque')
                     break;
                case '7':
                     setTripTheme('Quirky')
                     break;
                case '8':
                     setTripTheme('Romance')
                     break;
                case '9':
                     setTripTheme('Staycation')
                     break;
        		default:
        			setTripTheme('Romance')
        	} */
    }

    return (
        <div>
            <h5 className="mb-4">Update Trip Details</h5>
            <Form noValidate validated={validated} onSubmit={handleSubmit(submitStage)}>
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
                                    <Nav.Link eventKey="tripPreferences" className="mb-sm-3 mb-md-0">
                                        Trip Preferences
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="additionalTravellers" className="mb-sm-3 mb-md-0">
                                        Additional travellers
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tripDetails" className="mb-sm-3 mb-md-0">
                                        Trip Details
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="destinationandFlights" className="mb-sm-3 mb-md-0">
                                        Destination & Flights
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="accommodation" className="mb-sm-3 mb-md-0">
                                        Accommodation
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="extras" className="mb-sm-3 mb-md-0">
                                        Extras & Refunds
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
                                            <Form.Group
                                            // onSubmit={handleSubmit(onSubmit)}
                                            >
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="customerId">
                                                            <Form.Label>Customer ID</Form.Label>
                                                            <Form.Control readOnly type="" {...register("customerId")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="customeremailaddress">
                                                            <Form.Label>Customer email address</Form.Label>
                                                            <Form.Control readOnly type="" {...register("customeremailaddress")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="subscriptionstatus">
                                                            <Form.Label>Subscription Plan</Form.Label>
                                                            <Form.Control readOnly type="" {...register("subscriptiontype")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="customerNotes">
                                                            <Form.Label>Customer notes</Form.Label>
                                                            <Form.Control as="textarea" rows="3" readOnly type="" {...register("customerNotes")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="departureairports">
                                                            <Form.Label>Departure airports</Form.Label>
                                                            {/* {console.log("departurearirports",departureAirports)} */}
                                                            <ListGroup style={{ backgroundColor: "#f5f8fb", border: "0.25px solid", height: "150px", overflow: "auto" }}>
                                                                {departureAirports.map(x =>
                                                                    <ListGroupItem style={{ backgroundColor: "#f5f8fb" }}>{x.airportName}</ListGroupItem>)}
                                                            </ListGroup>
                                                            {/* <MultiSelect
                                                                disabled
                                                                options={departureAirports}
                                                                selected={departureAirports}
                                                                labelledBy={"Select"}
                                                            /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="excludedairports">
                                                            <Form.Label>Excluded destinations</Form.Label>
                                                            <ListGroup style={{ backgroundColor: "#f5f8fb", border: "0.01px solid", height: "150px", overflow: "auto" }}>
                                                                {excludedAirports.map(x =>
                                                                    <ListGroupItem style={{ backgroundColor: "#f5f8fb" }}>{x.destinationName}</ListGroupItem>)}
                                                            </ListGroup>
                                                            {/* <MultiSelect
                                                                disabled
                                                                options={excludedAirports}
                                                                selected={excludedAirports}
                                                                labelledBy={"Select"}
                                                            /> */}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="tdestinations">
                                                            <Form.Label>Top 10 destinations</Form.Label>
                                                            <ListGroup style={{ backgroundColor: "#f5f8fb", border: "0.25px solid", height: "150px", overflow: "auto" }}>
                                                                {tenDestinations.map(x =>
                                                                    <ListGroupItem style={{ backgroundColor: "#f5f8fb" }}>{x.destinationName}</ListGroupItem>)}
                                                            </ListGroup>
                                                            {/* <MultiSelect
                                                                disabled
                                                                options={tenDestinations}
                                                                selected={tenDestinations}
                                                                labelledBy={"Select"}
                                                            /> */}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Button variant="danger" as={Link} to={Routes.TripManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update Trip Request</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    {/* <Button variant="danger" onClick={deleteTrip} className="m-1">Delete</Button> */}
                                    {/* <Button variant="success" type="submit"className="m-1">Update</Button> */}
                                </Tab.Pane>
                                <Tab.Pane eventKey="tripPreferences" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group
                                            // noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}
                                            >
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Number of travellers</Form.Label>
                                                            <Form.Control readOnly type="" {...register("numberoftravellers")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group>
                                                            <Form.Label>Start date</Form.Label>
                                                            {/* <Form.Control  type="" {...register("startdate")} /> */}
                                                            <Datetime
                                                                timeFormat={false}
                                                                onChange={setStarDate}
                                                                renderInput={(props, openCalendar) => (
                                                                    <InputGroup>
                                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={starDate ? moment(starDate).format("DD/MM/YYYY") : ""}
                                                                            placeholder="DD/MM/YYYY"
                                                                            onFocus={openCalendar} />
                                                                        
                                                                    </InputGroup>
                                                                )} />

                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group>
                                                            <Form.Label>End date</Form.Label>
                                                            <Datetime
                                                                timeFormat={false}
                                                                onChange={handleEndDateChange}
                                                                renderInput={(props, openCalendar) => (
                                                                    <InputGroup>
                                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                        <Form.Control                                                                            
                                                                            type="text"
                                                                            value={endDate ? moment(endDate).format("DD/MM/YYYY") : ""}
                                                                            placeholder="DD/MM/YYYY"
                                                                            onFocus={openCalendar}
                                                                            isInvalid={errors.endDate != null || errors.endDate != undefined}
                                                                        />
                                                                        {(errors.endDate != null || errors.endDate != undefined) &&
                                                                            <Form.Control.Feedback type="invalid">
                                                                                {errors.endDate.message}
                                                                            </Form.Control.Feedback>}
                                                                    </InputGroup>
                                                                )} />
                                                        </Form.Group>
                                                    </Col>
                                                    {
                                                        moment(endDate).diff(moment(starDate), 'days') > 4 &&
                                                        <Col md={6}>
                                                            <Form.Group >
                                                                <Form.Label>Number of Cities to Visit</Form.Label>                                                            
                                                                <Form.Select type="" {...register("numberOfCities")} onChange={(event) => handleNumberOfCitiesChange(event)} >
                                                                    <option disabled selected value="Double Room" >Select Number of Cities</option>
                                                                    <option value="1">A Single City</option>
                                                                    <option value="2">Two cities back to back</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                    }
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Trip theme</Form.Label>
                                                            <Form.Select type="" {...register("triptype")} onChange={event => handleChangeInTripType(event)}>
                                                                <option disabled selected value="">Select trip theme</option>
                                                                <option value="1">Anything</option>
                                                                <option value="2">Chill Out</option>
                                                                <option value="3">Culture</option>
                                                                <option value="4">Good Eats</option>
                                                                <option value="5">Nightlife</option>
                                                                <option value="6">Picturesque</option>
                                                                <option value="7">Quirky</option>
                                                                <option value="8">Romance</option>
                                                                <option value="9">Staycation</option>



                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a trip theme.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {
                                                    isStayCation &&
                                                    <>
                                                        <Row className="align-items-center">
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Staycation Preference</Form.Label>
                                                                    <Form.Select type="" {...register("preference")}>
                                                                        <option disabled selected value="" >Select staycation preference</option>
                                                                        <option value="Countryside">Countryside</option>
                                                                        <option value="City">City</option>
                                                                        <option value="Coast">Coast</option>
                                                                    </Form.Select>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a valid staycation preference.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Transport</Form.Label>
                                                                    <Form.Select type="" {...register("transport")}>
                                                                        <option disabled selected value="" >transport</option>
                                                                        <option value="Own Transport">Own Transport</option>
                                                                        <option value="Public Transport">Public Transport</option>
                                                                    </Form.Select>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a valid transport type.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row className="align-items-center">
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Distance</Form.Label>
                                                                    <Form.Select  type="" {...register("distance")}>
                                                                        <option disabled selected value="" >Distance</option>
                                                                        <option value="Up to 2 hours">Up to 2 hours</option>
                                                                        <option value="2-4 hours">2-4 hours</option>
                                                                        <option value="4+hours">4+hours </option>
                                                                    </Form.Select>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a distance.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Is there anywhere you don't want to go?</Form.Label>
                                                                    <Form.Control type="" {...register("dontWantToGo")} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a valid place.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group></Col>

                                                        </Row>
                                                    </>
                                                }
                                                <Row className="align-items-center">
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Preferred departure time</Form.Label>
                                                            <Form.Select type="" {...register("preferredDepartureTime")}>
                                                                <option disabled selected value="">Select Departure time</option>
                                                                <option value="As early as possible">As early as possible</option>
                                                                <option value="After 8am">After 8 A.M</option>
                                                                <option value="After 12pm">After 12 P.M</option>
                                                                <option value="After 7pm">After 7 P.M</option>
                                                                <option value="Anytime">Anytime</option>
                                                            </Form.Select>
                                                            {/* <Form.Control  type="" {...register("preferreddeparturetime")} /> */}
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a preferred departure time type.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Late Return</Form.Label>
                                                            <Form.Select type="" {...register("latereturn")} >
                                                                <option disabled selected value="">Select late return status</option>
                                                                <option value="true">Yes</option>
                                                                <option value="false">No</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col></Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Room type</Form.Label>
                                                            <Form.Select type=""  {...register("roomtype")} onChange={event=>handleChangeRoomType(event)}>
                                                                 <option disabled selected value="">Select Room Type</option>
                                                                {roomType.map(({ id,name}) => <option value={id}>{name}</option>)}
                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a room type.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Trip Notes</Form.Label>
                                                            <Form.Control as="textarea" rows="3" type="" {...register("tripnotes")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a trip notes.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>

                                                </Row>
                                                <Button variant="danger" as={Link} to={Routes.TripManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update Trip Request</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    {/* <Button variant="danger"  onClick={deleteTrip} className="m-1">Delete</Button> */}
                                    {/* <Button variant="success" type="submit"className="m-1">Update</Button> */}
                                </Tab.Pane>
                                <Tab.Pane eventKey="additionalTravellers" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            <Form.Group
                                            // onSubmit={handleSubmit(onSubmit)}
                                            >

                                                {filteredAdditionalTravellerData?.map(({ title, firstName, lastName, dob, nationality, id }, index) =>
                                                <Fragment>

                                                 <Row>
                                                   {
                                                      index === 0 ?
                                                       <h5>Traveller 1 (main) details</h5> :
                                                       <h5>Traveller {index + 1} details</h5>}
                                                      <Col md={6} className="mb-3">
                                                      <Form.Group >
                                                      <Form.Label>Title</Form.Label>
                                                       <Form.Control readOnly type="" value={title} />
                                                       </Form.Group>
                                                      </Col>
                                                   </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>First name</Form.Label>
                                                            <Form.Control readOnly type="" value={firstName} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Surname</Form.Label>
                                                            <Form.Control readOnly type="" value={lastName} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                    <Row>
                                                        <Col md={6} className="mb-3">
                                                            <Form.Group >
                                                                <Form.Label>DOB</Form.Label>
                                                                <Form.Control readOnly type="" value={moment(dob).format('DD-MM-YYYY')} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="mb-3">
                                                            <Form.Group >
                                                                <Form.Label>Passport country</Form.Label>
                                                                <Form.Control readOnly type="" value={nationality} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row></Fragment>)}
                                                <Button variant="danger" as={Link} to={Routes.TripManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update Trip Request</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    {/* <Button variant="danger"  onClick={deleteTrip} className="m-1">Delete</Button> */}
                                    {/* <Button variant="success" type="submit"className="m-1">Update</Button> */}
                                </Tab.Pane>
                                <Tab.Pane eventKey="tripDetails" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group
                                            // noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}
                                            >
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Trip status</Form.Label>
                                                            <Form.Select type="" {...register("tripstatus")} onChange={event => handleTripStatusChange(event)}>
                                                                <option disabled selected value="">Select Trip status</option>
                                                                <option value="0">Created</option>
                                                                <option value="1">Locked</option>
                                                                <option value="2">Revealed </option>
                                                                <option value="3">Booked</option>
                                                                <option value="4">Cancelled</option>
                                                                {/* <option value="5">Completed</option> */}
                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a trip status.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    {showCancelledBy &&
                                                        <Col md={6} className="mb-3">
                                                            <Form.Group id="cancelledby">
                                                                <Form.Label>Cancelled by</Form.Label>
                                                                <Form.Select type=""  {...register("cancelledby")} >
                                                                    <option disabled selected value="">Cancelledby</option>
                                                                    <option value="Customer">Customer</option>
                                                                    <option value="Supplier">Supplier</option>
                                                                </Form.Select>
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide Cancelledby option.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    }
                                                </Row>
                                                <Row>
                                                    {/* <Col md={6} className="mb-3" style={{ margin: "2rem 0rem 0rem 0rem" }} >
                                                        <Form.Group >
                                                            <Form.Check type="checkbox" label="Revealed" {...register("revealed")} onChange={event => handleCheckboxChange(event)} />
                                                        </Form.Group>
                                                    </Col> */}
                                                    {
                                                        revealedStatus && <Col md={6} className="mb-3">
                                                            <Form.Group >
                                                                <Form.Label>Revealed on date</Form.Label>
                                                                <Datetime
                                                                    timeFormat={false}
                                                                    onChange={event => handleRevealedOnChange(event)}
                                                                    renderInput={(props, openCalendar) => (
                                                                        <InputGroup>
                                                                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                            <Form.Control
                                                                                type="text"
                                                                                value={revealedOnDate ? moment(revealedOnDate).format("DD/MM/YYYY") : ""}
                                                                                placeholder="DD/MM/YYYY"
                                                                                onFocus={openCalendar} />
                                                                           
                                                                        </InputGroup>
                                                                    )} />
                                                            </Form.Group>
                                                        </Col>

                                                    }

                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Trip ID</Form.Label>
                                                            <Form.Control readOnly type="" {...register("tripid")} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Package Reference #</Form.Label>
                                                            <Form.Control type="" {...register("packagereference")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a package reference.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <h5 className="mb-4">Trip Cost Section </h5>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="flights">
                                                            <Form.Label>Flights</Form.Label>
                                                            <Form.Control type="number" {...register("flightcost")} onChange={event => handleTripCostSection(event)} value={flightCost} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a flights.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="dateupdated">
                                                            <Form.Label>Flights Refund</Form.Label>
                                                            <Form.Control type="number" {...register("flightRefund")} onChange={event => handleTripCostSection(event)} value={flightRefund} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Flights cost.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="fees">
                                                            <Form.Label>Fees</Form.Label>
                                                            <Form.Control  type="number" {...register("fees")} onChange={event => handleTripCostSection(event)} value={feesAmt} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a fees.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="dateupdated">
                                                            <Form.Label>Fees Refund</Form.Label>
                                                            <Form.Control  type="number" {...register("feesRefund")} onChange={event => handleTripCostSection(event)} value={feesRefund} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide fees.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="hotel">
                                                            <Form.Label>Hotel</Form.Label>
                                                            <Form.Control  type="number" {...register("hotelscost")} onChange={event => handleTripCostSection(event)} value={hotelCost} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a hotel.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="dateupdated">
                                                            <Form.Label>Hotel Refund</Form.Label>
                                                            <Form.Control  type="number" {...register("hotelRefund")} onChange={event => handleTripCostSection(event)} value={hotelRefund} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a hotel cost.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="extras">
                                                            <Form.Label>Extras</Form.Label>
                                                            <Form.Control  type="number" {...register("extras")} onChange={event => handleTripCostSection(event)} value={extrasAmt} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a extras.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="dateupdated">
                                                            <Form.Label>Extras Refund</Form.Label>
                                                            <Form.Control  type="number" {...register("extrasRefund")} onChange={event => handleTripCostSection(event)} value={extrasRefund} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide extras.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="tripcost">
                                                            <Form.Label>Trip Cost</Form.Label>
                                                            <Form.Control  readOnly type="" {...register("tripcost")} onChange={event => handleTripCostSection(event)} value={tripCostValue} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="dateupdated">
                                                            <Form.Label>Trip Cost Refund</Form.Label>
                                                            <Form.Control  type="" {...register("tripcostrefund")} onChange={event => handleTripCostSection(event)} value={tripCostRefund} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide trip cost.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="nettripcost">
                                                            <Form.Label>Net Trip Cost</Form.Label>
                                                            <Form.Control  readOnly type="" {...register("nettripcost")} value={netTripCost} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="netGM">
                                                            <Form.Label>Net GM </Form.Label>
                                                            <Form.Control  readOnly type="" {...register("netGM")} value={netgm} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="netGMpercentage">
                                                            <Form.Label>Net GM %</Form.Label>
                                                            <Form.Control  readOnly type=""  {...register("netGMpercentage")} value={netgmpercent} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <h5 className="mb-4">Trip Price Section </h5>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="tripprice">
                                                            <Form.Label>Trip Price </Form.Label>
                                                            <Form.Control  readOnly type="" {...register("tripprice")} value={currenttripPrice} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="tripcredit">
                                                            <Form.Label>Trip Credit</Form.Label>
                                                            <Form.Control  type="" {...register("tripcredit")} onChange={(event) => handleTripCalculations(event)} value={tripCreditValue} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a trip Credit.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="tripcancellationfee">
                                                            <Form.Label>Trip Cancellation Fee</Form.Label>
                                                            <Form.Control  type="" {...register("tripcancellationfee")} onChange={(event) => handleTripCalculations(event)} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a trip cancellation Fee.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="netcredit">
                                                            <Form.Label>Net Credit</Form.Label>
                                                            <Form.Control  readOnly type="" {...register("netcredit")} value={tripNetCreditValue} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group id="tripExtras">
                                                    <Form.Label>Trip Extras</Form.Label>
                                                    <Form.Control  type="" {...register("tripExtras")} onChange={(event) => handleTripCalculations(event)} />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide extras.
                                                    </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="netprice">
                                                            <Form.Label>Net Price </Form.Label>
                                                            <Form.Control  readOnly type="" {...register("netprice")} onChange={(event) => handleTripCalculations(event)} value={tripNetPrice} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group id="atolurl">
                                                            <Form.Label>ATOL URL</Form.Label>
                                                            <Form.Control  type="" {...register("atolurl")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a ATOL URL.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Button variant="danger" as={Link} to={Routes.TripManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update Fulfilment</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    {/* <Button variant="danger"  onClick={deleteTrip} className="m-1">Delete</Button> */}
                                    {/* <Button variant="success" type="submit"className="m-1">Update</Button> */}
                                </Tab.Pane>

                                <Tab.Pane eventKey="destinationandFlights" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group
                                            // noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}
                                            >
                                                <Row className="text-center">
                                                    <Col md={12}>
                                                        <Form.Group>
                                                            <Form.Label>Destination-1</Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        {/* {setValue('destinationId', tripDetailsObject.bookingInfoResponse ? tripDetailsObject.bookingInfoResponse.destinations[0].destinationId : "")} */}
                                                        <Form.Group>
                                                            <Form.Label>Destination</Form.Label>
                                                            {destinationIds.length>0&&
                                                            <Form.Select  type="" {...register("destinationId")}>
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
                                                        <Form.Group >
                                                            <Form.Label>Departure date</Form.Label>
                                                            <Datetime
                                                                timeFormat={false}
                                                                onChange={setOutboundDepartureDate}
                                                                renderInput={(props, openCalendar) => (
                                                                    <InputGroup>
                                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                        <Form.Control
                                                                            
                                                                            type="text"
                                                                            value={outboundDepartureDate ? moment(outboundDepartureDate).format("DD/MM/YYYY") : ""}
                                                                            placeholder="DD/MM/YYYY"
                                                                            onFocus={openCalendar} 
                                                                            />
                                                                              </InputGroup>  
                                                                )}/>
                                                                </Form.Group>
                                                                 <Form.Control.Feedback type="invalid">
                                                                            Please provide a Departure date.
                                                                        </Form.Control.Feedback>
                                                       
                                                    </Col>
                                                           <Col md={6} className="mb-3">
                                                            <Form.Group >
                                                            <Form.Label>Departure time</Form.Label>
                                                            <div style={{ marginTop: "10px" }}>
                                                                <TimePicker
                                                                    onChange={onChangeOutBound}
                                                                    value={outboundDepaturetime}
                                                                    locale="sv-sv"
                                                                    disableClock={true}
                                                                    clearIcon={null}
                                                                    required={false}
                                                                //    maxDetail="second"

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
                                                        <Form.Group >
                                                            <Form.Label>Departure airport</Form.Label>
                                                            {airportCodes.length>0 &&
                                                            <Form.Select  type="" {...register("departureairport")}>
                                                                <option disabled selected value="">Select Departure airport</option>
                                                                {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                            </Form.Select>
                                                           }
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Departure airport.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    </Row><Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group>
                                                            <Form.Label>Arrival date</Form.Label>
                                                            <Datetime
                                                                timeFormat={false}
                                                                onChange={setOutboundArrivalDate}
                                                                renderInput={(props, openCalendar) => (
                                                                    <InputGroup>
                                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                        <Form.Control
                                                                            
                                                                            type="text"
                                                                            value={outboundArrivalDate ? moment(outboundArrivalDate).format("DD/MM/YYYY") : ""}
                                                                            placeholder="DD/MM/YYYY"
                                                                            onFocus={openCalendar} />
                                                                    </InputGroup>
                                                                )} />
                                                                 <Form.Control.Feedback type="invalid">
                                                                            Please provide a Arrival date.
                                                                        </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Arrival time</Form.Label>
                                                            <div style={{ marginTop: "10px" }}>
                                                                <TimePicker
                                                                    onChange={onChangeOutBoundArrival}
                                                                    value={outboundArrivaltime}
                                                                    locale="sv-sv"
                                                                    disableClock={true}
                                                                    clearIcon={null}
                                                                    required={false}
                                                                // maxDetail="second"


                                                                />
                                                            </div>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Arrival time.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col></Row><Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group>
                                                            <Form.Label>Arrival airport</Form.Label>
                                                            {airportCodes.length>0&&
                                                            <Form.Select  type="" {...register("arrivalairport")}>
                                                                <option disabled selected value="">Select Arrival airport</option>
                                                                {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                            </Form.Select>
}
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Arrival airport.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        {/* {setValue('carrier', tripDetailsObject.bookingInfoResponse.destinations[0].flightOutBoundDetails ? tripDetailsObject.bookingInfoResponse.destinations[0].flightOutBoundDetails.flightCarrierId : "")} */}
                                                        <Form.Group id="carrier">
                                                            <Form.Label>Carrier</Form.Label>
                                                            {flightCarrierIds.length>0&&
                                                            <Form.Select  type="" {...register("carrier")}>
                                                                <option disabled selected value="">Select Carrier</option>
                                                                {flightCarrierIds.map(({ carrierId, carrierName }, index) => <option value={carrierId} >{carrierName}</option>)}
                                                            </Form.Select>}
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Carrier.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    {/* <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Flight Number</Form.Label>
                                                            <Form.Control  type=""  {...register("flightnumber")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Flight Number.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row> */}
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group>
                                                            <Form.Label>Booking email</Form.Label>
                                                            <Form.Control  type="" {...register("bookingemail")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Booking email.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col></Row><Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Booking reference</Form.Label>
                                                            <Form.Control  type="" {...register("bookingreference")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Booking reference.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <h5 className="mb-4 ">Return Flight</h5>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Departure date</Form.Label>
                                                            <Datetime
                                                                timeFormat={false}
                                                                onChange={setReturnDepartureDate}
                                                                renderInput={(props, openCalendar) => (
                                                                    <InputGroup>
                                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                        <Form.Control
                                                                            
                                                                            type="text"
                                                                            value={returnDepartureDate ? moment(returnDepartureDate).format("DD/MM/YYYY") : ""}
                                                                            placeholder="DD/MM/YYYY"
                                                                            onFocus={openCalendar} />
                                                                      
                                                                    </InputGroup>
                                                                )} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Departure time</Form.Label>
                                                            <div style={{ marginTop: "10px" }}>
                                                                <TimePicker
                                                                    onChange={onChangeReturn}
                                                                    value={returnDepaturetime}
                                                                    locale="sv-sv"
                                                                    disableClock={true}
                                                                    clearIcon={null}
                                                                    required={false}
                                                                // maxDetail="second"


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
                                                        <Form.Group>
                                                            <Form.Label>Departure airport</Form.Label>
                                                            {airportCodes.length>0&&
                                                            <Form.Select  type="" {...register("returndepartureairport")}>
                                                                <option disabled selected value="">Select Departure airport</option>
                                                                {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                            </Form.Select>}
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Departure airport.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col></Row><Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Arrival date</Form.Label>
                                                            <Datetime
                                                                timeFormat={false}
                                                                onChange={setReturnArrivalDate}
                                                                renderInput={(props, openCalendar) => (
                                                                    <InputGroup>
                                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                        <Form.Control
                                                                            
                                                                            type="text"
                                                                            value={returnArrivalDate ? moment(returnArrivalDate).format("DD/MM/YYYY") : ""}
                                                                            placeholder="DD/MM/YYYY"
                                                                            onFocus={openCalendar} />
                                                                    </InputGroup>
                                                                )} />
                                                        </Form.Group>
                                                    </Col>
                                               
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Arrival time</Form.Label>
                                                            <div style={{ marginTop: "10px" }}>
                                                                <TimePicker
                                                                    onChange={onChangeReturnArrival}
                                                                    value={returnArrivaltime}
                                                                    locale="sv-sv"
                                                                    disableClock={true}
                                                                    clearIcon={null}
                                                                    required={false}
                                                                // maxDetail="second"

                                                                />
                                                            </div>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Arrival time.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Arrival airport</Form.Label>
                                                            {airportCodes.length>0&&
                                                            <Form.Select  type="" {...register("returnarrivalairport")}>
                                                                <option disabled selected value="">Select Arrival airport</option>
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
                                                        <Form.Group >
                                                            <Form.Label>Carrier</Form.Label>
                                                            {flightCarrierIds.length>0&&
                                                            <Form.Select  type="" {...register("returncarrier")}>
                                                                <option disabled selected value="">Select Carrier</option>
                                                                {flightCarrierIds.map(({ carrierId, carrierName }, index) => <option value={carrierId} >{carrierName}</option>)}
                                                            </Form.Select>}
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Carrier.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    {/* <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Flight Number</Form.Label>
                                                            <Form.Control  type="" {...register("returnflightnumber")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Flight Number.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row> */}
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Booking email</Form.Label>
                                                            <Form.Control  type="" {...register("returnbookingemail")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Booking email.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col></Row><Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Booking reference</Form.Label>
                                                            <Form.Control  type="" {...register("returnbookingreference")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Booking reference.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {showSecondDestinationSection &&
                                                    <>
                                                        <Row className="text-center">
                                                            <Col md={12}>
                                                                <Form.Group>
                                                                    <Form.Label>Destination-2</Form.Label>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>Destination</Form.Label>
                                                                    {destinationIds.length>0&&
                                                                    <Form.Select  type="" {...register("destinationId2")}>
                                                                        <option disabled selected value="">Select Destination</option>
                                                                        {destinationIds.map(({ cityId, cityName }, index) => <option value={cityId} >{cityName}</option>)}
                                                                    </Form.Select>}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide destination.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <h5 className="mb-4 ">Outbound Flight</h5>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Departure date</Form.Label>
                                                                    <Datetime
                                                                        timeFormat={false}
                                                                        onChange={setOutboundDepartureDateDestination2}
                                                                        renderInput={(props, openCalendar) => (
                                                                            <InputGroup>
                                                                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                                <Form.Control
                                                                                    
                                                                                    type="text"
                                                                                    value={outboundDepartureDateDestination2 ? moment(outboundDepartureDateDestination2).format("DD/MM/YYYY") : ""}
                                                                                    placeholder="DD/MM/YYYY"
                                                                                    onFocus={openCalendar} />
                                                                            </InputGroup>
                                                                        )} />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Departure time</Form.Label>
                                                                    <div style={{ marginTop: "10px" }}>
                                                                        <TimePicker
                                                                            onChange={onChangeOutBoundDestination2}
                                                                            value={depaturetimeOutboundDestination2}
                                                                            locale="sv-sv"
                                                                            disableClock={true}
                                                                            clearIcon={null}
                                                                            required={false}
                                                                        />
                                                                    </div>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide departure time.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Departure airport</Form.Label>
                                                                    {airportCodes.length>0&&
                                                                    <Form.Select  type="" {...register("departureairportDestination2")}>
                                                                        <option disabled selected value="">Select Departure airport</option>
                                                                        {airportCodes.length>0&&airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                                    </Form.Select>}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide departure airport.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            </Row><Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>Arrival date</Form.Label>
                                                                    <Datetime
                                                                        timeFormat={false}
                                                                        onChange={setOutboundArrivalDateDestination2}
                                                                        renderInput={(props, openCalendar) => (
                                                                            <InputGroup>
                                                                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                                <Form.Control
                                                                                    
                                                                                    type="text"
                                                                                    value={outboundArrivalDateDestination2 ? moment(outboundArrivalDateDestination2).format("DD/MM/YYYY") : ""}
                                                                                    placeholder="DD/MM/YYYY"
                                                                                    onFocus={openCalendar} />
                                                                            </InputGroup>
                                                                        )} />
                                                                </Form.Group>
                                                            </Col>
                                                       
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Arrival time</Form.Label>
                                                                    <div style={{ marginTop: "10px" }}>
                                                                        <TimePicker
                                                                            onChange={onChangeArrivalOutBoundDestination2}
                                                                            value={arrivaltimeOutboundDestination2}
                                                                            locale="sv-sv"
                                                                            disableClock={true}
                                                                            clearIcon={null}
                                                                            required={false}
                                                                        //  maxDetail="second"
                                                                        />
                                                                        {/* <Form.Control  type="" {...register("departuretime")} /> */}
                                                                    </div>
                                                                    {/* <Form.Control  type="" {...register("arrivaltime")} /> */}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide arrival time.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>Arrival airport</Form.Label>
                                                                    {airportCodes.length>0&&
                                                                    <Form.Select  type="" {...register("arrivalairportDestination2")}>
                                                                        <option disabled selected value="">Select Arrival airport</option>
                                                                        {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                                    </Form.Select>}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide arrival airport.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group id="hotelPreferences">
                                                                    <Form.Label>Carrier</Form.Label>
                                                                    <Form.Select  type="" {...register("carrierDestination2")}>
                                                                        <option disabled selected value="">Select Carrier</option>
                                                                        {flightCarrierIds.map(({ carrierId, carrierName }, index) => <option value={carrierId} >{carrierName}</option>)}
                                                                    </Form.Select>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide hotel preferences.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>Booking email</Form.Label>
                                                                    <Form.Control  type="" {...register("bookingemailDestination2")} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide booking email.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col></Row><Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Booking reference</Form.Label>
                                                                    <Form.Control  type="" {...register("bookingreferenceDestination2")} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide booking reference.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <h5 className="mb-4 ">Return Flight</h5>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>Departure date</Form.Label>
                                                                    <Datetime
                                                                        timeFormat={false}
                                                                        onChange={setReturnDepartureDateDestination2}
                                                                        renderInput={(props, openCalendar) => (
                                                                            <InputGroup>
                                                                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                                <Form.Control
                                                                                    
                                                                                    type="text"
                                                                                    value={returnDepartureDateDestination2 ? moment(returnDepartureDateDestination2).format("DD/MM/YYYY") : ""}
                                                                                    placeholder="DD/MM/YYYY"
                                                                                    onFocus={openCalendar} />
                                                                            </InputGroup>
                                                                        )} />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Departure time</Form.Label>
                                                                    <div style={{ marginTop: "10px" }}>
                                                                        <TimePicker
                                                                            onChange={onChangeReturnFligthDestination2}
                                                                            value={depaturetimeReturnFlightDestination2}
                                                                            locale="sv-sv"
                                                                            disableClock={true}
                                                                            clearIcon={null}
                                                                            required={false}
                                                                        //  maxDetail="second"
                                                                        />
                                                                    </div>
                                                                    {/* <Form.Control  type="" {...register("returndeparturetime")} /> */}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide departure time.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>Departure airport</Form.Label>
                                                                    {airportCodes.length>0&&
                                                                    <Form.Select  type="" {...register("returndepartureairportDestination2")}>
                                                                        <option disabled selected value="">Select Departure airport</option>
                                                                        {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                                    </Form.Select>}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide departure airport.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col></Row><Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Arrival date</Form.Label>
                                                                    <Datetime
                                                                        timeFormat={false}
                                                                        onChange={setReturnArrivalDateDestination2}
                                                                        renderInput={(props, openCalendar) => (
                                                                            <InputGroup>
                                                                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                                                <Form.Control
                                                                                    
                                                                                    type="text"
                                                                                    value={returnArrivalDateDestination2 ? moment(returnArrivalDateDestination2).format("DD/MM/YYYY") : ""}
                                                                                    placeholder="DD/MM/YYYY"
                                                                                    onFocus={openCalendar} />
                                                                            </InputGroup>
                                                                        )} />
                                                                </Form.Group>
                                                            </Col>
                                                       

                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Arrival time</Form.Label>
                                                                    <div style={{ marginTop: "10px" }}>
                                                                        <TimePicker
                                                                            onChange={onChangeArrivalReturnFlightDestination2}
                                                                            value={arrivaltimeReturnFlightDestination2}
                                                                            locale="sv-sv"
                                                                            disableClock={true}
                                                                            clearIcon={null}
                                                                            required={false}
                                                                        //  maxDetail="second"

                                                                        />
                                                                        {/* <Form.Control  type="" {...register("departuretime")} /> */}
                                                                    </div>
                                                                    {/* <Form.Control  type=""  {...register("returnarrivaltime")} /> */}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide arrival time.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Arrival airport</Form.Label>
                                                                    {airportCodes.length>0&&
                                                                    <Form.Select  type="" {...register("returnarrivalairportDestination2")}>
                                                                        <option disabled selected value="">Select Arrival airport</option>
                                                                        {airportCodes.map(({ airportCode, airportName }, index) => <option value={airportCode} >{airportName}</option>)}
                                                                    </Form.Select>}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide arrival airport.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Carrier</Form.Label>
                                                                    {flightCarrierIds.length>0&&
                                                                    <Form.Select  type="" {...register("returncarrierDestination2")}>
                                                                        <option disabled selected value="">Select Carrier</option>
                                                                        {flightCarrierIds.map(({ carrierId, carrierName }, index) => <option value={carrierId} >{carrierName}</option>)}
                                                                    </Form.Select>}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide carrier.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            {/* <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Flight Number</Form.Label>
                                                                    <Form.Control  type="" {...register("returnflightnumberDestination2")} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide flight number.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row> */}
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Booking email</Form.Label>
                                                                    <Form.Control  type="email" {...register("returnbookingemailDestination2")} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide booking email.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col></Row><Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Booking reference</Form.Label>
                                                                    <Form.Control  type="" {...register("returnbookingreferenceDestination2")} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide booking reference
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        {/* <Button variant="danger" as={Link} to={Routes.TripManagementDetails.path} className="m-1">Cancel</Button>
                                                        <Button variant="success" type="submit" className="m-1">Save</Button> */}
                                                    </>}
                                                <Button variant="danger" as={Link} to={Routes.TripManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update Fulfilment</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    {/* <Button variant="danger"  onClick={deleteTrip} className="m-1">Delete</Button> */}
                                    {/* <Button variant="success" type="submit"className="m-1">Update</Button> */}
                                </Tab.Pane>
                                <Tab.Pane eventKey="accommodation" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                        <Card.Body>
                                            {/*<h5 className="mb-4">General information</h5>*/}
                                            <Form.Group
                                            // noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}
                                            >
                                                <Row className="text-center">
                                                    <Col md={12}>
                                                        <Form.Group>
                                                            <Form.Label>Accomodation details for Destination-1</Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group>
                                                            <Form.Label>Hotel</Form.Label>
                                                            {hotelIds.length>0&&
                                                            <Form.Select  type="" {...register("hotelId")}>
                                                                <option disabled selected value="">Select Hotel</option>
                                                                {hotelIds.map(({ hotelId, hotelName }, index) => <option value={hotelId} >{hotelName}</option>)}
                                                            </Form.Select>}
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Hotel.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Booking Reference </Form.Label>
                                                            <Form.Control  type="" {...register("accommodationbookingReference")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Booking Reference.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} className="mb-3">
                                                        <Form.Group >
                                                            <Form.Label>Room type</Form.Label>
                                                            <Form.Control  type=""  {...register("accroomtype")} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Room type.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mb-3" style={{ margin: "2.5rem 0rem 0rem 0rem" }}>
                                                        <Form.Group id="breakfast">
                                                            <Form.Check type="checkbox" label="Breakfast" {...register("breakfastIncluded")} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {showSecondDestinationSection &&
                                                    <>
                                                        <Row className="text-center">
                                                            <Col md={12}>
                                                                <Form.Group>
                                                                    <Form.Label>Accomodation details for Destination-2</Form.Label>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row />
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>Hotel</Form.Label>
                                                                    {hotelIds.length>0&&
                                                                    <Form.Select  type="" {...register("hotelIdDestination2")}>
                                                                        <option disabled selected value="">Select Hotel</option>
                                                                        {hotelIds.map(({ hotelId, hotelName }, index) => <option value={hotelId} >{hotelName}</option>)}
                                                                    </Form.Select>}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide Hotel.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            {/* </Row><Row> */}

                                                            {/* </Row><Row> */}
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Booking Reference </Form.Label>
                                                                    <Form.Control  type="" {...register("accommodationbookingReferenceDestination2")} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide booking reference .
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Group >
                                                                    <Form.Label>Room type</Form.Label>
                                                                    <Form.Control  type=""  {...register("roomtypeDestination2")} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide room type.
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={6} className="mb-3" style={{ margin: "2.5rem 0rem 0rem 0rem" }}>
                                                                <Form.Group id="breakfast">
                                                                    <Form.Check type="checkbox" label="Breakfast" {...register("breakfastIncludedDestination2")} />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </>}
                                                <Button variant="danger" as={Link} to={Routes.TripManagementDetails.path} className="m-1">Cancel</Button>
                                                <Button variant="success" type="submit" className="m-1">Update Fulfilment</Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    {/* <Button variant="danger"  onClick={deleteTrip}className="m-1">Delete</Button> */}
                                    {/* <Button variant="success" type="submit"className="m-1">Update</Button> */}
                                </Tab.Pane>

                                <Tab.Pane eventKey="extras" className="py-4">
                                    <Card border="light" className="bg-white shadow-sm mb-4">
                                       <Card.Body>
                                         {/*<h5 className="mb-4">General information</h5>*/}
                                           <Form.Group>
                                            <Row>
                                              <Col md={6} className="mb-3">
                                                <Form.Group >
                                                  <Form.Label>Credit Funds</Form.Label>
                                                  <Form.Control  type=""  {...register("creditFunds")} />
                                                  <Form.Control.Feedback type="invalid">
                                                   Please complete Credit Funds.
                                                  </Form.Control.Feedback>
                                                  </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                 <Form.Group>
                                                  <Form.Label>Debit Funds</Form.Label>
                                                    <Form.Control  type=""  {...register("debitFunds")} />
                                                    <Form.Control.Feedback type="invalid">
                                                    Please complete Debit Funds.
                                                  </Form.Control.Feedback>
                                                  </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button variant="success" type="submit" className="m-1">Update Funds</Button>
                                           </Form.Group>
                                        </Card.Body>
                                        </Card>
                                          {/* <Button variant="danger"  onClick={deleteTrip}className="m-1">Delete</Button> */}
                                           {/* <Button variant="success" type="submit"className="m-1">Update</Button> */}
                                        </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title className="h6">Update trip details</Modal.Title>
                        <Button variant="close" aria-label="Close" onClick={handleClose} />
                    </Modal.Header>
                    {!isFormValid ?
                        <Modal.Body>
                            <p> {modalMessage}</p>
                        </Modal.Body> : <Modal.Body><p>{updateTripError !== null ? updateTripError : updatetrip}</p>
                        <p>{updateTripError&&updateTripError.includes("417")?"Insufficient funds":""}</p></Modal.Body>}
                    <Modal.Footer>
                        <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal></Form>
        </div>


    );
};