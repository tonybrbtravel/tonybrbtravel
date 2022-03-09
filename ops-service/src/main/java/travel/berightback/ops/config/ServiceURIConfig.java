package travel.berightback.ops.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class ServiceURIConfig {

    @Value("${services.urls.subscription-service}")
    String subscriptionServiceBaseUrl;

    @Value("${services.urls.user-profile-service}")
    String userProfileServiceBaseUrl;
    
    @Value("${services.urls.trip-service}")
    String tripServiceBaseUrl;

}
