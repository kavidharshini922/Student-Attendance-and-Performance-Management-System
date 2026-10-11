
package attendance_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import attendance_system.entity.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    // Get all attendance records of a particular student
    List<Attendance> findByStudentId(Integer studentId);

    // Count total attendance records of a student
    long countByStudentId(Integer studentId);

    // Count present records of a student
    long countByStudentIdAndStatusIgnoreCase(
            Integer studentId, String status);
}
