package travel.berightback.ops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.AirportCitiesMapping;



@Repository
public interface AirportCityRepository extends JpaRepository<AirportCitiesMapping, Long> {

	List<AirportCitiesMapping> findByairportId(Long airportId);
	List<AirportCitiesMapping> findBycityId(Long cityId);
	
	@Query(value="select count(*) from cities obj1\r\n"
			+ "JOIN airport_city_mapping obj2 on obj1.city_id=obj2.city_id\r\n"
			+ "where obj2.airport_id=?1",nativeQuery=true)
	Long getDestinationCount(Long id);
}
