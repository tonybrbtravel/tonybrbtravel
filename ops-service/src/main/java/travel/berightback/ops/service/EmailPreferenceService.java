package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;

import travel.berightback.ops.model.EmailPreferences;
import travel.berightback.ops.model.FlightCarriers;
import travel.berightback.ops.repository.EmailPreferenceRepository;

@Service
public class EmailPreferenceService {

	@Autowired
	private EmailPreferenceRepository emailRepository;
	
	public EmailPreferences addDetails(EmailPreferences emailPreferenceDetails) {
		return emailRepository.save(emailPreferenceDetails);
		
	}
	
	public EmailPreferences getEmailPreferenceById(Long id) {
	return	emailRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Email Preference details not found" + id));
		
	}
	
	 public List<EmailPreferences> getAllEmailPreferenceDetails(Optional<Integer> page,int size,List<Long> ids) {
		 List<EmailPreferences> preferenceDetails= new ArrayList<>();	
		 Pageable paging=PageRequest.of(page.orElse(0),size);
		 Page<EmailPreferences> pagedResult=emailRepository.findAll(paging);
		 if(ids!=null) {
			 for(Long id:ids) {
				 if(id==null) {
					 continue;
				 }
				 else {
				 EmailPreferences emailPreference=emailRepository.getById(id);
				 preferenceDetails.add(emailPreference);
				 }
			 }
		 		
		 	}
		 	else
		 		return pagedResult.getContent();
		 	return preferenceDetails;
	    }
	

		public void deleteEmailPreference(Long id) {
			EmailPreferences emailPreference= emailRepository.findById(id).orElseThrow(
	                () -> new ResourceNotFoundException("Email Preference details not found" + id));
			emailRepository.delete(emailPreference);
		}
		
		
		public EmailPreferences updateEmailPreference(Long id,EmailPreferences emailPreferenceDetails) {
			EmailPreferences emailPreference =emailRepository.findById(id).orElseThrow(
					() -> new ResourceNotFoundException("Email Preference details not found" + id));
			emailPreference.setEmailPreferenceName(emailPreferenceDetails.getEmailPreferenceName());
			emailPreference.setDescription(emailPreferenceDetails.getDescription());
			EmailPreferences updatedEmailPreference=emailRepository.save(emailPreference);
			return updatedEmailPreference;
		}
}