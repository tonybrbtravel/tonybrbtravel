package travel.berightback.ops.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import retrofit2.Call;
import travel.berightback.ops.dto.PageResponseDto;
import travel.berightback.ops.service.CustomerService;

@Controller
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping("/customers")
    public ResponseEntity<PageResponseDto> findAll(@RequestParam(required = false) String searchKey,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size,
                                                   @RequestParam(defaultValue = "email") String sortBy,
                                                   @RequestParam(defaultValue = "ASC") String order) throws IOException {
        return ResponseEntity.ok(customerService.findAll(searchKey, page, size, sortBy, order));
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity findById(@PathVariable long id) throws IOException {
        return ResponseEntity.ok(customerService.findById(id));
    }

    @PostMapping("/customers/{id}")
    public ResponseEntity<String> save(@PathVariable long id, @RequestBody Object userDetails) throws IOException {
        return ResponseEntity.ok(customerService.save(id, userDetails));
    }
    
    @GetMapping("/customers/ids")
    public ResponseEntity<List<Long>> getAllIds(@RequestParam(required=false) String searchIds) throws IOException{
    	return ResponseEntity.ok(customerService.getUserIds(searchIds));
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) throws IOException {
        return ResponseEntity.ok(customerService.delete(id));
    }

}
