package travel.berightback.ops.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name="accomodations")
public class Accomodations {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
	
	@Column(name="booking_reference")
	private String bookingRef;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="destination_details_id")
    private DestinationDetails destinationDetails;
    
	@Column(name="room_type")
	private String roomType;
	
	@Column(name="breakfast_included")
	private Boolean breakfastIncluded;
	
	@Column(name="hotelid")
	private Integer HotelId;
    
	@Column(name="user_id")
	private String user_id;
	
}
