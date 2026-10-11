
package attendance_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import attendance_system.entity.Performance;

@Repository
public interface PerformanceRepository
        extends JpaRepository<Performance, Integer> {

    // Retrieve all performance records of a student
    List<Performance> findByStudentId(Integer studentId);

}
