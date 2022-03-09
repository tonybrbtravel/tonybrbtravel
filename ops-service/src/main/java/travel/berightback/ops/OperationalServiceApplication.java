package travel.berightback.ops;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import travel.berightback.ops.model.AuditorAwareImpl;

/**
 * 
 * @author krishna.guntakala
 *
 */

@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@SpringBootApplication
@EnableSwagger2
public class OperationalServiceApplication {

	@Bean
	public AuditorAware<String> auditorAware(){

		return new AuditorAwareImpl();
	}
	
	public static void main(String[] args) {
		
		SpringApplication.run(OperationalServiceApplication.class, args);
	}
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	
}


