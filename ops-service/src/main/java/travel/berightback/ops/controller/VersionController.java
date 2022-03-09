package travel.berightback.ops.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/version")
@CrossOrigin
public class VersionController {

    @GetMapping("/")
    public ResponseEntity<String> version() {
        return ResponseEntity.ok("0.0.1");
    }
}
