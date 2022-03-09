package travel.berightback.ops.dto;

import java.sql.Time;
import java.util.Date;

import org.joda.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FlightInfoDetails {
	
	private Date departureDate;
	private Time departureTime;
	private String departureAirportCode;
	private String departureAirportName;
	private Date arrivalDate;
	private Time arrivalTime;
	private String arrivalAirportCode;
	private String arrivalAirportName;
	private int flightCarrierId;
	private int flightNumber;
	private String carrierName;
	private String baggageAllowance;
	private String bookingEmail;
	private String bookingReference;
	private String user_id;
	

}