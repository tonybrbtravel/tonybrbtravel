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
@Entity
@NoArgsConstructor
@Table(name="airport_city_mapping")
public class AirportCitiesMapping {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="airport_city_id")
	private long airportCityId;
	
	@Column(name="airport_id")
	private long airportId;
	
	@Column(name="city_id")
	private long cityId;

}
