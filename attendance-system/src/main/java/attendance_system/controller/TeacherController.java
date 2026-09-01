
package attendance_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import attendance_system.entity.Teacher;
import attendance_system.repository.TeacherRepository;

@RestController
@RequestMapping("/teachers")
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;


    // =========================
    // Get all teachers
    // =========================

    @GetMapping
    public List<Teacher> getAllTeachers() {

        return teacherRepository.findAll();

    }


    // =========================
    // Get teacher by ID
    // =========================

    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable int id) {

        return teacherRepository.findById(id)
                .orElse(null);

    }


    // =========================
    // Add new teacher
    // =========================

    @PostMapping
    public Teacher addTeacher(@RequestBody Teacher teacher) {

        return teacherRepository.save(teacher);

    }


    // =========================
    // Update teacher
    // =========================

    @PutMapping("/{id}")
    public Teacher updateTeacher(
            @PathVariable int id,
            @RequestBody Teacher teacher) {

        Teacher existingTeacher =
                teacherRepository.findById(id)
                        .orElse(null);

        if (existingTeacher == null) {
            return null;
        }

        existingTeacher.setName(teacher.getName());
        existingTeacher.setEmail(teacher.getEmail());
        existingTeacher.setPhone(teacher.getPhone());
        existingTeacher.setSubject(teacher.getSubject());

        return teacherRepository.save(existingTeacher);
    }


    // =========================
    // Delete teacher
    // =========================

    @DeleteMapping("/{id}")
    public String deleteTeacher(@PathVariable int id) {

        if (!teacherRepository.existsById(id)) {

            return "Teacher not found";

        }

        teacherRepository.deleteById(id);

        return "Teacher deleted successfully";

    }
}

