package travel.berightback.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.Accomodations;
import travel.berightback.ops.model.DropAccomodation;

@Repository
public interface DropAccomodationsRepository extends JpaRepository<DropAccomodation, Long> {
	
	public DropAccomodation findByDropId(Long dropId);
}
