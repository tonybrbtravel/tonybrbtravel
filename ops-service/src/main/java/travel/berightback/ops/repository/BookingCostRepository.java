package travel.berightback.ops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.BookingCostDetails;



@Repository
@EnableJpaRepositories
public interface BookingCostRepository extends JpaRepository<BookingCostDetails, Long> {
		
	@Query(value="select id from bookingcostdetails where booking_id=?1",nativeQuery=true)
	List<Long> getAllBoookingCostIds(Long bookingId);
}
