package travel.berightback.ops.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import travel.berightback.ops.model.AirportCitiesMapping;
import travel.berightback.ops.model.Airports;
import travel.berightback.ops.model.Cities;
import travel.berightback.ops.service.AirportCityService;

@RestController
@RequestMapping("/airportCities")
@CrossOrigin
public class AirportCitiesController {

	@Autowired
	private AirportCityService airportCityService;

	@PostMapping("/")
	public ResponseEntity<String> addAirportCitiesDetails(@RequestBody AirportCitiesMapping airportCitiesMapping) {
		AirportCitiesMapping ac_mapping = airportCityService.addAirportWithCityDetails(airportCitiesMapping);
		return ResponseEntity.ok("Airport_City_id : " + ac_mapping.getAirportCityId() + " Data inserted Successfully");
	}

	@GetMapping("/")
	public ResponseEntity<List<AirportCitiesMapping>> getAllAirportDetails(@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "400") int size,
			@RequestParam(required = false, value = "ids") List<Long> ids) {
		return ResponseEntity.ok(airportCityService.getAllAirportWithCityDetails(page, size, ids));
	}

	@GetMapping("/{id}")
	public ResponseEntity<AirportCitiesMapping> findAirportCityById(@PathVariable(value = "id") Long airportCityId) {
		return ResponseEntity.ok().body(airportCityService.findAirportCityById(airportCityId));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteAirport(@PathVariable(value = "id") Long airportCityId) {
		airportCityService.deleteAirportCitiesDetails(airportCityId);
		return ResponseEntity.ok("AirportCity_id : " + airportCityId + " Data Deleted");

	}

	@GetMapping("/getdestinations/")
	public ResponseEntity<Map<Long, List<Cities>>> getCities(
			@RequestParam(required = true, value = "ids") List<Long> airportIds) {
		return ResponseEntity.ok(airportCityService.getCitiesByAirportIds(airportIds));

	}

	@GetMapping("/getairports/")
	public ResponseEntity<Map<Long, List<Airports>>> getAirports(
			@RequestParam(required = true, value = "ids") List<Long> cityIds) {
		return ResponseEntity.ok(airportCityService.getAirportsByCitiesId(cityIds));

	}

	@GetMapping("/getdestinationscount")
	public ResponseEntity<Long> getDestinationCount(
			@RequestParam(required = true, value = "ids") List<Long> airportIds) {
		return ResponseEntity.ok(airportCityService.getDestinationCount(airportIds));
	}
}