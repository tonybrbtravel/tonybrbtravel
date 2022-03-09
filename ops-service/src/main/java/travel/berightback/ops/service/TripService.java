package travel.berightback.ops.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retrofit2.Response;
import travel.berightback.ops.dto.TripResponseDto;
import travel.berightback.ops.exceptions.ClientException;
import travel.berightback.ops.retrofit.TripServiceClient;

@Service
public class TripService {

	@Autowired
	TripServiceClient tripServiceClient;

	public String deleteTripsByUser(int userId) throws IOException {
		Response<TripResponseDto> response = tripServiceClient.deleteTripsByUser(userId).execute();
		if (response.isSuccessful())
			return response.body().getMessage();
		else
			throw new ClientException(response.errorBody().string(), response.code());
	}
}
