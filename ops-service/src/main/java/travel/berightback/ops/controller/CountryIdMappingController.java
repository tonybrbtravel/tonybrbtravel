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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import travel.berightback.ops.dto.CountryIdDto;
import travel.berightback.ops.model.CountryIdMapping;
import travel.berightback.ops.service.CountryIdMappingService;
import travel.berightback.ops.util.UserPrincipal;

@RestController
@RequestMapping("/country")
@CrossOrigin
public class CountryIdMappingController {
	
	@Autowired
	private CountryIdMappingService countryIdMappingService;
	
	@PostMapping("/")
	public ResponseEntity<String> addCountryIdMappingDetails(@RequestBody CountryIdMapping countryIdMapping, Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		CountryIdMapping countryDetails = countryIdMappingService.addCountryIdDetails(countryIdMapping, principal.getUsername());
		return ResponseEntity.ok().body("Data inserted successfully id :" + countryDetails.getId());
	}

	@GetMapping("/")
	public ResponseEntity<List<CountryIdMapping>> getAllCountryIdMappingDetails() {
		return ResponseEntity.ok(countryIdMappingService.getAllCountryIdDetails());
	}

	@GetMapping("/{id}")
	public ResponseEntity<CountryIdMapping> findCountryMappingById(@PathVariable(value = "id") Long id) {
		return ResponseEntity.ok().body(countryIdMappingService.findCountryIdMappingById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateCountryMappingDetails(@PathVariable(value = "id") Long id,
			@RequestBody CountryIdMapping cityMappingDetails,Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		countryIdMappingService.updateCountryIdMappingDetails(id, cityMappingDetails, principal.getUsername());
		return ResponseEntity.ok().body("Data Updated of id : " + id);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCountryDetails(@PathVariable(value = "id") Long id) {
		countryIdMappingService.deleteCountryIdMappingDetails(id);
		return ResponseEntity.ok().body("Id : " + id + " Data Deleted successfully ");
	}
	
	@GetMapping("/getCountryId")
	public ResponseEntity<CountryIdDto> getCountryIdByNationality(@RequestParam(name="nationality",required= false) String nationality)
		{
		CountryIdDto countryIdDto= new CountryIdDto();
		if(nationality!=null) {
			if(countryIdMappingService.getCountryId(nationality)!=null) {
				countryIdDto.setCountryId(countryIdMappingService.getCountryId(nationality));
				return ResponseEntity.ok().body(countryIdDto);
			}
			else
				ResponseEntity.notFound().build();
		}
	
		return ResponseEntity.badRequest().build();
		}
}
