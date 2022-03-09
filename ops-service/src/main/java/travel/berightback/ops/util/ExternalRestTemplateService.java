package travel.berightback.ops.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import travel.berightback.ops.dto.BRBTrip;

@Configuration
public class ExternalRestTemplateService {
	
	
	private static final String AUTHORIZATION_HEADER = "Authorization";

    public static String getBearerTokenHeader() {
      return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getHeader(AUTHORIZATION_HEADER);
    }
    
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        // Do any additional configuration here
        return builder.build();
    }

	@Autowired
	private RestTemplate restTemplate;
	
	public BRBTrip callGetMethod(String url, String tripId) {
		HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_JSON);
	    headers.set("Authorization", getBearerTokenHeader());
	    HttpEntity<String> entity = new HttpEntity<String>(headers);
	    Map<String, String> uriParams = new HashMap<>();
        uriParams.put("tripId", tripId);
	    ResponseEntity<BRBTrip> response = restTemplate.exchange(url, HttpMethod.GET, entity, BRBTrip.class,uriParams);
	    if(HttpStatus.OK.equals(response.getStatusCode())) {
	    	return response.getBody();
	    }
	    return null;
	}

}
