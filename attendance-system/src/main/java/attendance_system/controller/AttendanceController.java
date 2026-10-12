package attendance_system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import attendance_system.entity.Attendance;
import attendance_system.service.AttendanceService;

@RestController
@CrossOrigin(origins = {
    "http://:5173",
    "https://student-attendance-and-performance-management-system-d3cqpsbbn.vercel.app"
})
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    // Get all attendance
    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    // Get attendance by attendance ID
    @GetMapping("/{id}")
    public Attendance getAttendanceById(@PathVariable int id) {
        return attendanceService.getAttendanceById(id);
    }

    // Get attendance records by student ID
    @GetMapping("/student/{studentId}")
    public List<Attendance> getAttendanceByStudentId(
            @PathVariable Integer studentId) {

        return attendanceService.getAttendanceByStudentId(studentId);
    }

    // Get attendance percentage by student ID
    @GetMapping("/student/{studentId}/percentage")
    public double getAttendancePercentage(
            @PathVariable Integer studentId) {

        return attendanceService.getAttendancePercentage(studentId);
    }

    // Add attendance
    @PostMapping
    public Attendance addAttendance(@RequestBody Attendance attendance) {
        return attendanceService.saveAttendance(attendance);
    }

    // Update attendance
    @PutMapping("/{id}")
    public Attendance updateAttendance(
            @PathVariable int id,
            @RequestBody Attendance attendance) {

        Attendance existingAttendance =
                attendanceService.getAttendanceById(id);

        existingAttendance.setStudentId(attendance.getStudentId());
        existingAttendance.setDate(attendance.getDate());
        existingAttendance.setStatus(attendance.getStatus());

        return attendanceService.saveAttendance(existingAttendance);
    }

    // Delete attendance
    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable int id) {
        attendanceService.deleteAttendance(id);
    }
}