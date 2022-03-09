package travel.berightback.ops.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import travel.berightback.ops.model.RewardActivities;
import travel.berightback.ops.service.RewardActivityService;
import travel.berightback.ops.util.UserPrincipal;

@RestController
@RequestMapping("/rewards")
@CrossOrigin
public class RewardActivityController {

	@Autowired
	private RewardActivityService rewardService;

	@PostMapping("/")
	public ResponseEntity<String> addRewardActivities(@RequestBody RewardActivities rewards, Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		RewardActivities rewardActivity = rewardService.addRewardActivities(rewards, principal.getUsername());
		return ResponseEntity.ok().body("id : " + rewardActivity.getId() + " Data Inserted ");
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateRewardActivities(@PathVariable(value = "id") Long id,
			@RequestBody RewardActivities rewards) {
		rewardService.updateRewardActivities(rewards, id);
		return ResponseEntity.ok().body("Data Updated id : " + id);
	}

	@GetMapping(path = "/")
	public ResponseEntity<List<RewardActivities>> getAllActivities(@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "5") int size,
			@RequestParam(required = false, value = "ids") List<Long> ids) {
		return ResponseEntity.ok(rewardService.getAllActivities(page, size, ids));
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<RewardActivities> getActivitiesById(@PathVariable(value = "id") Long activityId) {

		return new ResponseEntity<RewardActivities>(rewardService.getActivitiesById(activityId), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteRewardActivity(@PathVariable(value = "id") Long id) {
		rewardService.deleteRewardActivity(id);
		return new ResponseEntity<String>("Id : " + id + " Data Deleted ", HttpStatus.OK);
	}

}
