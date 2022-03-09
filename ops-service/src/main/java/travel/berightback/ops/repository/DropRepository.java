package travel.berightback.ops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.DropPackage;



@Repository
public interface DropRepository extends JpaRepository<DropPackage, Long> {
	
	@Query(value="select drop_id from flightoutdetails where departure_airport_code=?1",nativeQuery=true)
	List<Long> getDropIdsByAirportCode(String airportCode);
	
}
