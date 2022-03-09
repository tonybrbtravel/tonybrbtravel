package travel.berightback.ops.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name="drop_package")
public class DropPackage {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	
	@Column(name="title")
	private String title;
	
	@Column(name="start_date")
	private Date start_date;
	
	@Column(name="travel_start_date")
	private Date travelStartDate;
	
	@Column(name="travel_end_date")
	private Date travelEndDate;
	
	@Column(name="pax")
	private Integer pax;
	
	@Column(name="destination_id")
	private Long destinationId;
	
	@Column(name="hotel_id")
	private Long hotelId;
	
	@Column(name="description")
	private String description;
	
	@Column(name="sold_out")
	private boolean soldOut;
	
	@Column(name="total_units")
	private Long totalUnits;
	
	@Column(name="status")
	private String status;
	
	@Column(name="price")
	private String price;
	
	@Column(name="packageImage")
	private String packageImage;
	
	@Column(name="rtol_doc_url")
	private String rtoldocUrl;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "created_at")
	private Date createdAt;
	
	@Column(name = "updated_by")
	private String updatedBy;
	
	@Column(name = "updated_at")
	private Date updatedAt;
	
	@Transient
	private Hotels hotels;
	
	@Transient
	private Cities city; 
	
	@Transient
	private FlightOutDetails outboundFlight;
	
	@Transient
	private FlightDetails returnFlight;

	@Transient
	private DropAccomodation dropAccomodation;
	
	
	
}
