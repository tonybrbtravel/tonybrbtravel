package travel.berightback.ops.dto;

import java.util.List;

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
public class Destination {
	
	private int destinationId;
	private List<HotelInfo> hotelInfo;
	private FlightInfoDetails flightInBoundDetails;
	private FlightInfoDetails flightOutBoundDetails;
	private String user_id;
	private String destinationName;

}