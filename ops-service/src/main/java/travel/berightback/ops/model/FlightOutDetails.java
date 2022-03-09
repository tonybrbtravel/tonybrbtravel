package travel.berightback.ops.model;

import java.sql.Time;
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
@Entity
@NoArgsConstructor
@Table(name="flightoutdetails")
public class FlightOutDetails {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	
	@Column(name="departure_date")
	private Date departureDate;
	
	@Column(name="departure_time")
	private Time departureTime;
	
	@Column(name="departure_airportCode")
	private String departureAirportCode;
	
	@Column(name="arrival_date")
	private Date arrivalDate;
	
	@Column(name="arrival_time")
	private Time arrivalTime;
	
	@Column(name="arrival_airportCode")
	private String arrivalAirportCode;
	
	@Column(name="flight_carrierId")
	private int flightCarrierId;
	
	@Column(name="flight_number")
	private int flightNum;
	
	@Column(name="booking_email")
	private String bookingEmail;
	
	@Column(name="booking_reference")
	private String bookingRef;
	
	@Column(name="drop_id")
	private Long dropId;
	
}
