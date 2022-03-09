package travel.berightback.ops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.Airports;





@Repository
public interface AirportRepository extends JpaRepository<Airports,Long> {
	
	@Query(value="select airport_code from airports where region=(select region from airports where airport_code=?1)",nativeQuery=true)
	public List<String> airportsByRegion(String airportCode);
	
	@Query(value="select airport_name from airports where airport_code=?1",nativeQuery=true)
	public String getAirportNameByAirportCode(String airportCode);

}
