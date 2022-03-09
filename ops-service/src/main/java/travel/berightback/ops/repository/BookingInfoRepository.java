package travel.berightback.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import travel.berightback.ops.model.BookingInfo;



@Repository
public interface BookingInfoRepository extends JpaRepository<BookingInfo, Long> {
	
	BookingInfo findByDropId(Integer dropId);
	BookingInfo findByTripId(Integer tripId);
	long deleteByTripId(Integer tripId);

}
