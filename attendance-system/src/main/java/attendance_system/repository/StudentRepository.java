package attendance_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import attendance_system.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

}