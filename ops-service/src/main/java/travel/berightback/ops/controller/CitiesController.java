package travel.berightback.ops.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;
import travel.berightback.ops.model.Cities;
import travel.berightback.ops.service.CitiesService;
import travel.berightback.ops.util.UserPrincipal;

@RestController
@RequestMapping("/cities")
@CrossOrigin
public class CitiesController {

	@Autowired
	private CitiesService citiesService;

	@PostMapping("/")
	public ResponseEntity<String> addCitiesDetails(@RequestBody Cities city, Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		Cities cityDetails = citiesService.addCitiesDetails(city, principal.getUsername());
		return ResponseEntity.ok().body("Data inserted successfully id :" + cityDetails.getCityId());
	}

	@GetMapping("/")
	public ResponseEntity<List<Cities>> getAllCitiesDetails() {
		return ResponseEntity.ok(citiesService.getAllCitiesDetails());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Cities> findCityById(@PathVariable(value = "id") Long CityId) {
		return ResponseEntity.ok().body(citiesService.findCityById(CityId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateCityDetails(@PathVariable(value = "id") Long cityId,
			@RequestBody Cities cityDetails) {
		citiesService.updateCityDetails(cityId, cityDetails);
		return ResponseEntity.ok().body("Data Updated of id : " + cityId);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCityDetails(@PathVariable(value = "id") Long cityId) {
		citiesService.deleteCityDetails(cityId);
		return ResponseEntity.ok().body("CityId : " + cityId + " Data Deleted successfully ");
	}

}
