package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travel.berightback.ops.dto.HotelRequest;
import travel.berightback.ops.model.HotelImages;
import travel.berightback.ops.model.Hotels;
import travel.berightback.ops.repository.HotelImageRepository;

@Service
public class HotelImageService {

	@Autowired
	private HotelImageRepository hotelImageRepository;

	public List<HotelImages> getDetailsByHotelId(Long hotelId) {
		return hotelImageRepository.findByHotelId(hotelId);
	}

	public List<HotelImages> addHotelImageDetails(Hotels hotel, HotelRequest hotelRequest) {
		List<HotelImages> hotelImage = new ArrayList<>();
		int count = hotelRequest.getHotelImage().size();
		for (int i = 0; i < count; i++) {
			HotelImages hotelImg = new HotelImages();
			hotelImg.setHotelId(hotel.getHotelId());
			hotelImg.setImageUrl(hotelRequest.getHotelImage().get(i).getImageUrl());
			hotelImg.setHotelName(hotel.getHotelName());
			hotelImageRepository.save(hotelImg);
			hotelImage.add(hotelImg);
		}
		return hotelImage;

	}

	public List<HotelImages> updateHotelImageDetails(Long hotelId, HotelRequest hotelRequestDetails) {

		List<HotelImages> updatedHotelImage = new ArrayList<>();
		List<HotelImages> hotelImages = getDetailsByHotelId(hotelId);
		for(HotelImages hotelImage : hotelImages) {
			hotelImageRepository.deleteById(hotelImage.getId());
		}
		/*for (int i = 0; i < hotelImages.size(); i++) {
			HotelImages hotelImg = hotelImageRepository.getById(hotelImages.get(i).getId());
			hotelImg.setImageUrl(hotelRequestDetails.getHotelImage().get(i).getImageUrl());
			hotelImg.setHotelName(hotelRequestDetails.getHotelName());
			hotelImageRepository.save(hotelImg);
			updatedHotelImage.add(hotelImg);
		}*/

		for (int i = 0; i < hotelRequestDetails.getHotelImage().size(); i++) {
			HotelImages hotelImg = new HotelImages();
			hotelImg.setHotelId(hotelId);
			hotelImg.setImageUrl(hotelRequestDetails.getHotelImage().get(i).getImageUrl());
			hotelImg.setHotelName(hotelRequestDetails.getHotelName());
			hotelImageRepository.save(hotelImg);
			updatedHotelImage.add(hotelImg);

		}
		return updatedHotelImage;
	}

	public void deleteHotelImage(Long hotelImageId) {
		hotelImageRepository.deleteById(hotelImageId);
	}

}
