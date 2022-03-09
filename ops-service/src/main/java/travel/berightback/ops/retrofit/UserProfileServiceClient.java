package travel.berightback.ops.retrofit;

import java.util.List;

import org.springframework.stereotype.Service;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;
import travel.berightback.ops.dto.PageResponseDto;
import travel.berightback.ops.dto.ResponseDto;

@Service
public interface UserProfileServiceClient {

    @GET("/customers")
    Call<PageResponseDto> findAll(@Query(value = "searchKey", encoded = true) String searchKey,
                                  @Query("page") int page,
                                  @Query("size") int size,
                                  @Query("sortBy") String sortBy,
                                  @Query("order") String order);

    @GET("/customers/{id}")
    Call<Object> findById(@Path("id") long id);

    @POST("/customers/{id}")
    Call<ResponseDto> save(@Path("id") long id, @Body Object userDetails);
    
    @GET("/customers/ids")
    Call<List<Long>> getAllIds(@Query(value="searchIds") String searchIds);

    @DELETE("/customers/{id}")
    Call<ResponseDto> delete(@Path("id") long id);
}
