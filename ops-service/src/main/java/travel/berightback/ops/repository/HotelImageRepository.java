package travel.berightback.ops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import travel.berightback.ops.model.HotelImages;



@Repository
public interface HotelImageRepository extends JpaRepository<HotelImages, Long> {
	
	public List<HotelImages> findByHotelId(Long hotelId);
}
