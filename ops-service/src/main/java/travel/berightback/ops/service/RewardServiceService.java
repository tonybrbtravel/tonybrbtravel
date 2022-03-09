package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import travel.berightback.ops.ResourceNotFoundException;
import travel.berightback.ops.model.RewardService;
import travel.berightback.ops.repository.RewardRepository;

@Service
public class RewardServiceService {

	@Autowired
	private RewardRepository rewardRepository;

	public List<RewardService> getAllRewardService(Optional<Integer> page, int size, List<Long> ids) {

		List<RewardService> rewardServiceDetails = new ArrayList<>();

		if (ids != null) {
			for (Long id : ids) {
				if (id == null) {
					continue;
				} else {
					RewardService rewards = rewardRepository.getById(id);
					rewardServiceDetails.add(rewards);
				}
			}

		} else {
			Pageable paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.ASC, "id"));
			Page<RewardService> pagedResult = rewardRepository.findAll(paging);
			return pagedResult.getContent();
		}
		return rewardServiceDetails.stream().sorted(Comparator.comparing(RewardService::getId))
				.collect(Collectors.toList());
	}

	public RewardService getRewardServiceById(Long id) {
		RewardService rewardService = rewardRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Rewards not found for this reward id :: " + id));
		;
		return rewardService;

	}

	public RewardService addRewardService(RewardService rewards, String username) {
		rewards.setCreatedAt(new Date());
		rewards.setCreatedBy(username);
		rewards.setStatus("Active");
		return rewardRepository.save(rewards);
	}

	public RewardService updateRewardActivities(RewardService rewards, Long id) {
		RewardService getRewards = rewardRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Rewards not found for this reward id :: " + id));
		getRewards.setServiceCode(rewards.getServiceCode());
		getRewards.setServiceName(rewards.getServiceName());
		getRewards.setPoints(rewards.getPoints());

		if (rewards.getStatus() != null) {
			getRewards.setStatus(rewards.getStatus());
		} else {
			getRewards.setStatus("ACTIVE");
		}
		final RewardService updatedRewardDetails = rewardRepository.save(getRewards);
		return updatedRewardDetails;
	}

	public void deleteRewardService(Long id) {
		RewardService reward = rewardRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" Reward service not found" + id));
		reward.setStatus("Inactive");

		rewardRepository.save(reward);
	}

}
