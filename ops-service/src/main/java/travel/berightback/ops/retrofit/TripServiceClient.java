package travel.berightback.ops.retrofit;

import org.springframework.stereotype.Service;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import travel.berightback.ops.dto.TripResponseDto;

@Service
public interface TripServiceClient {

	@GET("/trip/setStatus/{userId}")
	Call<TripResponseDto> deleteTripsByUser(@Path("userId") int userId);
}
