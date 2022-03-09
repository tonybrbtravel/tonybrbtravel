package travel.berightback.ops.service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import travel.berightback.ops.dto.HotelRequest;
import travel.berightback.ops.model.Cities;
import travel.berightback.ops.model.HotelImages;
import travel.berightback.ops.model.Hotels;
import travel.berightback.ops.repository.HotelImageRepository;
import travel.berightback.ops.repository.HotelRepository;

import java.util.*;

@Service
public class HotelsService {

	@Autowired
	private HotelRepository hotelRepository;

	@Autowired
	private HotelImageRepository hotelImageRepository;

	@Autowired
	private HotelImageService hotelImageService;

	@Autowired
	private CitiesService cityService;

	@Autowired
	private ModelMapper modelMapper;

	public Hotels addHotelDetails(HotelRequest hotelRequest, String username) {

		Hotels hotel = convertToEntity(hotelRequest);
		hotel.setCreatedBy(username);
		hotel.setCreatedAt(new Date());
		hotel.setStatus("Active");
		Hotels insertedHotel = hotelRepository.save(hotel);
		List<HotelImages> hotelImages = hotelImageService.addHotelImageDetails(insertedHotel, hotelRequest);
		insertedHotel.setHotelImage(hotelImages);
		return insertedHotel;

	}

	private Hotels convertToEntity(HotelRequest hotelRequest) {
		Hotels hotel = modelMapper.map(hotelRequest, Hotels.class);

		return hotel;
	}

	public Page<Hotels> getAllHotelDetails(Optional<Integer> page, int size, String attribute, String order,
			List<Long> ids) {
		List<Hotels> hotelDetails = new ArrayList<>();

		if (ids != null) {
			for (Long id : ids) {
				if (id != null) {

					Hotels hotel = hotelRepository.getById(id);
					hotel.setHotelImage(hotelImageService.getDetailsByHotelId(id));
					hotel.setCity(cityService.findCityById(hotel.getDestinationId()));
					hotelDetails.add(hotel);
				}
			}

		} else {
			Pageable paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.ASC, attribute));
			if (order.equals("desc")) {
				paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.DESC, attribute));
			}

			Page<Hotels> pagedResult = hotelRepository.findAll(paging);
			List<Hotels> hotelInfo = pagedResult.getContent();
			for (Hotels hotel : hotelInfo) {
				if (hotel.getStatus().equals("Active")) {
					hotel.setCity(cityService.findCityById(hotel.getDestinationId()));
					hotel.setHotelImage(hotelImageService.getDetailsByHotelId(hotel.getHotelId()));
					hotelDetails.add(hotel);
				}
			}
			for (Hotels hotel : hotelInfo) {
				if (!hotel.getStatus().equals("Active")) {
					hotel.setCity(cityService.findCityById(hotel.getDestinationId()));
					hotel.setHotelImage(hotelImageService.getDetailsByHotelId(hotel.getHotelId()));
					hotelDetails.add(hotel);
				}
			}
			
			return new PageImpl<>(hotelDetails,paging,pagedResult.getTotalElements());
		}
		return new PageImpl<>(hotelDetails);

	}

	public List<Hotels> setHotelImageCitiesDetails(List<Hotels> hotels) {
		List<Hotels> allHotelDetails = new ArrayList<>();
		for (Hotels hotel : hotels) {
			hotel.setHotelImage(hotelImageRepository.findByHotelId(hotel.getHotelId()));
			hotel.setCity(cityService.findCityById(hotel.getDestinationId()));
			allHotelDetails.add(hotel);
		}
		return allHotelDetails;
	}

	public Hotels findHotelById(Long hotelId) {

		Hotels hotel = hotelRepository.findById(hotelId).orElseThrow(
				() -> new ResourceNotFoundException("Hotel details not found for this hotelId :: " + hotelId));
		hotel.setHotelImage(hotelImageRepository.findByHotelId(hotelId));
		hotel.setCity(cityService.findCityById(hotel.getDestinationId()));
		return hotel;
	}

	public Hotels updateHotel(Long hotelId, HotelRequest hotelRequestDetails) {
		Hotels hotel = hotelRepository.findById(hotelId).orElseThrow(
				() -> new ResourceNotFoundException("Hotel details not found for this hotelId :: " + hotelId));
		Hotels hotelDetails = convertToEntity(hotelRequestDetails);
		hotel.setHotelName(hotelDetails.getHotelName());
		hotel.setTripAdvisorId(hotelDetails.getTripAdvisorId());
		hotel.setStarRating(hotelDetails.getStarRating());
		hotel.setAddress(hotelDetails.getAddress());
		hotel.setPhone(hotelDetails.getPhone());
		hotel.setDescription(hotelDetails.getDescription());
		hotel.setHotelDirection(hotelDetails.getHotelDirection());
		hotel.setLatitude(hotelDetails.getLatitude());
		hotel.setLongitude(hotelDetails.getLongitude());
		hotel.setContentUrl(hotelDetails.getContentUrl());
		hotel.setHotelPosition(hotelDetails.getHotelPosition());
		if (hotelDetails.getStatus() != null) {
			hotel.setStatus(hotelDetails.getStatus());
		} else {
			hotel.setStatus("Active");
		}

		hotel.setCheckinDetails(hotelDetails.getCheckinDetails());
		final Hotels updatedHotelDetails = hotelRepository.save(hotel);

		List<HotelImages> updatedHotelImages = hotelImageService.updateHotelImageDetails(hotelId, hotelRequestDetails);
		updatedHotelDetails.setHotelImage(updatedHotelImages);

		Cities city = cityService.findCityById(hotel.getDestinationId());
		updatedHotelDetails.setCity(city);

		return updatedHotelDetails;
	}

	public void deleteHotel(Long hotelId) {
		Hotels hotel = hotelRepository.findById(hotelId)
				.orElseThrow(() -> new ResourceNotFoundException("Hotel details not found" + hotelId));
		hotel.setStatus("inactive");
		hotelRepository.save(hotel);
	}

	public Page<Hotels> getHotelsBySearchText(Optional<String> searchText, Optional<Integer> page, int size,
			String attribute, String order) {
		Pageable paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.ASC, attribute));
		if (order.equals("desc")) {
			paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.DESC, attribute));
		}
		Page<Hotels> pagedResult = hotelRepository.findByHotelSearchText(searchText.orElse("-"), paging);
		List<Hotels> hotelInfo = pagedResult.getContent();
		for (Hotels hotel : hotelInfo) {
			hotel.setCity(cityService.findCityById(hotel.getDestinationId()));
			hotel.setHotelImage(hotelImageService.getDetailsByHotelId(hotel.getHotelId()));
		}
		return pagedResult;
	}

	public List<Hotels> getBestHotelsByPosition() {
		List<Hotels> hotels = hotelRepository.findByPostion();
		for (Hotels hotel : hotels) {
			hotel.setCity(cityService.findCityById(hotel.getDestinationId()));
			hotel.setHotelImage(hotelImageService.getDetailsByHotelId(hotel.getHotelId()));

		}
		return hotels;
	}

	public List<Hotels> getActiveHotelDetails() {
		List<Hotels> hotelDetails = hotelRepository.getActiveHotelDetails("Active");
		Collections.sort(hotelDetails, Comparator.comparing(Hotels::getHotelName));
		return hotelDetails;
	}
}
