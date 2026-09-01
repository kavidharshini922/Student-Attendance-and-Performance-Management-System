package attendance_system.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String role;

    // Used to connect a STUDENT login with a student record
    private Long studentId;


    // Default constructor
    public User() {
    }


    // Constructor
    public User(
            String name,
            String email,
            String password,
            String role) {

        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }


    // Get ID
    public Long getId() {
        return id;
    }


    // Set ID
    public void setId(Long id) {
        this.id = id;
    }


    // Get Name
    public String getName() {
        return name;
    }


    // Set Name
    public void setName(String name) {
        this.name = name;
    }


    // Get Email
    public String getEmail() {
        return email;
    }


    // Set Email
    public void setEmail(String email) {
        this.email = email;
    }


    // Get Password
    public String getPassword() {
        return password;
    }


    // Set Password
    public void setPassword(String password) {
        this.password = password;
    }


    // Get Role
    public String getRole() {
        return role;
    }


    // Set Role
    public void setRole(String role) {
        this.role = role;
    }


    // Get Student ID
    public Long getStudentId() {
        return studentId;
    }


    // Set Student ID
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
}