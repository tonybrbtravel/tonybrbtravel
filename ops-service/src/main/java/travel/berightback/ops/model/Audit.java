package travel.berightback.ops.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;


@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt","updatedAt"},allowGetters = true)
@Data
@NoArgsConstructor
public class Audit {

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at",nullable=false,updatable=false)
	@CreatedDate
	private Date createdAt;
	
	@Column(name = "created_by", nullable = false)
    @CreatedBy
    private String createdBy;
	

}
