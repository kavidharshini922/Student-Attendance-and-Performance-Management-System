package attendance_system.controller;

public class LoginResponse {

    private boolean success;
    private String message;
    private String name;
    private String role;
    private Long studentId;


    // Default constructor
    public LoginResponse() {
    }


    // Constructor
    public LoginResponse(
            boolean success,
            String message,
            String name,
            String role,
            Long studentId) {

        this.success = success;
        this.message = message;
        this.name = name;
        this.role = role;
        this.studentId = studentId;
    }


    // Get Success
    public boolean isSuccess() {
        return success;
    }


    // Get Message
    public String getMessage() {
        return message;
    }


    // Get Name
    public String getName() {
        return name;
    }


    // Get Role
    public String getRole() {
        return role;
    }


    // Get Student ID
    public Long getStudentId() {
        return studentId;
    }
}