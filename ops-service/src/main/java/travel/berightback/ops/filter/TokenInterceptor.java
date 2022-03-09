package travel.berightback.ops.filter;

import okhttp3.Interceptor;
import okhttp3.Response;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;

public class TokenInterceptor implements Interceptor {

    private static final String AUTHORIZATION_HEADER = "Authorization";

    private String getBearerToken() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getHeader(AUTHORIZATION_HEADER);
    }

    @Override
    public Response intercept(Chain chain) throws IOException {
        return chain.proceed(chain.request().newBuilder().addHeader(AUTHORIZATION_HEADER, getBearerToken()).build());
    }

}
