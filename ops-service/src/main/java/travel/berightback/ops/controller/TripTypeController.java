package travel.berightback.ops.controller;

import java.util.List;
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

import travel.berightback.ops.model.TripType;
import travel.berightback.ops.service.TripTypeService;
import travel.berightback.ops.util.UserPrincipal;

@RestController
@RequestMapping("/tripType")
@CrossOrigin
public class TripTypeController {

	@Autowired
	private TripTypeService tripTypeService;

	@PostMapping("/")
	public ResponseEntity<String> addTripTypeDetails(@RequestBody TripType tripType, Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		TripType tripTypeDetails = tripTypeService.addTripTypeDetails(tripType, principal.getUsername());
		return ResponseEntity.ok().body("TripTypeId : " + tripTypeDetails.getId() + " Data Inserted");
	}

	@GetMapping("/")
	public ResponseEntity<List<TripType>> getAllTrip_TypeDetails(@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "20") int size,
			@RequestParam(required = false, value = "ids") List<Long> ids) {
		return ResponseEntity.ok(tripTypeService.getAllTripTypeDetails(page, size, ids));
	}

	@GetMapping("/{id}")
	public ResponseEntity<TripType> findTrip_TypeById(@PathVariable(value = "id") Long tripTypeId) {

		return ResponseEntity.ok().body(tripTypeService.findTripTypeById(tripTypeId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateTrip_Type(@PathVariable(value = "id") Long tripTypeId,
			@RequestBody TripType tripTypeDetails) {
		tripTypeService.updateTripType(tripTypeId, tripTypeDetails);
		return ResponseEntity.ok().body("Data Updated of id : " + tripTypeId);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteTrip_Type(@PathVariable(value = "id") Long tripTypeId) {
		tripTypeService.deleteTripType(tripTypeId);
		return ResponseEntity.ok().body("tripTypeId : " + tripTypeId + " Data Deleted ");
	}

}
