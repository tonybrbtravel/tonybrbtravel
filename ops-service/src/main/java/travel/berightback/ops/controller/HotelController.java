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
import travel.berightback.ops.dto.HotelRequest;
import travel.berightback.ops.model.Hotels;
import travel.berightback.ops.service.HotelImageService;
import travel.berightback.ops.service.HotelsService;
import travel.berightback.ops.util.UserPrincipal;

@RestController
@RequestMapping("/hotels")
@CrossOrigin
public class HotelController {

	@Autowired
	private HotelsService hotelService;
	
	@Autowired
	private HotelImageService hotelImageService;

	@PostMapping("/")
	public ResponseEntity<String> addHotelDetails(@RequestBody HotelRequest hotelRequest, Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		Hotels hotel = hotelService.addHotelDetails(hotelRequest, principal.getUsername());

		return ResponseEntity.ok().body("HotelId : " + hotel.getHotelId() + "Data Inserted ");
	}

	@GetMapping("/")
	public ResponseEntity<Page<Hotels>> getAllHotelDetails(@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "20") int size,
			@RequestParam(required = false, value = "attribute", defaultValue = "hotelName") String attribute,
			@RequestParam(required = false, value = "order", defaultValue="ASC") String order,
			@RequestParam(required = false, value = "ids") List<Long> ids) {
		return ResponseEntity.ok(hotelService.getAllHotelDetails(page, size,  attribute, order,ids));
	}

	
	@GetMapping("/{id}")
	public ResponseEntity<Hotels> findHotelById(@PathVariable(value = "id") Long hotelId) {

		return ResponseEntity.ok().body(hotelService.findHotelById(hotelId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateHotel(@PathVariable(value = "id") Long hotelId,
			@RequestBody HotelRequest hotelRequestDetails) {
		hotelService.updateHotel(hotelId, hotelRequestDetails);
		return ResponseEntity.ok().body("Data Updated of id : " + hotelId);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteHotel(@PathVariable(value = "id") Long hotelId) {
		hotelService.deleteHotel(hotelId);
		return ResponseEntity.ok().body("HotelId : " + hotelId + " Data Deleted ");
	}

	@GetMapping("/search/")
	public ResponseEntity<Page<Hotels>> getAllHotelsBySearchText(
			@RequestParam(value = "searchText") Optional<String> searchText,
			@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "30") int size,
			@RequestParam(required = false, value = "attribute", defaultValue = "hotelName") String attribute,
			@RequestParam(required = false, value = "order",defaultValue="ASC") String order) {
		return ResponseEntity.ok().body(hotelService.getHotelsBySearchText(searchText,page,size,attribute,order));
	}

	
	@GetMapping("/getTopHotels")
	public ResponseEntity<List<Hotels>> getBestHotels() {
		return ResponseEntity.ok().body(hotelService.getBestHotelsByPosition());
	}
	
	
	@DeleteMapping("/hotelImage/{id}")
	public ResponseEntity<String> deleteHotelImage(@PathVariable(value = "id") Long hotelImageId){
		hotelImageService.deleteHotelImage(hotelImageId);
		return ResponseEntity.ok().body("HotelImageId : "+hotelImageId+" deleted!!");
	}
	
	@GetMapping("/getActiveHotelDetails")
	public ResponseEntity<List<Hotels>> getActiveHotelsDetails(){
		return ResponseEntity.ok().body(hotelService.getActiveHotelDetails());
	}

}