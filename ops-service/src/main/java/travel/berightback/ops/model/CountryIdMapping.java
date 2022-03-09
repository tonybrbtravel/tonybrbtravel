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
@Table(name="country_id_mapping")
public class CountryIdMapping {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	
	@Column(name="nationality")
	private String nationality;
	
	@Column(name="country_id")
	private String countryId;
	
	@Column(name="status")
	private String status;
	
	@Column(name="updated_at")
	private Date updatedAt;
	
	@Column(name="updated_by")
	private String updatedBy;
	
	@Column(name="created_at")
	private Date createdAt;
	
	@Column(name="created_by")
	private String createdBy;

}
