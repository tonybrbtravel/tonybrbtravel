package travel.berightback.ops.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import travel.berightback.ops.model.RewardService;
import travel.berightback.ops.service.RewardServiceService;
import travel.berightback.ops.util.UserPrincipal;

@RestController
@RequestMapping("/rewardService")
@CrossOrigin
public class RewardServiceController {

	@Autowired
	private RewardServiceService rewardServiceLayer;

	@PostMapping("/")
	public ResponseEntity<String> addRewardServiceDetails(@RequestBody RewardService rewardService,
			Authentication auth) {
		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		RewardService rewards = rewardServiceLayer.addRewardService(rewardService, principal.getUsername());
		return ResponseEntity.ok().body("id : " + rewards.getId() + " Data inserted successfully!");
	}

	@GetMapping(value = "/")
	public ResponseEntity<List<RewardService>> getAllRewardServiceDetails(@RequestParam Optional<Integer> page,
			@RequestParam(required = false, value = "size", defaultValue = "20") int size,
			@RequestParam(required = false, value = "ids") List<Long> ids) {
		return ResponseEntity.ok(rewardServiceLayer.getAllRewardService(page, size, ids));
	}

	@GetMapping("/{id}")
	public ResponseEntity<RewardService> findRewardServiceById(@PathVariable(value = "id") Long id) {
		return ResponseEntity.ok().body(rewardServiceLayer.getRewardServiceById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateRewardService(@PathVariable(value = "id") Long id,
			@RequestBody RewardService rewardServiceDetails) {
		rewardServiceLayer.updateRewardActivities(rewardServiceDetails, id);
		return ResponseEntity.ok().body("Data updated of id :" + id);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteRewardService(@PathVariable(value = "id") Long id) {
		rewardServiceLayer.deleteRewardService(id);
		return ResponseEntity.ok().body("Id : " + id + " Data Deleted");
	}

}
