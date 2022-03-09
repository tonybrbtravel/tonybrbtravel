package travel.berightback.ops.model;

import java.util.Date;
import java.util.List;
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
@Entity
@NoArgsConstructor
@Table(name="hotels")
public class Hotels {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="hotel_id",nullable=false,unique=true)
	private long hotelId;
	
	@Column(name="hotel_name")
	private String hotelName;
	
	@Column(name="trip_advisor_id")
	private String tripAdvisorId;
	
	@Column(name="star_rating")
	private Integer starRating;
	
	@Column(name="address")
	private String address;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="directions")
	private String hotelDirection;
	
	@Column(name="checkin_details")
	private String checkinDetails;
	
	@Column(name="latitude")
	private String latitude;
	
	@Column(name="longitude")
	private String longitude;
	
	@Column(name="content_url")
	private String contentUrl;
	
	@Column(name="description")
	private String description;
	
	@Column(name="map_url")
	private String mapUrl;
	
	@Column(name="status")
	private String status;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "created_at")
	private Date createdAt;
	
	@Column(name="destination_id")
	private long destinationId;
	
	@Column(name="hotel_position")
	private Integer hotelPosition;

	@Transient
	private List<HotelImages> hotelImage;

	@Transient
	private Cities city;
	
	
	
}