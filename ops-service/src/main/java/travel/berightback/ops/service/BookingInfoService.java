package travel.berightback.ops.service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import travel.berightback.ops.dto.*;
import travel.berightback.ops.model.*;
import travel.berightback.ops.repository.*;
import travel.berightback.ops.util.ExternalRestTemplateService;
import travel.berightback.ops.util.YmlConfig;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BookingInfoService {

	@Autowired
    private BookingInfoRepository bookingInfoRepository;
	
	@Autowired
	private DropService dropService;
	
	@Autowired
	private AirportRepository airportRepository;
	
	@Autowired
	private CitiesRepository cityRepository;
	
	@Autowired
	private FlightCarrierService flightCarrierService;
	
	@Autowired
	BookingCostRepository bookingCostRepository;
	
	@Autowired
	DestinationDetailsRepository destinationDetailRepository;
	
    @Autowired
    private YmlConfig config;
    
    @SuppressWarnings("unused")
	private String userId;
    
    @Value("${services.urls.trip-service}")
    private String tripUrl;	
    	
    @Autowired
    private ExternalRestTemplateService externalRestTemplateService;
	
	@Transactional
    public BookingInfoResponseForPost saveBookingDetails(BookingInfoRequest bookingInfoRequest, String userIdL) {
		userId = userIdL;
		BookingInfo bookingInfo = convertBookingRequestBookingInfo(bookingInfoRequest,userId,0);
		 	bookingInfo.setCreatedBy(userIdL);
		 	bookingInfo.setCreatedAt(new Date());
		 	bookingInfo.setStatus(bookingInfoRequest.getStatus());
		 	BookingInfoResponseForPost bookingInfoResponse = new BookingInfoResponseForPost ();
	        return prepareResponseForBookingPost(bookingInfoResponse, bookingInfoRepository.save(bookingInfo));
	    }
	 
	 private BookingInfo convertBookingRequestBookingInfo(BookingInfoRequest bookingInfoRequest,String userId,long bookingId) {
		Long value = Long.valueOf(bookingId);
		Integer id = value.intValue();
		System.out.println("Looking for trip id: " + id);
		BookingInfo bookingInfo = bookingInfoRepository.findByTripId(id);
		System.out.println("bookingInfo: " + bookingInfo);
		if (bookingInfo == null) {
			bookingInfo = new BookingInfo();
			if( bookingId > 0) {
				bookingInfo.setId(bookingId);
			}
		}
		bookingInfo.setBookingEmail(bookingInfoRequest.getBookingEmail());
		bookingInfo.setBookingType(bookingInfoRequest.getBookingType());
		bookingInfo.setCancellationFee(bookingInfoRequest.getCancellationFee());
		bookingInfo.setCoupon(bookingInfoRequest.getCoupon());
		bookingInfo.setNetCredit(bookingInfoRequest.getNetCredit());
		bookingInfo.setNetPrice(bookingInfoRequest.getNetPrice());
		bookingInfo.setTopUp(bookingInfoRequest.getTopUp());
		bookingInfo.setTripCredit(bookingInfoRequest.getTripCredit());
		bookingInfo.setTripPrice(bookingInfoRequest.getTripPrice());
		bookingInfo.setExtras(bookingInfoRequest.getExtras());
		bookingInfo.setNoOfTravellers(bookingInfoRequest.getNoOfTravellers());
		bookingInfo.setBookingCostDetails(convertBookingCost(bookingInfo, bookingInfoRequest.getTripCost()));
		if(bookingInfoRequest.getDropId()!=0) {
		bookingInfo.setDropId(bookingInfoRequest.getDropId());
		}
		if(bookingInfoRequest.getTripId()!=0) {
			bookingInfo.setTripId(bookingInfoRequest.getTripId());
			//BRBTrip brbTrip = tripDetailsFromTripService(bookingInfoRequest.getTripId());
			/*if(null!= brbTrip.getUserId() && ! brbTrip.getUserId().isBlank()) {
				userId = brbTrip.getUserId().toString();
				}*/
			}
		bookingInfo.setDestinationDetails(convertDestinations(bookingInfo,bookingInfoRequest.getDestinations(),userId));
		return bookingInfo;
	}

	  public BRBTrip tripDetailsFromTripService(int tripId) {
		 String uriLocal = tripUrl + "{tripId}";
			BRBTrip brbTrip = externalRestTemplateService.callGetMethod(uriLocal,String.valueOf(tripId));
		return brbTrip;
		  
	  }
	 
	private List<DestinationDetails> convertDestinations(BookingInfo bookingInfo,List<Destination> destinations, String userId) {
		List<DestinationDetails> destinationDetailsList = new ArrayList<>();
		for (Destination destination : destinations) {
			
			DestinationDetails destinationDetails = new DestinationDetails();
			destinationDetails.setUser_id(userId);
			destinationDetails.setDestinationId(destination.getDestinationId());
			destinationDetails.setBookingInfo(bookingInfo);
			destinationDetails.setFlightInDetails(convertFlightDetails(destination.getFlightInBoundDetails(),userId));
			destinationDetails.setFlightOutDetails(convertFlightDetails(destination.getFlightOutBoundDetails(),userId));
			destinationDetails.setAccomodations(convertHotelDetails(destinationDetails,destination.getHotelInfo(),userId));
			destinationDetailsList.add(destinationDetails);
			
		}
		return destinationDetailsList;
	}

	private List<Accomodations> convertHotelDetails(DestinationDetails destinationDetails, List<HotelInfo> hotelInfo, String userId) {
		List<Accomodations> accomodations = new ArrayList<>();
		for (HotelInfo HotelInfoLocal : hotelInfo) {
			Accomodations accomodationsLocal = new Accomodations();
			
			accomodationsLocal.setBookingRef(HotelInfoLocal.getBookingReference());
			accomodationsLocal.setRoomType(HotelInfoLocal.getRoomType());
			accomodationsLocal.setBreakfastIncluded(HotelInfoLocal.isBreakfastIncluded());
			accomodationsLocal.setHotelId(HotelInfoLocal.getHotelId());
			accomodationsLocal.setDestinationDetails(destinationDetails);
			accomodationsLocal.setUser_id(userId);
			accomodations.add(accomodationsLocal);
		}
		
		return accomodations;
	}

	private FlightDetails convertFlightDetails(FlightInfoDetails flightDetails, String userId) {
		FlightDetails FlightDetails = new FlightDetails();
		FlightDetails.setArrivalAirportCode(flightDetails.getArrivalAirportCode());
		FlightDetails.setArrivalAirportName(airportRepository.getAirportNameByAirportCode(flightDetails.getArrivalAirportCode()));
		FlightDetails.setArrivalDate(flightDetails.getArrivalDate());
		FlightDetails.setArrivalTime(flightDetails.getArrivalTime());
		FlightDetails.setBookingEmail(flightDetails.getBookingEmail());
		FlightDetails.setBookingRef(flightDetails.getBookingReference());
		FlightDetails.setDepartureAirportCode(flightDetails.getDepartureAirportCode());
		FlightDetails.setDepartureAirportName(airportRepository.getAirportNameByAirportCode(flightDetails.getDepartureAirportCode()));
		FlightDetails.setDepartureDate(flightDetails.getDepartureDate());
		FlightDetails.setDepartureTime(flightDetails.getDepartureTime());
		FlightDetails.setFlightCarrierId(flightDetails.getFlightCarrierId());
		FlightCarriers flightCarrier= flightCarrierService.findFlightCarrierById(Long.valueOf(flightDetails.getFlightCarrierId()));
		FlightDetails.setCarrierName(flightCarrier.getCarrierName());
		FlightDetails.setBaggageAllowance(flightCarrier.getBaggageAllowance());
		FlightDetails.setFlightNum(flightDetails.getFlightNumber());
		FlightDetails.setUser_id(userId);
		return FlightDetails;
	}

	private List<BookingCostDetails> convertBookingCost(BookingInfo bookingInfo,List<TripCost> tripCosts) {
		 
		List<BookingCostDetails> costDetails = new ArrayList<>();
		for (TripCost tripCost : tripCosts) {
			BookingCostDetails bookingCostDetails = new BookingCostDetails();
			bookingCostDetails.setName(tripCost.getName());
			bookingCostDetails.setCost(tripCost.getValue());
			bookingCostDetails.setBookingInfo(bookingInfo);
			costDetails.add(bookingCostDetails);
		}
		return costDetails;
	}

	/*
	 * public List<BookingInfo> getAllBookingsDetails(String userId) { return
	 * bookingInfoRepository.findBookingsByUserId(userId); }
	 */
	 
	public BookingInfoResponse bookingDetailsByBookingId(Long bookingId) {
		BookingInfo bookingInfo = findBookingById(bookingId);
		BookingInfoResponse bookingInfoResponse = new BookingInfoResponse();
		if(null != bookingInfo ) {
			
			bookingInfoResponse = prepareResponse(bookingInfoResponse,bookingInfo);
			return bookingInfoResponse;
			
		}
		return null;
		
	}
	
	
private BookingInfoResponseForPost prepareResponseForBookingPost(BookingInfoResponseForPost bookingInfoResponseForPost, BookingInfo bookingInfo) {
		
	bookingInfoResponseForPost.setBookingId(bookingInfo.getId());
	bookingInfoResponseForPost.setBookingEmail(bookingInfo.getBookingEmail());
	bookingInfoResponseForPost.setBookingType(bookingInfo.getBookingType());
	bookingInfoResponseForPost.setCancellationFee(bookingInfo.getCancellationFee());
	bookingInfoResponseForPost.setCoupon(bookingInfo.getCoupon());
	bookingInfoResponseForPost.setNetCredit(bookingInfo.getNetCredit());
	bookingInfoResponseForPost.setNetPrice(bookingInfo.getNetPrice());
	bookingInfoResponseForPost.setTopUp(bookingInfo.getTopUp());
	bookingInfoResponseForPost.setNoOfTravellers(bookingInfo.getNoOfTravellers());
	if(null!=bookingInfo.getTripId()) {
	bookingInfoResponseForPost.setTripId(bookingInfo.getTripId());
	}
	if(null!=bookingInfo.getDropId()) {
		bookingInfoResponseForPost.setDropId(bookingInfo.getDropId());
		}
	bookingInfoResponseForPost.setTripCredit(bookingInfo.getTripCredit());
	bookingInfoResponseForPost.setTripPrice(bookingInfo.getTripPrice());
	bookingInfoResponseForPost.setDestinations(destinationsMapToResponse(bookingInfo.getDestinationDetails()));
	bookingInfoResponseForPost.setTripCost(convertTripCost(bookingInfo.getBookingCostDetails()));
	System.out.println("bookingInfoResponseForPost: " + bookingInfoResponseForPost);
		return bookingInfoResponseForPost;
	}
	
	private BookingInfoResponse prepareResponse(BookingInfoResponse bookingInfoResponse, BookingInfo bookingInfo) {
		
		bookingInfoResponse.setBookingId(bookingInfo.getId());
		bookingInfoResponse.setBookingEmail(bookingInfo.getBookingEmail());
		bookingInfoResponse.setBookingType(bookingInfo.getBookingType());
		bookingInfoResponse.setCancellationFee(bookingInfo.getCancellationFee());
		bookingInfoResponse.setCoupon(bookingInfo.getCoupon());
		bookingInfoResponse.setNetCredit(bookingInfo.getNetCredit());
		bookingInfoResponse.setNetPrice(bookingInfo.getNetPrice());
		bookingInfoResponse.setTopUp(bookingInfo.getTopUp());
		bookingInfoResponse.setTripCredit(bookingInfo.getTripCredit());
		bookingInfoResponse.setExtras(bookingInfo.getExtras());
		bookingInfoResponse.setNoOfTravellers(bookingInfo.getNoOfTravellers());
		bookingInfoResponse.setTripPrice(bookingInfo.getTripPrice());
		if(null != bookingInfo.getTripId()) {
		bookingInfoResponse.setTripDetails(fetchTripDetails(bookingInfo.getTripId()));
		}
		if(null != bookingInfo.getDropId()) {
		bookingInfoResponse.setDropDetails(fetchDropDetails(bookingInfo.getDropId()));
		}
		bookingInfoResponse.setDestinations(destinationsMapToResponse(bookingInfo.getDestinationDetails()));
		bookingInfoResponse.setTripCost(convertTripCost(bookingInfo.getBookingCostDetails()));
		return bookingInfoResponse;
	}

	private List<TripCost> convertTripCost(List<BookingCostDetails> bookingCostDetails) {
		
		List<TripCost> tripCosts = new ArrayList<>();
		for (BookingCostDetails BookingCostDetailsLocal : bookingCostDetails) {
			TripCost tripCost = new TripCost();
			tripCost.setName(BookingCostDetailsLocal.getName());
			tripCost.setValue(BookingCostDetailsLocal.getCost());
			tripCosts.add(tripCost);
		}
		return tripCosts;
	}

	private List<Destination> destinationsMapToResponse(List<DestinationDetails> destinationDetails) {
		
		List<Destination> destinationsList = new ArrayList<>();
		for (DestinationDetails destinationDetail : destinationDetails) {
			
			Destination destination = new Destination();
			destination.setUser_id(userId);
			destination.setDestinationId(destinationDetail.getDestinationId());
			destination.setFlightInBoundDetails(convertFlightInfoDetails(destinationDetail.getFlightInDetails(),userId));
			destination.setFlightOutBoundDetails(convertFlightInfoDetails(destinationDetail.getFlightOutDetails(),userId));
			destination.setHotelInfo(convertAccomodationDetails(destinationDetail.getAccomodations(),userId));
			destination.setDestinationName(cityRepository.getDestinationName(destinationDetail.getDestinationId()));
			destinationsList.add(destination);	
		}
		return destinationsList;
	}
	
	private List<HotelInfo> convertAccomodationDetails(List<Accomodations> accomodations, String userId) {
		
		List<HotelInfo> hotels = new ArrayList<>();
		for (Accomodations AccomodationLocal : accomodations) {
			HotelInfo hotelInfo = new HotelInfo();
			hotelInfo.setBookingReference(AccomodationLocal.getBookingRef());
			hotelInfo.setRoomType(AccomodationLocal.getRoomType());
			hotelInfo.setBreakfastIncluded(AccomodationLocal.getBreakfastIncluded());
			hotelInfo.setHotelId(AccomodationLocal.getHotelId());
			hotelInfo.setUser_id(userId);
			hotels.add(hotelInfo);
		}
		return hotels;
	}
	
	private FlightInfoDetails convertFlightInfoDetails(FlightDetails flightDetails, String userId) {
		FlightInfoDetails flightInfoDetails = new FlightInfoDetails();   
		flightInfoDetails.setArrivalAirportCode(flightDetails.getArrivalAirportCode());
		flightInfoDetails.setArrivalAirportName(airportRepository.getAirportNameByAirportCode(flightDetails.getArrivalAirportCode()));
		flightInfoDetails.setArrivalDate(flightDetails.getArrivalDate());
		flightInfoDetails.setArrivalTime(flightDetails.getArrivalTime());
		flightInfoDetails.setBookingEmail(flightDetails.getBookingEmail());
		flightInfoDetails.setBookingReference(flightDetails.getBookingRef());
		flightInfoDetails.setDepartureAirportCode(flightDetails.getDepartureAirportCode());
		flightInfoDetails.setDepartureAirportName(airportRepository.getAirportNameByAirportCode(flightDetails.getDepartureAirportCode()));
		flightInfoDetails.setDepartureDate(flightDetails.getDepartureDate());
		flightInfoDetails.setDepartureTime(flightDetails.getDepartureTime());
		flightInfoDetails.setFlightCarrierId(flightDetails.getFlightCarrierId());
		flightInfoDetails.setFlightNumber(flightDetails.getFlightNum());
		FlightCarriers flightCarrier= flightCarrierService.findFlightCarrierById(Long.valueOf(flightDetails.getFlightCarrierId()));
		flightInfoDetails.setCarrierName(flightCarrier.getCarrierName());
		flightInfoDetails.setBaggageAllowance(flightCarrier.getBaggageAllowance());
		flightInfoDetails.setUser_id(userId);
		return flightInfoDetails;
	}

	private DropDetails fetchDropDetails(Integer dropId) {
		DropDetails dropDetails = new DropDetails();
		DropPackage dropPackage =dropService.findDropDetailsById(dropId.longValue());
		dropDetails.setId(dropPackage.getId());
		dropDetails.setDescription(dropPackage.getDescription());
		dropDetails.setTravelEndDate(dropPackage.getTravelEndDate());
		dropDetails.setStartingDate(dropPackage.getStart_date());
		dropDetails.setTravelStartDate(dropPackage.getTravelStartDate());
		dropDetails.setTravellers(dropPackage.getPax());
		dropDetails.setTitle(dropPackage.getTitle());
		return dropDetails;
	}

	private TripDetails fetchTripDetails(Integer tripId) {
		TripDetails tripDetails = new TripDetails();
		BRBTrip brbTrip = tripDetailsFromTripService(tripId);
		tripDetails.setTripId(brbTrip.getId());
		tripDetails.setEndDate(brbTrip.getEndDate());
		tripDetails.setStartDate(tripDetails.getStartDate());
		tripDetails.setTripId(tripId.longValue());
		tripDetails.setNotes(brbTrip.getNotes());
		return tripDetails;
	}

	public BookingInfo findBookingById(Long bookingId) {
		 BookingInfo bookingInfo = bookingInfoRepository.findById(bookingId)
	        		  .orElseThrow(() -> new ResourceNotFoundException("Hotel details not found for this bookingId :: " + bookingId));;
	        return bookingInfo;
	}

	@Transactional
	 public BookingInfoResponse updateBooking(Long bookingId, BookingInfoRequest bookingInfoRequest, String userIdU) {
		 userId =userIdU;
		 Long value = Long.valueOf(bookingId);
		 Integer tripId = value.intValue();
		 System.out.println("***********************: " + tripId);
		 BookingInfoResponse bookingInfoResponse = new BookingInfoResponse();
		 long deleteId = bookingInfoRepository.deleteByTripId(tripId);
		 System.out.println("deleted: " + deleteId);
		 List<Long> ids= bookingCostRepository.getAllBoookingCostIds(bookingId);
		 for(Long id:ids) {
			 bookingCostRepository.deleteById(id);
		 }
		 ids = destinationDetailRepository.getAllDestinationDetailsIds(bookingId);
		 for(Long id:ids) {
			 destinationDetailRepository.deleteById(id);
		 }
		 BookingInfo bookingInfo = convertBookingRequestBookingInfo(bookingInfoRequest,userId,bookingId);
		 bookingInfo.setCreatedAt(new Date());
          final BookingInfo updateBookingDetails = bookingInfoRepository.save(bookingInfo);
		bookingInfoResponse = prepareResponse(bookingInfoResponse,updateBookingDetails);
		return bookingInfoResponse;
	 }

	public BookingInfoResponse bookingDetailsByTripId(Long tripId) {
		
	BookingInfoResponse bookingInfoResponse = new BookingInfoResponse();
	BookingInfo bookingInfoLocal= bookingInfoRepository.findByTripId(tripId.intValue());
	if(bookingInfoLocal!=null) {
		bookingInfoResponse = prepareResponse(bookingInfoResponse,bookingInfoLocal);
	}
	return bookingInfoResponse;
	
	}

	public BookingInfoResponse bookingDetailsByDropId(Long dropId) {
		BookingInfoResponse bookingInfoResponse = new BookingInfoResponse();
		BookingInfo bookingInfoLocal= bookingInfoRepository.findByDropId(dropId.intValue());
		if(bookingInfoLocal!=null) {
			bookingInfoResponse = prepareResponse(bookingInfoResponse,bookingInfoLocal);
		}
		return bookingInfoResponse;
		}
	 
}