package travel.berightback.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.RewardService;

@Repository
public interface RewardRepository extends JpaRepository<RewardService, Long> {

}
