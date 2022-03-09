package travel.berightback.ops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travel.berightback.ops.model.FlightDetails;
import travel.berightback.ops.model.FlightOutDetails;
import travel.berightback.ops.repository.FlightDetailsRepository;

@Service
public class FlightOutBoundService {

	@Autowired
	private FlightDetailsRepository flightRepository;
	
	public FlightOutDetails addFlightOutBoundDetails(Long dropId,FlightOutDetails flightDetails) {
		FlightOutDetails flightOutBound=new FlightOutDetails();
		flightOutBound.setArrivalAirportCode(flightDetails.getArrivalAirportCode());
		flightOutBound.setArrivalDate(flightDetails.getArrivalDate());
		flightOutBound.setArrivalTime(flightDetails.getArrivalTime());
		flightOutBound.setDepartureAirportCode(flightDetails.getDepartureAirportCode());
		flightOutBound.setDepartureDate(flightDetails.getDepartureDate());
		flightOutBound.setDepartureTime(flightDetails.getDepartureTime());
		flightOutBound.setDropId(dropId);
		flightOutBound.setBookingEmail(flightDetails.getBookingEmail());
		flightOutBound.setBookingRef(flightDetails.getBookingRef());
		flightOutBound.setFlightCarrierId(flightDetails.getFlightCarrierId());
		flightOutBound.setFlightNum(flightDetails.getFlightNum());
		return flightRepository.save(flightOutBound);
		
		
		
	}
	
	public FlightOutDetails getOutBoundFlightById(Long dropId) {
		return flightRepository.findByDropId(dropId);
	}
	
	public FlightOutDetails updateFlightOutBoundDetails(Long dropId,FlightOutDetails flightDetails) {
		FlightOutDetails flightOutBound=flightRepository.findByDropId(dropId);
		flightOutBound.setArrivalAirportCode(flightDetails.getArrivalAirportCode());
		flightOutBound.setArrivalDate(flightDetails.getArrivalDate());
		flightOutBound.setArrivalTime(flightDetails.getArrivalTime());
		flightOutBound.setDepartureAirportCode(flightDetails.getDepartureAirportCode());
		flightOutBound.setDepartureDate(flightDetails.getDepartureDate());
		flightOutBound.setDepartureTime(flightDetails.getDepartureTime());
		flightOutBound.setBookingEmail(flightDetails.getBookingEmail());
		flightOutBound.setBookingRef(flightDetails.getBookingRef());
		flightOutBound.setFlightCarrierId(flightDetails.getFlightCarrierId());
		flightOutBound.setFlightNum(flightDetails.getFlightNum());
		return flightRepository.save(flightOutBound);
		
		
		
	}
	
}
