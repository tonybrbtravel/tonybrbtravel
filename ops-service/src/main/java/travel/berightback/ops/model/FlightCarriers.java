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
@Table(name="flight_carriers")
public class FlightCarriers {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="carrier_id")
	private long carrierId;
	
	@Column(name="carrier_name")
	private String carrierName;
	
	@Column(name="web_checkin_url")
	private String webCheckinUrl;
	
	@Column(name="booking_email")
	private String bookingEmail;
	
	@Column(name="baggage_allowance")
	private String baggageAllowance;
	
	@Column(name="priority_boarding_cost")
	private Double priorityBoardingCost;
	
	@Column(name="status")
	private String status;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "created_at")
	private Date createdAt;
}
