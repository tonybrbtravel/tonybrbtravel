package travel.berightback.ops.util;

import org.springframework.http.HttpStatus;

public class ServiceResponse {

    private int code;
    private Object obj;
    private HttpStatus status;

    public ServiceResponse(int code, Object obj) {
        this.code =code;
        this.obj = obj;
    }

    public ServiceResponse(HttpStatus status, Object obj) {
        this.status =status;
        this.obj = obj;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
