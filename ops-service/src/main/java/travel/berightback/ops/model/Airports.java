package travel.berightback.ops.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="airports")
public class Airports extends Audit {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="airport_id")
	private long id;
	
	@Column(name="airportName")
	private String airportName;
	
	@Column(name="airportCode",unique=true)
	private String airportCode;
	
	@Column(name="region")
	private String region;
	
	@Column(name="status")
	private String status;
	
	@Column(name="brb_origin")
	private boolean brbOrigin;
	
	@Transient
	private long airportCitiesCount;
	

}
