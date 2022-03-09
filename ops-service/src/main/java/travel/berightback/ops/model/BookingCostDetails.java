package travel.berightback.ops.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Entity
@NoArgsConstructor
@Table(name="bookingcostdetails")
public class BookingCostDetails {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="booking_id")
    private BookingInfo bookingInfo;
    
 	@Column(name="user_id")
	private String user_id;
 	
 	@Column(name="cost")
	private Integer cost;
 	
 	@Column(name="name")
	private String name;
 	
 	@Column(name="refunds")
	private Integer refunds;
	
}
