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

import attendance_system.entity.Performance;
import attendance_system.service.PerformanceService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/performance")
public class PerformanceController {

    private final PerformanceService performanceService;


    public PerformanceController(
            PerformanceService performanceService) {

        this.performanceService = performanceService;
    }


    // =========================
    // Get all performance
    // =========================

    @GetMapping
    public List<Performance> getAllPerformance() {

        return performanceService.getAllPerformance();
    }


    // =========================
    // Get performance by ID
    // =========================

    @GetMapping("/{id}")
    public Performance getPerformanceById(
            @PathVariable int id) {

        return performanceService.getPerformanceById(id);
    }


    // =========================
    // Get performance by Student ID
    // =========================

    @GetMapping("/student/{studentId}")
    public List<Performance> getPerformanceByStudentId(
            @PathVariable int studentId) {

        return performanceService
                .getPerformanceByStudentId(studentId);
    }


    // =========================
    // Add performance
    // =========================

    @PostMapping
    public Performance addPerformance(
            @RequestBody Performance performance) {

        return performanceService
                .savePerformance(performance);
    }


    // =========================
    // Update performance
    // =========================

    @PutMapping("/{id}")
    public Performance updatePerformance(
            @PathVariable int id,
            @RequestBody Performance performance) {

        Performance existingPerformance =
                performanceService
                        .getPerformanceById(id);

        existingPerformance.setStudentId(
                performance.getStudentId()
        );

        existingPerformance.setSubjectId(
                performance.getSubjectId()
        );

        existingPerformance.setExam(
                performance.getExam()
        );

        existingPerformance.setMarks(
                performance.getMarks()
        );

        return performanceService
                .savePerformance(existingPerformance);
    }


    // =========================
    // Delete performance
    // =========================

    @DeleteMapping("/{id}")
    public void deletePerformance(
            @PathVariable int id) {

        performanceService
                .deletePerformance(id);
    }
}