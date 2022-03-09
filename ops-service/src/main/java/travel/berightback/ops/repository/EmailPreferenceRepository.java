package travel.berightback.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import travel.berightback.ops.model.EmailPreferences;


@Repository
public interface EmailPreferenceRepository extends JpaRepository<EmailPreferences, Long> {

}
