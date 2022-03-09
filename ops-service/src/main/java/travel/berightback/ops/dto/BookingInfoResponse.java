package travel.berightback.ops.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookingInfoResponse {
	
	private long bookingId;
	private String BookingType;
	private TripDetails tripDetails;
	private DropDetails dropDetails;
	
	private int tripPrice;
	private int topUp;
	private int tripCredit;
	private int cancellationFee;
	private int netCredit;
	private int extras;
	private String bookingEmail;
	private int coupon;
	private int netPrice;
	private List<TripCost> tripCost;
	private List<Destination> destinations;
	private Integer noOfTravellers;
}
