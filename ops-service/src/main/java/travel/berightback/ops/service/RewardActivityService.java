package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import travel.berightback.ops.ResourceNotFoundException;
import travel.berightback.ops.model.RewardActivities;
import travel.berightback.ops.repository.RewardActivitiesRepository;

@Service
public class RewardActivityService {

	@Autowired
	private RewardActivitiesRepository repository;

	public List<RewardActivities> getAllActivities(Optional<Integer> page, int size, List<Long> ids) {
		List<RewardActivities> rewardActivityDetails = new ArrayList<>();

		if (ids != null) {
			for (Long id : ids) {
				if (id == null) {
					continue;
				} else {
					RewardActivities rewardActivity = repository.getById(id);
					rewardActivityDetails.add(rewardActivity);
				}
			}

		} else {
			Pageable paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.ASC, "createdAt"));
			Page<RewardActivities> pagedResult = repository.findAll(paging);
			return pagedResult.getContent();
		}
		return rewardActivityDetails;
	}

	public RewardActivities getActivitiesById(Long id) {
		RewardActivities activities = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Rewards not found for this reward id :: " + id));
		;
		return activities;

	}

	public RewardActivities addRewardActivities(RewardActivities rewards, String username) {
		rewards.setCreatedBy(username);
		rewards.setCreatedAt(new Date());
		rewards.setStatus("ACTIVE");
		return repository.save(rewards);
	}

	public RewardActivities updateRewardActivities(RewardActivities rewards, Long id) {
		RewardActivities getRewards = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Rewards not found for this reward id :: " + id));
		getRewards.setActivityCode(rewards.getActivityCode());
		getRewards.setActivityName(rewards.getActivityName());
		getRewards.setPoints(rewards.getPoints());
		if (rewards.getStatus() != null) {
			getRewards.setStatus(rewards.getStatus());
		} else {
			getRewards.setStatus("ACTIVE");
		}

		final RewardActivities updatedRewards = repository.save(getRewards);
		return updatedRewards;
	}

	public void deleteRewardActivity(Long id) {
		RewardActivities reward = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" Reward activity not found" + id));
		reward.setStatus("Inactive");
		repository.save(reward);

	}

}
