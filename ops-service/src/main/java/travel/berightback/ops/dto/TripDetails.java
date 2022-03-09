package travel.berightback.ops.dto;

import java.time.LocalDate;
import java.util.Date;
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
public class TripDetails {
	
	private long tripId;
	private LocalDate startDate;
	private LocalDate endDate;
	private String tripStatus;
	private String notes;

}
