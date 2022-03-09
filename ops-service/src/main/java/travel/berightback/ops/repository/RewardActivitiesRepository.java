package travel.berightback.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.RewardActivities;





@Repository
public interface RewardActivitiesRepository extends JpaRepository<RewardActivities,Long> {

}
