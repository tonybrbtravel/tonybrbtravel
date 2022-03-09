package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import travel.berightback.ops.ResourceNotFoundException;
import travel.berightback.ops.model.TripType;
import travel.berightback.ops.repository.TripTypeRepository;

@Service
public class TripTypeService {

	@Autowired
	private TripTypeRepository triptypeRepository;

	public TripType addTripTypeDetails(TripType trip_Type, String username) {
		trip_Type.setStatus("active");
		trip_Type.setCreatedBy(username);
		trip_Type.setCreatedAt(new Date());
		return triptypeRepository.save(trip_Type);
	}

	public List<TripType> getAllTripTypeDetails(Optional<Integer> page, int size, List<Long> ids) {
		List<TripType> tripTypeDetails = new ArrayList<>();

		if (ids != null) {
			for (Long id : ids) {
				if (id == null) {
					continue;
				} else {
					TripType tripType = triptypeRepository.getById(id);
					tripTypeDetails.add(tripType);
				}
			}

		} else {
			Pageable paging = PageRequest.of(page.orElse(0), size);
			Page<TripType> pagedResult = triptypeRepository.findAll(paging);
			return pagedResult.getContent();
		}
		return tripTypeDetails;
	}

	public TripType findTripTypeById(Long tripTypeId) {
		TripType tripType = triptypeRepository.findById(tripTypeId)
				.orElseThrow(() -> new ResourceNotFoundException("Trip_type details not found" + tripTypeId));
		return tripType;
	}

	public TripType updateTripType(Long tripTypeId, TripType tripTypeDetails) {
		TripType tripType = triptypeRepository.findById(tripTypeId).orElseThrow(
				() -> new ResourceNotFoundException("tripType details not found for this airportId :: " + tripTypeId));
		tripType.setName(tripTypeDetails.getName());
		tripType.setImageUrl(tripTypeDetails.getImageUrl());
		if (tripTypeDetails.getStatus() != null) {
			tripType.setStatus(tripTypeDetails.getStatus());
		} else {
			tripType.setStatus("ACTIVE");
		}
		tripType.setDescription(tripTypeDetails.getDescription());
		final TripType updatedTriptypeDetails = triptypeRepository.save(tripType);
		return updatedTriptypeDetails;
	}

	public void deleteTripType(Long tripTypeId) {
		TripType tripType = triptypeRepository.findById(tripTypeId)
				.orElseThrow(() -> new ResourceNotFoundException("tripType details not found" + tripTypeId));
		tripType.setStatus("Inactive");
		triptypeRepository.save(tripType);
	}
}
