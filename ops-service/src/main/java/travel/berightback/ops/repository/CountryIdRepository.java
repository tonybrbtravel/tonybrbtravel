package travel.berightback.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import travel.berightback.ops.model.CountryIdMapping;

public interface CountryIdRepository extends JpaRepository<CountryIdMapping, Long> {
	
	@Query(value="select country_id from country_id_mapping where nationality=?1",nativeQuery=true)
	String getCountryIdByNationality(String nationality);
	
}
