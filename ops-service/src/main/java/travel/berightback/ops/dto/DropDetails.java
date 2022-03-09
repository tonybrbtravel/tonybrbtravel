package travel.berightback.ops.dto;

import java.util.Date;

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
public class DropDetails {
	
	private long id;
	private Date travelStartDate;
	private Integer travellers;
	private String description;
	private Date startingDate;
	private Date travelEndDate;
	private String title;

}
