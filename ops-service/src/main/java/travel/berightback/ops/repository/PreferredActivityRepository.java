package travel.berightback.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.PreferredActivities;

@Repository
public interface PreferredActivityRepository extends JpaRepository<PreferredActivities, Long> {

}
