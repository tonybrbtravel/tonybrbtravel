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

import travel.berightback.ops.model.FlightCarriers;
import travel.berightback.ops.service.FlightCarrierService;
import travel.berightback.ops.util.UserPrincipal;


@RestController
@RequestMapping("/flightCarrier")
@CrossOrigin
public class FlightCarrierController {

	@Autowired
	private FlightCarrierService flightCarrierService;

	@PostMapping("/")
	public ResponseEntity<String> addFlightCarrierDetails(@RequestBody FlightCarriers flightCarrier,
			Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		FlightCarriers flightDetails = flightCarrierService.addFlightCarriersDetails(flightCarrier,
				principal.getUsername());
		return ResponseEntity.ok().body(" Carrier id : " + flightDetails.getCarrierId() + " Data Inserted !!");
	}

	
	@GetMapping("/")
	public ResponseEntity<Page<FlightCarriers>> getAllFlightCarrierDetails(@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "20") int size,
			@RequestParam(required = false, value = "attribute", defaultValue = "carrierName") String attribute,
			@RequestParam(required = false, value = "order", defaultValue = "ASC") String order,
			@RequestParam(required = false, value = "ids") List<Long> ids) {
		return ResponseEntity.ok(flightCarrierService.getAllFlightCarriersDetails(page, size, attribute, order, ids));
	}
	
	@GetMapping("/getActiveCarriers")
	public ResponseEntity<List<FlightCarriers>> getActiveCarriersDetails(){
		return ResponseEntity.ok(flightCarrierService.getActiveCarriersDetails());
	}

	@GetMapping("/{id}")
	public ResponseEntity<FlightCarriers> findFlightCarrierById(@PathVariable(value = "id") Long flightCarrierId) {
		return ResponseEntity.ok().body(flightCarrierService.findFlightCarrierById(flightCarrierId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateFlightCarrier(@PathVariable(value = "id") Long flightCarrierId,
			@RequestBody FlightCarriers flightCarrierDetails) {
		flightCarrierService.updateFlightCarriers(flightCarrierId, flightCarrierDetails);
		return ResponseEntity.ok().body("Data Updated of id: " + flightCarrierId);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteFlightCarrier(@PathVariable(value = "id") Long flightCarrierId) {
		flightCarrierService.deleteFlightCarrier(flightCarrierId);
		return ResponseEntity.ok().body("flightCarrierId : " + flightCarrierId + " Data Deleted !!");
	}

}
