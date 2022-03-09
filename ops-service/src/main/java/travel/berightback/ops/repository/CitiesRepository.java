package travel.berightback.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.Cities;




@Repository
public interface CitiesRepository  extends JpaRepository<Cities,Long>{

	@Query(value="select city_name from cities where city_id=?1",nativeQuery=true)
	String getDestinationName(long cityId);
}
