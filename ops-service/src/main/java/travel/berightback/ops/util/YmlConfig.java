package travel.berightback.ops.util;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties("services")

public class YmlConfig {
	
	private String environment;
	
    public String getEnvironment() {
        return environment;
    }
 
    public void setEnvironment(String environment) {
        this.environment = environment;
    }
    
    @Override
    public String toString() {
        return  this.getEnvironment();
    }

}
