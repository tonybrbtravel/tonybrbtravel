package travel.berightback.ops.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import travel.berightback.ops.model.DropPackage;
import travel.berightback.ops.service.DropService;
import travel.berightback.ops.util.UserPrincipal;

@RestController
@RequestMapping("/dropService")
@CrossOrigin
public class DropController {

	@Autowired
	private DropService dropService;

	@PostMapping("/")
	public ResponseEntity<String> addDropDetails(@RequestBody DropPackage dropDetails, Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		DropPackage dropPackage = dropService.addDropDetails(dropDetails, principal.getUsername());
		return ResponseEntity.ok().body(" DropPackage Details added successfully id: " + dropPackage.getId());
	}

	@GetMapping("/")
	public ResponseEntity<Page<DropPackage>> getAllDropDetails(@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "20") int size,
			@RequestParam(required = false, value = "attribute", defaultValue = "id") String attribute,
			@RequestParam(required = false, value = "order", defaultValue = "ASC") String order,
			@RequestParam(required = false, value = "ids") List<Long> ids) {
		return ResponseEntity.ok(dropService.getAllDropDetails(page, size, attribute, order, ids));
	}

	@GetMapping("/{id}")
	public ResponseEntity<DropPackage> findDropDetailsById(@PathVariable(value = "id") Long dropId) {
		return ResponseEntity.ok().body(dropService.findDropDetailsById(dropId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateDropDetails(@PathVariable(value = "id") Long dropId,
			@RequestBody DropPackage dropDetails, Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		dropService.updateDropDetails(dropId, dropDetails, principal.getUsername());
		return ResponseEntity.ok().body("Data Updated successfully of id : " + dropId);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteDropDetails(@PathVariable(value = "id") Long dropId) {
		dropService.deleteDropDetails(dropId);
		return ResponseEntity.ok().body("Data deleted of id :" + dropId);
	}

	@GetMapping("/getDropByAirportCode")
	public ResponseEntity<Object> getDropDetailsByAirportCode(
			@RequestParam(required=false, value="airportCode") List<String> airportCode){
		List<DropPackage> dropDetails=dropService.getDropsByAirportCode(airportCode);
		if(airportCode==null)
			return ResponseEntity.badRequest().body("Preferred Airport not selected");
		if(dropDetails.isEmpty())
			return ResponseEntity.ok().body("No Drops found for selected Airports");
		return ResponseEntity.ok().body(dropDetails);
		
	}
}
