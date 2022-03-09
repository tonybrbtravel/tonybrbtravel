package travel.berightback.ops.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retrofit2.Call;
import retrofit2.Response;
import travel.berightback.ops.dto.PageResponseDto;
import travel.berightback.ops.dto.ResponseDto;
import travel.berightback.ops.exceptions.ClientException;
import travel.berightback.ops.retrofit.UserProfileServiceClient;

@Service
public class CustomerService {

    @Autowired
    UserProfileServiceClient userProfileServiceClient;
    
    @Autowired
    TripService tripService;

    public PageResponseDto findAll(String searchKey, int page, int size, String sortBy, String order) throws IOException {
        Response<PageResponseDto> response = userProfileServiceClient.findAll(searchKey, page, size, sortBy, order).execute();
        if (response.isSuccessful()) {
            return response.body();
        } else {
            throw new ClientException(response.message(), response.code());
        }
    }

    public Object findById(long id) throws IOException {
        Response<Object> response = userProfileServiceClient.findById(id).execute();
        if (response.isSuccessful()) {
            return response.body();
        } else {
            throw new ClientException(response.errorBody().string(), response.code());
        }
    }

    public String save(long id, Object userDetails) throws IOException {
        Response<ResponseDto> response =  userProfileServiceClient.save(id, userDetails).execute();
        if (response.isSuccessful()) {
            return response.body().getMessage();
        } else {
            throw new ClientException(response.message(), response.code());
        }
    }


	public List<Long> getUserIds(String searchIds) throws IOException {
        Response<List<Long>> response = userProfileServiceClient.getAllIds(searchIds).execute();
        if (response.isSuccessful()) {
            return response.body();
        } else {
            throw new ClientException(response.message(), response.code());
        }
	}

    public String delete(long id) throws IOException {
        Response<ResponseDto> response =  userProfileServiceClient.delete(id).execute();
        if (response.isSuccessful()) {
        	tripService.deleteTripsByUser(Long.valueOf(id).intValue());
            return response.body().getMessage();
        } else {
            throw new ClientException(response.errorBody().string(), response.code());
        }
    }

}
