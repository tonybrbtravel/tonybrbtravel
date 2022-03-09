package travel.berightback.ops.advice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import travel.berightback.ops.exceptions.ClientException;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@ControllerAdvice
public class CommonControllerAdvice {

    @ExceptionHandler({ClientException.class})
    ResponseEntity handleApplicationException(HttpServletRequest request, ClientException clientException) {
        HttpStatus httpStatus = clientException.getHttpStatus() != null ? clientException.getHttpStatus(): HttpStatus.INTERNAL_SERVER_ERROR;
        return handleError(request, httpStatus, clientException);
    }

    @ExceptionHandler({Exception.class})
    ResponseEntity handleException(HttpServletRequest request, Exception exception) {
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        return handleError(request, httpStatus, exception);
    }

    ResponseEntity handleError(HttpServletRequest request, HttpStatus httpStatus, Exception exception) {
        log.error("Request " + request.getRequestURL() + " failed with exception ", exception);
        return ResponseEntity.status(httpStatus).body(exception.getMessage());
    }

}
