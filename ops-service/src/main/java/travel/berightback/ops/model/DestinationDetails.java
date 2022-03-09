package travel.berightback.ops.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Entity
@NoArgsConstructor
@Table(name="destinationdetails")
public class DestinationDetails {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	
    @Column(name = "destination_id")
    private Integer destinationId;
	
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "destinationDetails")
    private List<Accomodations> accomodations= new ArrayList<>();
	
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "flight_in_details_id")
    private FlightDetails flightInDetails;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "flight_out_details_id")
    private FlightDetails flightOutDetails;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="booking_id" , nullable=false)
    private BookingInfo bookingInfo;
    
	@Column(name="user_id")
	private String user_id;
	
}
