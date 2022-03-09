package travel.berightback.ops.model;

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
@Table(name="cities")
public class Cities extends Audit{

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="city_id")
	private long cityId;
	
	@Column(name="city_name")
	private String cityName;
	
	@Column(name="country")
	private String country;
	
	@Column(name="description")
	private String description;
	
	@Column(name="status")
	private String status;
	
	@Column(name="contentfull_id")
	private String contentfullId;


}
