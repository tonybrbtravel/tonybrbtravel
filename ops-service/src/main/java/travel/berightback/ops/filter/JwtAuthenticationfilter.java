package travel.berightback.ops.filter;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;

import travel.berightback.ops.util.UserPrincipal;

@Component
public class JwtAuthenticationfilter extends OncePerRequestFilter {

	String cognitoEndpoint;

	@Autowired
	public JwtAuthenticationfilter(@Value("${cognito.endpoint}") final String cognitoEndpoint) {
		this.cognitoEndpoint = cognitoEndpoint;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			FilterChain filterChain) throws IOException, ServletException {
		String authorizationHeader = httpServletRequest.getHeader("Authorization");

		if (authorizationHeaderIsInvalid(authorizationHeader)) {
			filterChain.doFilter(httpServletRequest, httpServletResponse);
			return;
		}

		UsernamePasswordAuthenticationToken token = null;
		try {
			token = verifyToken(authorizationHeader);
			if (token != null) {
				SecurityContextHolder.getContext().setAuthentication(token);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		filterChain.doFilter(httpServletRequest, httpServletResponse);

	}

	private boolean authorizationHeaderIsInvalid(String authorizationHeader) {
		return authorizationHeader == null || !authorizationHeader.startsWith("Bearer ");
	}

	private UsernamePasswordAuthenticationToken verifyToken(String authorizationHeader) throws MalformedURLException {
		String token = authorizationHeader.replace("Bearer ", "");
		ConfigurableJWTProcessor jwtProcessor = new DefaultJWTProcessor();

		JWKSource keySource = new RemoteJWKSet<>(new URL(cognitoEndpoint));

		JWSAlgorithm expectedJWSAlg = JWSAlgorithm.RS256;
		JWSKeySelector keySelector = new JWSVerificationKeySelector<>(expectedJWSAlg, keySource);

		jwtProcessor.setJWSKeySelector(keySelector);

		try {
			JWTClaimsSet claimsSet = jwtProcessor.process(token, null);
			Map<String, Object> jsonArray = claimsSet.toJSONObject();
			List<GrantedAuthority> authorities = new ArrayList<>();
			authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
			UserPrincipal principal = new UserPrincipal(1, jsonArray.get("email").toString(), false);
			UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(principal, null,
					authorities);
			return user;

		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		} catch (JOSEException e) {
			e.printStackTrace();
			return null;
		} catch (BadJOSEException e) {
			e.printStackTrace();
			return null;
		}
	}
}
