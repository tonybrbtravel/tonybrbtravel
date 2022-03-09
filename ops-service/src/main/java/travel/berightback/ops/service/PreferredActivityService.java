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
import travel.berightback.ops.model.PreferredActivities;
import travel.berightback.ops.repository.PreferredActivityRepository;

@Service
public class PreferredActivityService {

	@Autowired
	private PreferredActivityRepository preferredActivityRepository;

	public PreferredActivities addPreferredActivityDetails(PreferredActivities preferredActivities, String username) {
		preferredActivities.setStatus("Active");
		preferredActivities.setCreatedAt(new Date());
		preferredActivities.setCreatedBy(username);
		preferredActivities.setUpdated_at(null);
		preferredActivities.setUpdatedBy(null);
		return preferredActivityRepository.save(preferredActivities);
	}

	public List<PreferredActivities> getAllPreferredActivitiesDetails(Optional<Integer> page, int size,
			List<Long> ids) {
		List<PreferredActivities> preferredActivities = new ArrayList<>();

		if (ids != null) {
			for (Long id : ids) {
				if (id == null) {
					continue;
				} else {
					PreferredActivities preferredActivity = preferredActivityRepository.getById(id);
					preferredActivities.add(preferredActivity);
				}
			}

		} else {
			Pageable paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.ASC, "createdAt"));
			Page<PreferredActivities> pagedResult = preferredActivityRepository.findAll(paging);
			return pagedResult.getContent();
		}
		return preferredActivities;
	}

	public PreferredActivities findPreferredActivitiesById(Long id) {
		PreferredActivities preferredActivities = preferredActivityRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("PreferredActivity details not found for this Id :: " + id));
		;
		return preferredActivities;
	}

	public PreferredActivities updatePreferredActivity(Long id, PreferredActivities preferredActivities,
			String username) {
		PreferredActivities preferredActivity = preferredActivityRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("PreferredActivities details not found for this id :: " + id));
		preferredActivity.setActivityName(preferredActivities.getActivityName());
		preferredActivity.setUpdated_at(new Date());
		preferredActivity.setUpdatedBy(username);
		if (preferredActivities.getStatus() != null) {
			preferredActivity.setStatus(preferredActivities.getStatus());
		} else {
			preferredActivity.setStatus("ACTIVE");
		}
		final PreferredActivities updatedPreferredActivities = preferredActivityRepository.save(preferredActivity);
		return updatedPreferredActivities;

	}

	public void deletePreferredActivity(Long id) {
		PreferredActivities preferredActivity = preferredActivityRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Preferred Activity details not found" + id));
		preferredActivity.setStatus("Inactive");
		preferredActivityRepository.save(preferredActivity);

	}

}
