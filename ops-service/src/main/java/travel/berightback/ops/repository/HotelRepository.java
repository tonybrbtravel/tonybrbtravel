package travel.berightback.ops.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.Hotels;

@Repository
public interface HotelRepository extends JpaRepository<Hotels, Long> {

	@Query("select h from Hotels h  where lower(hotelName) like %:searchText% or hotelName like %:searchText% or destinationId=(select DISTINCT cityId from Cities where lower(cityName) like %:searchText% or cityName like %:searchText%)")
	public Page<Hotels> findByHotelSearchText(String searchText, Pageable page);

	@Query(value = "select * from hotels  ORDER BY hotel_position ASC limit 3", nativeQuery = true)
	public List<Hotels> findByPostion();

	@Query(value = "select * from hotels where status=?1", nativeQuery = true)
	public List<Hotels> getActiveHotelDetails(String status);
}
