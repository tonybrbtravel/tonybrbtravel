package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;

import travel.berightback.ops.model.FlightCarriers;
import travel.berightback.ops.repository.FlightCarrierRepository;

@Service
public class FlightCarrierService {

	@Autowired
	private FlightCarrierRepository flightCarrierRepository;

	public FlightCarriers addFlightCarriersDetails(FlightCarriers flightCarrier, String userName) {
		flightCarrier.setCreatedAt(new Date());
		flightCarrier.setCreatedBy(userName);
		flightCarrier.setStatus("ACTIVE");
		return flightCarrierRepository.save(flightCarrier);
	}


	public Page<FlightCarriers> getAllFlightCarriersDetails(Optional<Integer> page, int size, String attribute,
			String order, List<Long> ids) {
		List<FlightCarriers> flightCarrierDetails = new ArrayList<>();

		if (ids != null) {
			for (Long id : ids) {
				if (id == null) {
					continue;
				} else {
					FlightCarriers flightCarrier = flightCarrierRepository.getById(id);
					flightCarrierDetails.add(flightCarrier);
				}
			}

		} else {
			Pageable paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.ASC, attribute));
			if (order.equals("desc")) {
				paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.DESC, attribute));
			}
			for (FlightCarriers obj : flightCarrierRepository.findAll(paging).getContent()) {
				if (obj.getStatus().equals("ACTIVE")) {
					flightCarrierDetails.add(obj);
				}
			}
			for (FlightCarriers obj : flightCarrierRepository.findAll(paging).getContent()) {
				if (!obj.getStatus().equals("ACTIVE")) {
					flightCarrierDetails.add(obj);
				}
			}

			return new PageImpl<>(flightCarrierDetails,paging,flightCarrierRepository.findAll(paging).getTotalElements());
		}
		return new PageImpl<>(flightCarrierDetails);
	}

	public FlightCarriers findFlightCarrierById(Long carrierId) {
		FlightCarriers flightCarrier = flightCarrierRepository.findById(carrierId)
				.orElseThrow(() -> new ResourceNotFoundException(
						"FlightCarrier details not found for this CarrierId :: " + carrierId));
		return flightCarrier;
	}

	public FlightCarriers updateFlightCarriers(Long carrierId, FlightCarriers flightCarrierDetails) {
		FlightCarriers flightCarrier = flightCarrierRepository.findById(carrierId)
				.orElseThrow(() -> new ResourceNotFoundException(
						"FlightCarrier details not found for this CarrierId :: " + carrierId));
		flightCarrier.setCarrierName(flightCarrierDetails.getCarrierName());
		flightCarrier.setWebCheckinUrl(flightCarrierDetails.getWebCheckinUrl());
		flightCarrier.setBookingEmail(flightCarrierDetails.getBookingEmail());
		flightCarrier.setBaggageAllowance(flightCarrierDetails.getBaggageAllowance());
		flightCarrier.setPriorityBoardingCost(flightCarrierDetails.getPriorityBoardingCost());
		if (flightCarrierDetails.getStatus() != null) {
			flightCarrier.setStatus(flightCarrierDetails.getStatus());
		} else {
			flightCarrier.setStatus("ACTIVE");
		}
		final FlightCarriers updatedFlightCarrierDetails = flightCarrierRepository.save(flightCarrier);
		return updatedFlightCarrierDetails;

	}

	public void deleteFlightCarrier(Long carrierId) {
		FlightCarriers flightCarrier = flightCarrierRepository.findById(carrierId)
				.orElseThrow(() -> new ResourceNotFoundException("FlightCarrier details not found" + carrierId));
		flightCarrier.setStatus("Inactive");
		flightCarrierRepository.save(flightCarrier);
	}

	public List<FlightCarriers> getActiveCarriersDetails() {
		List<FlightCarriers> flightCarrierDetails = flightCarrierRepository.getActiveCarrierDetails("ACTIVE");
		Collections.sort(flightCarrierDetails, Comparator.comparing(FlightCarriers::getCarrierName));
		return flightCarrierDetails;
	}

}
