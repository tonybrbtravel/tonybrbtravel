package travel.berightback.ops.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@Entity
@NoArgsConstructor
@Table(name="bookinginfo")
public class BookingInfo {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
	
	@Column(name="booking_type")
	private String bookingType;
	
	@Column(name="trip_id")
	private Integer tripId;
	
	@Column(name="drop_id")
	private Integer dropId;
	
	@Column(name="trip_price")
	private Integer tripPrice;
	
	@Column(name="topup")
	private Integer topUp;
	
	@Column(name="trip_credit")
	private Integer tripCredit;
	
	@Column(name="cancellation_fee")
	private Integer CancellationFee;
	
	@Column(name="net_credit")
	private Integer netCredit;

	@Column(name="extras")
	private Integer extras;
	
	@Column(name="booking_email")
	private String bookingEmail;
	
	@Column(name="coupon")
	private Integer coupon;
	
	@Column(name="net_price")
	private Integer netPrice;
	
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "bookingInfo")
    private List<BookingCostDetails> bookingCostDetails= new ArrayList<>();
    
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "bookingInfo")
	private List<DestinationDetails> destinationDetails = new ArrayList<>();
	
	@Column(name="status")
	private String status;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "created_at")
	private Date createdAt;
	
	@Column(name="no_of_travellers")
	private Integer noOfTravellers;
}
