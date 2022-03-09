package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;

import travel.berightback.ops.model.Cities;
import travel.berightback.ops.model.DropAccomodation;
import travel.berightback.ops.model.DropPackage;
import travel.berightback.ops.model.FlightDetails;
import travel.berightback.ops.model.FlightOutDetails;
import travel.berightback.ops.model.Hotels;
import travel.berightback.ops.repository.DropRepository;

@Service
public class DropService {

	@Autowired
	private DropRepository dropRepository;

	@Autowired
	private DropAccomodationService dropAccomodationService;

	@Autowired
	private FlightOutBoundService flightOutBoundService;

	@Autowired
	private ReturnFlightService returnFlightService;

	@Autowired
	private CitiesService cityService;

	@Autowired
	private HotelsService hotelService;

	@Autowired
	private AirportService airportService;

	public DropPackage addDropDetails(DropPackage dropDetails, String username) {
		dropDetails.setCreatedAt(new Date());
		dropDetails.setCreatedBy(username);
		dropDetails.setStatus("Live");
		dropDetails.setUpdatedAt(null);
		dropDetails.setUpdatedBy(null);
		DropPackage dropPackage = dropRepository.save(dropDetails);

		if (dropDetails.getDropAccomodation() == null || dropDetails.getOutboundFlight() == null
				|| dropDetails.getReturnFlight() == null) {
			return dropPackage;
		}
		DropAccomodation accomodation = dropPackage.getDropAccomodation();
		DropAccomodation insertedAccomodation = dropAccomodationService.addAccomodationDetails(dropPackage.getId(),
				accomodation);
		dropPackage.setDropAccomodation(insertedAccomodation);

		FlightOutDetails flightOutbound = dropPackage.getOutboundFlight();
		FlightOutDetails flightOutboundDetails = flightOutBoundService.addFlightOutBoundDetails(dropPackage.getId(),
				flightOutbound);
		dropPackage.setOutboundFlight(flightOutboundDetails);

		FlightDetails returnFlightDetails = dropPackage.getReturnFlight();
		FlightDetails insertedReturnFlightDetails = returnFlightService.addReturnFlightDetails(dropPackage.getId(),
				returnFlightDetails);
		dropPackage.setReturnFlight(insertedReturnFlightDetails);

		dropPackage.setCity(cityService.findCityById(dropPackage.getDestinationId()));
		dropPackage.setHotels(hotelService.findHotelById(dropPackage.getHotelId()));
		return dropPackage;
	}

	public Page<DropPackage> getAllDropDetails(Optional<Integer> page, int size, String attribute, String order,
			List<Long> ids) {
		List<DropPackage> dropDetails = new ArrayList<>();
		if (ids != null) {
			for (Long id : ids) {
				if (id == null) {
					continue;
				} else {
					DropPackage dropdetail = dropRepository.getById(id);
					dropdetail.setCity(cityService.findCityById(dropdetail.getDestinationId()));
					dropdetail.setHotels(hotelService.findHotelById(dropdetail.getHotelId()));
					dropdetail.setDropAccomodation(dropAccomodationService.getDropAccomodationById(id));
					dropdetail.setOutboundFlight(flightOutBoundService.getOutBoundFlightById(id));
					dropdetail.setReturnFlight(returnFlightService.getReturnFlightDetailsById(id));
					dropDetails.add(dropdetail);
				}
			}

		} else {
			Pageable paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.ASC, attribute));
			if (order.equals("desc")) {
				paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.DESC, attribute));
				System.out.println(order);
			}
			Page<DropPackage> dropPackages = dropRepository.findAll(paging);
			for (DropPackage dropPackage : dropPackages.getContent()) {
				dropPackage.setCity(cityService.findCityById(dropPackage.getDestinationId()));
				dropPackage.setHotels(hotelService.findHotelById(dropPackage.getHotelId()));
				dropPackage.setDropAccomodation(dropAccomodationService.getDropAccomodationById(dropPackage.getId()));
				dropPackage.setOutboundFlight(flightOutBoundService.getOutBoundFlightById(dropPackage.getId()));
				dropPackage.setReturnFlight(returnFlightService.getReturnFlightDetailsById(dropPackage.getId()));
			}
			return dropPackages;

		}
		return new PageImpl<>(dropDetails);

	}

	public DropPackage findDropDetailsById(Long dropId) {
		DropPackage dropDetails = dropRepository.findById(dropId)
				.orElseThrow(() -> new ResourceNotFoundException("Drop details not found  :: " + dropId));
		dropDetails.setCity(cityService.findCityById(dropDetails.getDestinationId()));
		dropDetails.setHotels(hotelService.findHotelById(dropDetails.getHotelId()));
		dropDetails.setDropAccomodation(dropAccomodationService.getDropAccomodationById(dropId));
		dropDetails.setOutboundFlight(flightOutBoundService.getOutBoundFlightById(dropId));
		dropDetails.setReturnFlight(returnFlightService.getReturnFlightDetailsById(dropId));
		return dropDetails;
	}

	public DropPackage updateDropDetails(Long dropId, DropPackage dropDetails, String username) {
		DropPackage currentDropDetails = dropRepository.findById(dropId)
				.orElseThrow(() -> new ResourceNotFoundException("Drop details not found  :: " + dropId));
		currentDropDetails.setHotelId(dropDetails.getHotelId());
		currentDropDetails.setDestinationId(dropDetails.getDestinationId());
		currentDropDetails.setStart_date(dropDetails.getStart_date());
		currentDropDetails.setTravelStartDate(dropDetails.getTravelStartDate());
		currentDropDetails.setTravelEndDate(dropDetails.getTravelEndDate());
		currentDropDetails.setTotalUnits(dropDetails.getTotalUnits());
		currentDropDetails.setUpdatedBy(username);
		currentDropDetails.setUpdatedAt(new Date());
		if (dropDetails.getStatus() != null) {
			currentDropDetails.setStatus(dropDetails.getStatus());
		} else {
			currentDropDetails.setStatus("LIVE");
		}
		currentDropDetails.setDescription(dropDetails.getDescription());
		currentDropDetails.setPackageImage(dropDetails.getPackageImage());
		currentDropDetails.setPax(dropDetails.getPax());
		currentDropDetails.setPrice(dropDetails.getPrice());
		currentDropDetails.setRtoldocUrl(dropDetails.getRtoldocUrl());
		currentDropDetails.setSoldOut(dropDetails.isSoldOut());
		currentDropDetails.setTitle(dropDetails.getTitle());
		DropPackage updatedDropDetails = dropRepository.save(currentDropDetails);
		Cities city = cityService.findCityById(updatedDropDetails.getDestinationId());
		updatedDropDetails.setCity(city);
		Hotels hotel = hotelService.findHotelById(updatedDropDetails.getHotelId());
		updatedDropDetails.setHotels(hotel);
		if (dropAccomodationService.getDropAccomodationById(dropId) == null) {
			DropAccomodation accomodation = dropDetails.getDropAccomodation();
			DropAccomodation insertedAccomodation = dropAccomodationService.addAccomodationDetails(dropId,
					accomodation);
			updatedDropDetails.setDropAccomodation(insertedAccomodation);
		} else {
			DropAccomodation dropAccomodation = dropDetails.getDropAccomodation();
			updatedDropDetails
					.setDropAccomodation(dropAccomodationService.updateDropAccomodation(dropId, dropAccomodation));
		}
		if (flightOutBoundService.getOutBoundFlightById(dropId) == null) {
			FlightOutDetails flightOutbound = dropDetails.getOutboundFlight();
			FlightOutDetails flightOutboundDetails = flightOutBoundService.addFlightOutBoundDetails(dropId,
					flightOutbound);
			updatedDropDetails.setOutboundFlight(flightOutboundDetails);
		} else {
			FlightOutDetails outBoundDetails = dropDetails.getOutboundFlight();
			updatedDropDetails
					.setOutboundFlight(flightOutBoundService.updateFlightOutBoundDetails(dropId, outBoundDetails));
		}
		if (returnFlightService.getReturnFlightDetailsById(dropId) == null) {
			FlightDetails returnFlightDetails = dropDetails.getReturnFlight();
			FlightDetails insertedReturnFlightDetails = returnFlightService.addReturnFlightDetails(dropId,
					returnFlightDetails);
			updatedDropDetails.setReturnFlight(insertedReturnFlightDetails);

		} else {
			FlightDetails returnFlight = dropDetails.getReturnFlight();
			updatedDropDetails.setReturnFlight(returnFlightService.updateReturnFlightDetails(dropId, returnFlight));
		}
		return updatedDropDetails;

	}

	public void deleteDropDetails(Long dropId) {
		DropPackage dropDetails = dropRepository.findById(dropId)
				.orElseThrow(() -> new ResourceNotFoundException("Drop details not found" + dropId));
		dropDetails.setStatus("NOT LIVE");
		dropRepository.save(dropDetails);
	}

	@SuppressWarnings("unused")
	public List<DropPackage> getDropsByAirportCode(List<String> airportsCode) {
		List<DropPackage> dropDetails = new ArrayList<>();
		if (airportsCode != null) {
			TreeSet<String> airportsByRegion = airportService.airportsByRegion(airportsCode);
			for (String airportCode : airportsByRegion) {
				List<Long> dropIds = dropRepository.getDropIdsByAirportCode(airportCode);
				for (Long id : dropIds) {
					DropPackage drops = dropRepository.findById(id)
							.orElseThrow(() -> new ResourceNotFoundException("Drop details not found" + id));
					if (drops.getStatus().equals("Live")) {
						if (drops == null)
							continue;
						drops.setCity(cityService.findCityById(drops.getDestinationId()));
						drops.setHotels(hotelService.findHotelById(drops.getHotelId()));
						drops.setDropAccomodation(dropAccomodationService.getDropAccomodationById(drops.getId()));
						drops.setOutboundFlight(flightOutBoundService.getOutBoundFlightById(drops.getId()));
						drops.setReturnFlight(returnFlightService.getReturnFlightDetailsById(drops.getId()));
						dropDetails.add(drops);
					}
				}
			}
		} else
			return null;
		return dropDetails;
	}

}
