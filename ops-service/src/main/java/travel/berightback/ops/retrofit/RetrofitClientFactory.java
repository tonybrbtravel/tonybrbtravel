package travel.berightback.ops.retrofit;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;
import travel.berightback.ops.config.ServiceURIConfig;
import travel.berightback.ops.filter.TokenInterceptor;

@Component
public class RetrofitClientFactory {

    private static final int FIVE_MINUTES = 5;

    @Autowired
    private ServiceURIConfig serviceURIConfig;

    @Bean
    UserProfileServiceClient getUserProfileServiceClient() {
        return getStandardGsonClient(serviceURIConfig.getUserProfileServiceBaseUrl(), UserProfileServiceClient.class);
    }
    
    @Bean
    TripServiceClient getTripServiceClient() {
    	return getStandardGsonClient(serviceURIConfig.getTripServiceBaseUrl(), TripServiceClient.class);
    }
    

    public static <T> T getStandardGsonClient(String baseUrl, Class<T> retrofitClientClass) {
        return new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(JacksonConverterFactory.create())
                .client(
                        new OkHttpClient.Builder()
                                .addInterceptor(new TokenInterceptor())
                                .connectTimeout(FIVE_MINUTES, TimeUnit.MINUTES)
                                .writeTimeout(FIVE_MINUTES, TimeUnit.MINUTES)
                                .readTimeout(FIVE_MINUTES, TimeUnit.MINUTES)
                                .build()
                )
                .build()
                .create(retrofitClientClass);
    }
    
    

}
