package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;

import travel.berightback.ops.model.AirportCitiesMapping;
import travel.berightback.ops.model.Airports;
import travel.berightback.ops.model.Cities;
import travel.berightback.ops.repository.AirportCityRepository;

@Service
public class AirportCityService {

	@Autowired
	private AirportCityRepository airportCityRepository;

	@Autowired
	private CitiesService cityService;

	@Autowired
	private AirportService airportService;

	public AirportCitiesMapping addAirportWithCityDetails(AirportCitiesMapping airportCitiesMapping) {

		return airportCityRepository.save(airportCitiesMapping);
	}

	public List<AirportCitiesMapping> getAllAirportWithCityDetails(Optional<Integer> page, int size, List<Long> ids) {
		List<AirportCitiesMapping> airportCitiesDetails = new ArrayList<>();
		Pageable paging = PageRequest.of(page.orElse(0), size);
		Page<AirportCitiesMapping> pagedResult = airportCityRepository.findAll(paging);
		if (ids != null) {
			for (Long id : ids) {
				if (id != null) {
					AirportCitiesMapping airportCity = airportCityRepository.getById(id);
					airportCitiesDetails.add(airportCity);
				}
			}

		} else {
			return pagedResult.getContent();
		}
		return airportCitiesDetails;

	}

	public AirportCitiesMapping findAirportCityById(Long airportCityId) {
		AirportCitiesMapping airportCity = airportCityRepository.findById(airportCityId)
				.orElseThrow(() -> new ResourceNotFoundException("Details not found :: " + airportCityId));
		return airportCity;
	}

	public void deleteAirportCitiesDetails(Long airportCityId) {
		AirportCitiesMapping airportCity = airportCityRepository.findById(airportCityId)
				.orElseThrow(() -> new ResourceNotFoundException("Airport details not found" + airportCityId));
		airportCityRepository.delete(airportCity);
	}

	public Map<Long, List<Cities>> getCitiesByAirportIds(List<Long> airportIds) {
		Map<Long, List<Cities>> mapCities = new HashMap<>();

		for (Long id : airportIds) {

			List<AirportCitiesMapping> ac_mappings = airportCityRepository.findByairportId(id);

			if (ac_mappings == null) {
				continue;
			}
			List<Cities> destinations = new ArrayList<>();
			for (AirportCitiesMapping ac_mapping : ac_mappings) {

				Cities city = cityService.findCityById(ac_mapping.getCityId());
				destinations.add(city);
				mapCities.put(id, destinations);
			}

		}
		return mapCities;
	}

	public Map<Long, List<Airports>> getAirportsByCitiesId(List<Long> citiesIds) {

		Map<Long, List<Airports>> mapAirports = new HashMap<>();
		for (Long id : citiesIds) {

			List<AirportCitiesMapping> ac_mappings = airportCityRepository.findBycityId(id);
			if (ac_mappings == null) {
				continue;
			}
			List<Airports> airports = new ArrayList<>();
			for (AirportCitiesMapping ac_mapping : ac_mappings) {
				Airports airport = airportService.findAirportById(ac_mapping.getAirportId());
				airports.add(airport);
				mapAirports.put(id, airports);
			}
		}
		return mapAirports;

	}

	public Long getDestinationCount(List<Long> airportIds) {

		Set<Long> destinationIds = new TreeSet<>();
		for (Long id : airportIds) {
			List<AirportCitiesMapping> ac_mappings = airportCityRepository.findByairportId(id);
			if (ac_mappings == null) {
				continue;
			}

			for (AirportCitiesMapping ac_mapping : ac_mappings) {
				destinationIds.add(ac_mapping.getCityId());
			}
		}
		return Long.valueOf(destinationIds.size());
	}

}
