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

import travel.berightback.ops.model.PreferredActivities;
import travel.berightback.ops.service.PreferredActivityService;
import travel.berightback.ops.util.UserPrincipal;

@RestController
@RequestMapping("/preferredActivity")
@CrossOrigin
public class PreferredActivityController {

	@Autowired
	private PreferredActivityService preferredActivityService;

	@PostMapping("/")
	public ResponseEntity<String> addPreferredActivityDetails(@RequestBody PreferredActivities preferredActivity,
			Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		PreferredActivities preferredActivities = preferredActivityService
				.addPreferredActivityDetails(preferredActivity, principal.getUsername());
		return ResponseEntity.ok().body("id : " + preferredActivities.getId() + "Data Inserted Successfully");

	}

	@GetMapping(value = "/")
	public ResponseEntity<List<PreferredActivities>> getAllPreferredActivityDetails(
			@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "20") int size,
			@RequestParam(required = false, value = "ids") List<Long> ids) {
		return ResponseEntity.ok(preferredActivityService.getAllPreferredActivitiesDetails(page, size, ids));
	}

	@GetMapping("/{id}")
	public ResponseEntity<PreferredActivities> findPreferredActivityById(@PathVariable(value = "id") Long id) {
		return ResponseEntity.ok().body(preferredActivityService.findPreferredActivitiesById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateAirport(@PathVariable(value = "id") Long id,
			@RequestBody PreferredActivities preferredActivity, Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		preferredActivityService.updatePreferredActivity(id, preferredActivity, principal.getUsername());
		return ResponseEntity.ok().body("Data Upadated succesfully for id :" + id);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteAirport(@PathVariable(value = "id") Long id) {
		preferredActivityService.deletePreferredActivity(id);
		return ResponseEntity.ok().body("Data Deleted for id : " + id);
	}

}
