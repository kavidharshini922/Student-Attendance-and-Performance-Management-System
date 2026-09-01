package attendance_system.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import attendance_system.entity.User;
import attendance_system.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;


    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {


        // Find user by email
        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);


        // User not found
        if (user == null) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            new LoginResponse(
                                    false,
                                    "User not found",
                                    null,
                                    null,
                                    null
                            )
                    );
        }


        // Check password
        if (!user.getPassword().equals(request.getPassword())) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            new LoginResponse(
                                    false,
                                    "Invalid password",
                                    null,
                                    null,
                                    null
                            )
                    );
        }


        // Login successful
        return ResponseEntity.ok(

                new LoginResponse(
                        true,
                        "Login successful",
                        user.getName(),
                        user.getRole(),
                        user.getStudentId()
                )

        );
    }
}