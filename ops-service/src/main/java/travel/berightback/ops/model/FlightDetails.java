package travel.berightback.ops.model;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.joda.time.LocalTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name="flightdetails")
public class FlightDetails {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
	
	@Column(name="departure_date")
	private Date departureDate;
	
	@Column(name="departure_time")
	private Time departureTime;
	
	@Column(name="departure_airport_code")
	private String departureAirportCode;
	
	@Column(name="arrival_date")
	private Date arrivalDate;
	
	@Column(name="arrival_time")
	private Time arrivalTime;
	
	@Column(name="arrival_airport_code")
	private String arrivalAirportCode;
	
	@Column(name="flight_carrier_id")
	private int flightCarrierId;
	
	@Column(name="flight_number")
	private int flightNum;
	
	@Column(name="booking_email")
	private String bookingEmail;
	
	@Column(name="booking_reference")
	private String bookingRef;
	
	@Column(name="user_id")
	private String user_id;
	
	@Column(name="drop_id")
	private Long dropId;
	
	@Transient
	private String arrivalAirportName;
	
	@Transient
	private String departureAirportName;
	
	@Transient
	private String carrierName;
	
	@Transient
	private String baggageAllowance;
		
}
