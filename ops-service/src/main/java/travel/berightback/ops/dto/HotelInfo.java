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
public class HotelInfo {

	private int hotelId;
	private String bookingReference;
	private String roomType;
	private boolean breakfastIncluded;
	private String user_id;
}
