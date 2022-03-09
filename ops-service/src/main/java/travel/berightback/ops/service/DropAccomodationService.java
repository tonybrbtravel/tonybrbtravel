package travel.berightback.ops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travel.berightback.ops.model.DropAccomodation;
import travel.berightback.ops.repository.DropAccomodationsRepository;

@Service
public class DropAccomodationService {
		
	@Autowired
	private DropAccomodationsRepository accomodationRepository;
	
	public DropAccomodation addAccomodationDetails(Long dropId,DropAccomodation accomodationDetails) {
		DropAccomodation dropAccomodation=new DropAccomodation();
		dropAccomodation.setDropId(dropId);
		dropAccomodation.setBreakfastIncluded(accomodationDetails.isBreakfastIncluded());
		dropAccomodation.setRoomType(accomodationDetails.getRoomType());
		
		return accomodationRepository.save(dropAccomodation);
		
	}
	
	public DropAccomodation getDropAccomodationById(Long dropId) {
		return accomodationRepository.findByDropId(dropId);
	}
	
	public DropAccomodation updateDropAccomodation(Long dropId,DropAccomodation accomodationDetails) {
		DropAccomodation dropAccomodation=accomodationRepository.findByDropId(dropId);
		dropAccomodation.setBreakfastIncluded(accomodationDetails.isBreakfastIncluded());
		dropAccomodation.setRoomType(accomodationDetails.getRoomType());
		
		return accomodationRepository.save(dropAccomodation);
	}
}
