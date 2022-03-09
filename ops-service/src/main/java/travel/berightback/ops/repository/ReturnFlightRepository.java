package travel.berightback.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.FlightDetails;

@Repository
public interface ReturnFlightRepository extends JpaRepository<FlightDetails, Long> {

	public FlightDetails findByDropId(Long dropId); 
}
