package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travel.berightback.ops.ResourceNotFoundException;
import travel.berightback.ops.model.Airports;
import travel.berightback.ops.repository.AirportCityRepository;
import travel.berightback.ops.repository.AirportRepository;

@Service
public class AirportService {

	@Autowired
	private AirportRepository airportRepository;
	
	@Autowired
	private AirportCityRepository airportCityRepository;

	public Airports addAirportDetails(Airports airport, String userName) {
		airport.setStatus("Active");
		airport.setCreatedBy(userName);
		airport.setCreatedAt(new Date());
		return airportRepository.save(airport);
	}
	
	public List<Airports> getAllAirport() {
		List<Airports> airportDetails=airportRepository.findAll();
		List<Airports> airportsDetails = new ArrayList<>();
		for(Airports airports : airportDetails) {
			airports.setAirportCitiesCount(airportCityRepository.getDestinationCount(airports.getId()));
			airportsDetails.add(airports);
		}

		Collections.sort(airportsDetails,Comparator.comparing(Airports :: getRegion));
		return airportsDetails;
	}
	
	public Airports findAirportById(Long airportId) {
		Airports airport = airportRepository.findById(airportId).orElseThrow(
				() -> new ResourceNotFoundException("Airport details not found for this airportId :: " + airportId));
		airport.setAirportCitiesCount(airportCityRepository.getDestinationCount(airport.getId()));
    	return airport;
	}

	public Airports updateAirport(Long airportId, Airports airportDetails) {
		Airports airport = airportRepository.findById(airportId).orElseThrow(
				() -> new ResourceNotFoundException("Airport details not found for this airportId :: " + airportId));
		airport.setAirportName(airportDetails.getAirportName());
		airport.setAirportCode(airportDetails.getAirportCode());
		airport.setRegion(airportDetails.getRegion());
		if (airportDetails.getStatus() != null) {
			airport.setStatus(airportDetails.getStatus());
		} else {
			airport.setStatus("ACTIVE");
		}

		airport.setBrbOrigin(airportDetails.isBrbOrigin());
		final Airports updatedAirportDetails = airportRepository.save(airport);
		return updatedAirportDetails;

	}

	public void deleteAirport(Long airportId) {
		Airports airport = airportRepository.findById(airportId)
				.orElseThrow(() -> new ResourceNotFoundException("Airport details not found" + airportId));
		airport.setStatus("Inactive");
		airportRepository.save(airport);

	}
	
	public TreeSet<String> airportsByRegion(List<String> airportCode) {
		TreeSet<String> airportsCode = new TreeSet<>();
		for (String airportCodes : airportCode) {
			for (String code : airportRepository.airportsByRegion(airportCodes)) {
				airportsCode.add(code);
			}
		}
		return airportsCode;
	}
	
	
	

}
