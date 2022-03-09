package travel.berightback.ops.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import travel.berightback.ops.model.Airports;
import travel.berightback.ops.model.Cities;
import travel.berightback.ops.service.AirportCityService;
import travel.berightback.ops.service.AirportService;
import travel.berightback.ops.util.UserPrincipal;

@RestController
@RequestMapping("/airport")
@CrossOrigin
public class AirportController {

	@Autowired
	private AirportService airportService;

	@Autowired
	private AirportCityService airportCityService;

	@PostMapping("/")
	public ResponseEntity<String> addAirportDetails(@RequestBody Airports airport, Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		try {
			Airports airportdetails = airportService.addAirportDetails(airport, principal.getUsername());
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Entered AirportCode is already exist, add unique value ");
		}
		Airports airportdetails = airportService.addAirportDetails(airport, principal.getUsername());
		return ResponseEntity.ok().body("Data Inserted successfully id : " + airportdetails.getId());
	}

	@GetMapping(value = "/")
	public ResponseEntity<List<Airports>> getAllAirportDetails() {
		return ResponseEntity.ok(airportService.getAllAirport());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Airports> findAirportById(@PathVariable(value = "id") Long airportId) {
		return ResponseEntity.ok().body(airportService.findAirportById(airportId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateAirport(@PathVariable(value = "id") Long airportId,
			@RequestBody Airports airportDetails) {
		Airports airport = airportService.updateAirport(airportId, airportDetails);
		return ResponseEntity.ok().body("Airport id :" + airport.getId() + " Data updated ");

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteAirport(@PathVariable(value = "id") Long airportId) {
		airportService.deleteAirport(airportId);
		return ResponseEntity.ok().body("Data Deleted of id :" + airportId);
	}

}
