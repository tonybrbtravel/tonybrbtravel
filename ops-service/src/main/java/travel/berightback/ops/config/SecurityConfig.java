package travel.berightback.ops.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;

import travel.berightback.ops.filter.JwtAuthenticationfilter;

import java.util.List;


  @EnableWebSecurity
  @EnableGlobalMethodSecurity(prePostEnabled = true)
  @Component 
  public class SecurityConfig extends WebSecurityConfigurerAdapter {

	    private JwtAuthenticationfilter jwtFilter;

	    @Autowired
	    public SecurityConfig(@Autowired JwtAuthenticationfilter jwtFilter) {
	        this.jwtFilter = jwtFilter;
	    }

	    @Override
	    protected void configure(HttpSecurity http) throws Exception {
	        http
	                .csrf().disable()
	                .cors()
	                .configurationSource(request -> {
	                    var cors = new CorsConfiguration();
	                    cors.setAllowedOrigins(List.of("*"));
	                    cors.setAllowedMethods(List.of("GET","POST", "PUT", "DELETE", "OPTIONS"));
	                    cors.setAllowedHeaders(List.of("*"));
	                    return cors;
	                })
	                .and()
	                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	                .and()
	                .authorizeRequests()
	                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
	                .antMatchers("/user/profile/email/**").permitAll()
	                .antMatchers("/v3/api-docs/**").permitAll()
	                .antMatchers("/swagger-ui/**").permitAll()
	                .antMatchers("/swagger-resources/**").permitAll()
	                .antMatchers("/version/**").permitAll()
					.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	                .anyRequest().authenticated()
	                .and()
	                .addFilterBefore(jwtFilter,
	                        UsernamePasswordAuthenticationFilter.class);
	    }

	    
	}
 