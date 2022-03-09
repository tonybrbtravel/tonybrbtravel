package travel.berightback.ops.model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "reward_activities")
public class RewardActivities {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	
	@Column(name = "activity_code")
	private String activityCode;

	@Column(name = "activity_name")
	private String activityName;
	
	@Column(name = "description")
	private String description;

	@Column(name = "points")
	private Integer points;

	@Column(name = "created_at")
	private Date createdAt;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "status")
	private String status;

}

