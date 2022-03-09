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
@Table(name="hotel_images")
public class HotelImages {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@Column(name="hotel_id")
	private long hotelId;
	
	@Column(name="hotel_name")
	private String hotelName;

	
}
