package travel.berightback.ops.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import travel.berightback.ops.dto.BookingInfoRequest;
import travel.berightback.ops.dto.BookingInfoResponse;
import travel.berightback.ops.dto.BookingInfoResponseForPost;
import travel.berightback.ops.service.BookingInfoService;
import travel.berightback.ops.util.UserPrincipal;




@RestController
@RequestMapping("/bookings")
@CrossOrigin
public class BookingInfoController {

	@Autowired
    private BookingInfoService bookingService;
	
	
	@PostMapping( value="/" , consumes = MediaType.APPLICATION_JSON_VALUE , produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addBookingDetails(@RequestBody BookingInfoRequest bookingInfo,Authentication auth) {
		UserPrincipal principal = (UserPrincipal)auth.getPrincipal();
		    BookingInfoResponseForPost bookingInfoResponseForPost= bookingService.saveBookingDetails(bookingInfo,Integer.toString(principal.getId()));
		   return ResponseEntity.ok().body(String.valueOf(bookingInfoResponseForPost.getBookingId()));
	    }


	    @GetMapping("/{id}")
	    public ResponseEntity<BookingInfoResponse> findBookingById(@PathVariable(value = "id") Long bookingId) {
	        return ResponseEntity.ok().body(bookingService.bookingDetailsByBookingId(bookingId));
	    }
	    
	    @GetMapping("/trip/{tripId}")
	    public ResponseEntity<BookingInfoResponse> findBookingByTripId(@PathVariable(value = "tripId") Long tripId) {
	        return ResponseEntity.ok().body(bookingService.bookingDetailsByTripId(tripId));
	    }
	    
	    @GetMapping("/drop/{dropId}")
	    public ResponseEntity<BookingInfoResponse> findBookingBydropId(@PathVariable(value = "dropId") Long dropId) {
	        return ResponseEntity.ok().body(bookingService.bookingDetailsByDropId(dropId));
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<String> updateBooing(@PathVariable(value = "id") Long bookingId,
	                                                   @RequestBody BookingInfoRequest bookingInfo,Authentication auth) { 
	    	UserPrincipal principal = (UserPrincipal)auth.getPrincipal();
	    	BookingInfoResponse bookingInfoResponse =bookingService.updateBooking(bookingId, bookingInfo,Integer.toString(principal.getId()));
	        return ResponseEntity.ok().body(String.valueOf(bookingInfoResponse.getBookingId()));

	    }
}