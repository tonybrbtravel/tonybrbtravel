package travel.berightback.ops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import travel.berightback.ops.model.DestinationDetails;

public interface DestinationDetailsRepository extends JpaRepository<DestinationDetails, Long> {

	@Query(value="select id from destinationdetails where booking_id=?1",nativeQuery=true)
	List<Long> getAllDestinationDetailsIds(Long bookingId);
}
