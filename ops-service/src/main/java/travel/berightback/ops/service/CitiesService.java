package travel.berightback.ops.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;

import travel.berightback.ops.model.Cities;
import travel.berightback.ops.repository.CitiesRepository;

@Service
public class CitiesService {

	@Autowired
	private CitiesRepository citiesRepository;

	public Cities addCitiesDetails(Cities cities, String username) {
		cities.setCreatedAt(new Date());
		cities.setStatus("active");
		cities.setCreatedBy(username);
		return citiesRepository.save(cities);
	}

	public List<Cities> getAllCitiesDetails(Optional<Integer> page, int size, List<Long> ids) {
		List<Cities> citiesDetails = new ArrayList<>();
		Pageable paging = PageRequest.of(page.orElse(0), size, Sort.by(Sort.Direction.ASC, "createdAt"));
		Page<Cities> pagedResult = citiesRepository.findAll(paging);
		if (ids != null) {
			for (Long id : ids) {
				if (id == null) {
					continue;
				} else {
					Cities city = citiesRepository.getById(id);
					citiesDetails.add(city);
				}
			}

		} else
			return pagedResult.getContent();
		return citiesDetails;

	}

	public List<Cities> getAllCitiesDetails() {
		List<Cities> cityDetails= citiesRepository.findAll();
		Collections.sort(cityDetails,Comparator.comparing(Cities :: getCityName));
		return cityDetails;
	}

	public Cities findCityById(Long cityId) {
		Cities city = citiesRepository.findById(cityId)
				.orElseThrow(() -> new ResourceNotFoundException("City details not found :: " + cityId));
		;
		return city;
	}

	public Cities updateCityDetails(Long cityId, Cities cityDetails) {
		Cities city = citiesRepository.findById(cityId)
				.orElseThrow(() -> new ResourceNotFoundException("City details not found :: " + cityId));
		city.setCityName(cityDetails.getCityName());
		city.setCountry(cityDetails.getCountry());
		city.setDescription(cityDetails.getDescription());
		city.setContentfullId(cityDetails.getContentfullId());
		if (cityDetails.getStatus() != null) {
			city.setStatus(cityDetails.getStatus());
		} else {
			city.setStatus("ACTIVE");
		}
		final Cities updatedCityDetails = citiesRepository.save(city);
		return updatedCityDetails;
	}

	public void deleteCityDetails(Long cityId) {
		Cities city = citiesRepository.findById(cityId)
				.orElseThrow(() -> new ResourceNotFoundException("City details not found" + cityId));
		city.setStatus("Inactive");
		citiesRepository.save(city);
	}

}
