import CustomerManagementImg from "../assets/img/pages/customers.jpg";
import TripManagementImg from "../assets/img/pages/tripsImg.jpg";
import HotelManagementImg from "../assets/img/pages/hotels.jpg";
import FlightManagementImg from "../assets/img/pages/flight.jpg";
import DropManagementImg from "../assets/img/pages/dropsImg.jpg";


import { Routes } from "../routes";


export default [
    {
        "id": 11,
        "name": "Customer Management",
        "image": CustomerManagementImg,
        "link": Routes.CustomerManagementDetails.path
    },
    {
        "id": 12,
        "name": " Trip Management",
        "image": TripManagementImg,
        "link": Routes.TripManagementDetails.path
    },
    {
        "id": 13,
        "name": " Hotel Management",
        "image": HotelManagementImg,
        "link": Routes.HotelManagementDetails.path
    },
    {
        "id": 14,
        "name": " Carrier Management",
        "image": FlightManagementImg,
        "link": Routes.FlightManagementDetails.path
    },
    {
        "id": 15,
        "name": " Drop Management",
        "image": DropManagementImg,
        "link": Routes.DropManagementDetails.path
    }
];