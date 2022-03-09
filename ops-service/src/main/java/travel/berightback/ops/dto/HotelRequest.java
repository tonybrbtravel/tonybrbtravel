package travel.berightback.ops.dto;


import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import travel.berightback.ops.model.HotelImages;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HotelRequest {
	private Long hotelId;
	private String hotelName;
	private String tripAdvisorId;
	private Integer starRating;
	private String address;
	private String phone;
	private String hotelDirection;
	private String checkinDetails;
	private String latitude;
	private String longitude;
	private String contentUrl;
	private String description;
	private String mapUrl;
	private String status;
	private long destinationId;
	private List<HotelImages> hotelImage;
	private Integer hotelPosition;
}