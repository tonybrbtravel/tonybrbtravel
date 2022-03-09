package travel.berightback.ops.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import travel.berightback.ops.model.EmailPreferences;
import travel.berightback.ops.service.EmailPreferenceService;

@RestController
@RequestMapping("/emailPreference")
@CrossOrigin
public class EmailPreferenceController {

	@Autowired
	private EmailPreferenceService emailPreferenceService;

	@PostMapping("/")
	public ResponseEntity<String> addDetails(@RequestBody EmailPreferences emailPreferenceDetails) {
		EmailPreferences emailPreference = emailPreferenceService.addDetails(emailPreferenceDetails);
		return ResponseEntity.ok().body("Id : " + emailPreference.getId() + " Data inserted !!");
	}

	@GetMapping("/{id}")
	public ResponseEntity<EmailPreferences> getEmailPreferenceById(@PathVariable(value = "id") Long id) {
		return ResponseEntity.ok().body(emailPreferenceService.getEmailPreferenceById(id));
	}

	@GetMapping(value = "/")
	public ResponseEntity<List<EmailPreferences>> getAllEmailPreferenceDetails(@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "5") int size,
			@RequestParam(required = false, value = "ids") List<Long> ids) {
		return ResponseEntity.ok(emailPreferenceService.getAllEmailPreferenceDetails(page, size, ids));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateEmailPreferenceDetails(@PathVariable(value = "id") Long id,
			@RequestBody EmailPreferences emailPreferenceDetails) {
		EmailPreferences emailPreference = emailPreferenceService.updateEmailPreference(id, emailPreferenceDetails);
		return ResponseEntity.ok().body("Id : " + id + " Data updated !!");
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmailPreference(@PathVariable(value = "id") Long id) {
		emailPreferenceService.deleteEmailPreference(id);
		return ResponseEntity.ok().body("Id : " + id + " Data deleted !!");
	}
}
