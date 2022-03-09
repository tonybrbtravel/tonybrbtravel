package travel.berightback.ops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import travel.berightback.ops.model.FlightCarriers;


public interface FlightCarrierRepository extends JpaRepository<FlightCarriers, Long> {

	@Query(value="select * from flight_carriers where status=?1",nativeQuery=true)
	List<FlightCarriers> getActiveCarrierDetails(String status);
	
	
}
