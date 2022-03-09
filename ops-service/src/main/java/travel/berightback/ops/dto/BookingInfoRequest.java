package travel.berightback.ops.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookingInfoRequest {

	private int id;
	private String bookingType;
	private int tripId;
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
	private String status;
	private Integer noOfTravellers;
	private int extras;
}
