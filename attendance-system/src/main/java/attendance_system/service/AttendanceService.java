package attendance_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import attendance_system.entity.Attendance;
import attendance_system.repository.AttendanceRepository;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    // Get all attendance
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // Get attendance by attendance ID
    public Attendance getAttendanceById(int id) {
        return attendanceRepository.findById(id).orElse(null);
    }

    // Add attendance
    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    // Delete attendance
    public void deleteAttendance(int id) {
        attendanceRepository.deleteById(id);
    }

    // Get attendance records for a particular student
    public List<Attendance> getAttendanceByStudentId(Integer studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    // Calculate attendance percentage
    public double getAttendancePercentage(Integer studentId) {

        List<Attendance> attendanceList =
                attendanceRepository.findByStudentId(studentId);

        if (attendanceList.isEmpty()) {
            return 0.0;
        }

        long presentCount = attendanceList.stream()
                .filter(a -> "PRESENT".equalsIgnoreCase(a.getStatus()))
                .count();

        return (presentCount * 100.0) / attendanceList.size();
    }
}