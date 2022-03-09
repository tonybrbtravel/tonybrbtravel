package travel.berightback.ops.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookingInfoResponseForPost {
	
	private long bookingId;
	private String BookingType;
	
	@JsonInclude(content = Include.NON_NULL)
	private int tripId;
	
	@JsonInclude(content = Include.NON_NULL)
	private int dropId;
	
	private int tripPrice;
	private int topUp;
	private int tripCredit;
	private int cancellationFee;
	private int netCredit;
	private String bookingEmail;
	private int coupon;
	private int netPrice;
	private List<TripCost> tripCost;
	private List<Destination> destinations;
	private Integer noOfTravellers;
}
