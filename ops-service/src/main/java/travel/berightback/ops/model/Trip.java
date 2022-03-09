package travel.berightback.ops.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name="trips")
public class Trip {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="trip_id")
	private long tripId;
	
	@Column(name="user_id")
	private String user_id;
	
	@Column(name="start_date")
	private Date startDate;
	
	@Column(name="end_date")
	private String endDate;
	
	@Column(name="trip_status")
	private String tripStatus;
	
	@Column(name="cancellation_status")
	private Boolean cancellationStatus;
	
	@Column(name="room_type")
	private String roomType;
	
	@Column(name="trip_preference")
	private String tripPreference;
	
	@Column(name="number_of_cities")
	private Integer numOfCities;
	
	@Column(name="late_return")
	private Boolean lateReturn;
	
	@Column(name="rewards")
	private Integer rewards;
	
	@Column(name="booking_reference")
	private String bookingReference;
	
	@Column(name="trip_price")
	private Integer tripPrice;
	
	@Column(name="refund_amount")
	private Integer refundAmount;
	
	@Column(name="legacy_trip")
	private Boolean legacyTrip;
	
	@Column(name="notes")
	private Date notes;
	
	@Column(name="top_up")
	private Integer topUp;
	
	@Column(name="extra_travellers_price")
	private Integer extraTravellersPrice;
	
}
