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
@Table(name="trip_type")
public class TripType extends Audit {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="id")
	 private long id;
	
	@Column(name="name")
	 private String name;
	
	@Column(name="imageUrl")
	 private String imageUrl;
	
	@Column(name="status")
	 private String status;
	
	@Column(name="description")
	private String description;
	

}
