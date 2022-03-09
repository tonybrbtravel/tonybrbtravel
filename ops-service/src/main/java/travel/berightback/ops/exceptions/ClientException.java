package travel.berightback.ops.exceptions;

import org.springframework.http.HttpStatus;

public class ClientException extends RuntimeException {

    private HttpStatus httpStatus;

    public ClientException(String message, int status) {
        super(message);
        this.httpStatus = HttpStatus.valueOf(status);
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
