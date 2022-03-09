package travel.berightback.ops.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;

import travel.berightback.ops.model.CountryIdMapping;
import travel.berightback.ops.repository.CountryIdRepository;

@Service
public class CountryIdMappingService {

	@Autowired
	private CountryIdRepository countryIdRepository;
	
	public CountryIdMapping addCountryIdDetails(CountryIdMapping countryIdMapping, String username) {
		countryIdMapping.setCreatedAt(new Date());
		countryIdMapping.setStatus("Active");
		countryIdMapping.setCreatedBy(username);
		return countryIdRepository.save(countryIdMapping);
	}
	
	public List<CountryIdMapping> getAllCountryIdDetails() {
		CountryIdMapping countryObj=null;
		List<CountryIdMapping> countryIdMapping= countryIdRepository.findAll();
		Collections.sort(countryIdMapping,Comparator.comparing(CountryIdMapping :: getNationality));
		for(CountryIdMapping obj: countryIdMapping) {
			if(obj.getNationality().equals("British")) {
				countryObj= obj;
				countryIdMapping.remove(obj);
				break;
			}
		}
		countryIdMapping.add(0, countryObj);
		return countryIdMapping;

	}

	public CountryIdMapping findCountryIdMappingById(Long id) {
		CountryIdMapping countryIdMapping = countryIdRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" Details not found :: " + id));
		;
		return countryIdMapping;
	}

	public CountryIdMapping updateCountryIdMappingDetails(Long id, CountryIdMapping countryDetails,String userName) {
		CountryIdMapping countryIdMapping = countryIdRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Details not found :: " + id));
		countryIdMapping.setNationality(countryDetails.getNationality());
		countryIdMapping.setCountryId(countryDetails.getCountryId());
		countryIdMapping.setUpdatedAt(new Date());
		countryIdMapping.setUpdatedBy(userName);
		if (countryDetails.getStatus() != null) {
			countryIdMapping.setStatus(countryDetails.getStatus());
		} else {
			countryIdMapping.setStatus("Active");
		}
		
		return countryIdRepository.save(countryIdMapping);
	}

	public void deleteCountryIdMappingDetails(Long id) {
		CountryIdMapping countryIdMapping = countryIdRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Details not found" + id));
		countryIdMapping.setStatus("Inactive");
		countryIdRepository.save(countryIdMapping);
	}
	
	public String getCountryId(String nationality) {
		String countryId= countryIdRepository.getCountryIdByNationality(nationality);
		if(countryId!=null)
		{
			return countryId;
		}
		else
			 return null;
	}

}
