package travel.berightback.ops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travel.berightback.ops.model.FlightDetails;
import travel.berightback.ops.model.FlightOutDetails;
import travel.berightback.ops.repository.ReturnFlightRepository;

@Service
public class ReturnFlightService {

	@Autowired
	private ReturnFlightRepository returnFlightRepository;
	
	public FlightDetails addReturnFlightDetails(Long dropId,FlightDetails flightDetails) {
		FlightDetails returnFlightdetails=new FlightDetails();
		returnFlightdetails.setArrivalAirportCode(flightDetails.getArrivalAirportCode());
		returnFlightdetails.setArrivalDate(flightDetails.getArrivalDate());
		returnFlightdetails.setArrivalTime(flightDetails.getArrivalTime());
		returnFlightdetails.setDepartureAirportCode(flightDetails.getDepartureAirportCode());
		returnFlightdetails.setDepartureDate(flightDetails.getDepartureDate());
		returnFlightdetails.setDepartureTime(flightDetails.getDepartureTime());
		returnFlightdetails.setDropId(dropId);
		returnFlightdetails.setBookingEmail(flightDetails.getBookingEmail());
		returnFlightdetails.setBookingRef(flightDetails.getBookingRef());
		returnFlightdetails.setFlightCarrierId(flightDetails.getFlightCarrierId());
		returnFlightdetails.setFlightNum(flightDetails.getFlightNum());
		return returnFlightRepository.save(returnFlightdetails);
		
		
		
	}
	
	public FlightDetails getReturnFlightDetailsById(Long dropId) {
		return returnFlightRepository.findByDropId(dropId);
	}
	
	public FlightDetails updateReturnFlightDetails(Long dropId,FlightDetails flightDetails) {
		FlightDetails returnFlightdetails=returnFlightRepository.findByDropId(dropId);
		returnFlightdetails.setArrivalAirportCode(flightDetails.getArrivalAirportCode());
		returnFlightdetails.setArrivalDate(flightDetails.getArrivalDate());
		returnFlightdetails.setArrivalTime(flightDetails.getArrivalTime());
		returnFlightdetails.setDepartureAirportCode(flightDetails.getDepartureAirportCode());
		returnFlightdetails.setDepartureDate(flightDetails.getDepartureDate());
		returnFlightdetails.setDepartureTime(flightDetails.getDepartureTime());
		returnFlightdetails.setBookingEmail(flightDetails.getBookingEmail());
		returnFlightdetails.setBookingRef(flightDetails.getBookingRef());
		returnFlightdetails.setFlightCarrierId(flightDetails.getFlightCarrierId());
		returnFlightdetails.setFlightNum(flightDetails.getFlightNum());
		return returnFlightRepository.save(returnFlightdetails);
		
		
		
	}
	
}
																																			