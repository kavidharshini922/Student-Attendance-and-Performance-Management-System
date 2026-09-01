package attendance_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import attendance_system.entity.Performance;
import attendance_system.repository.PerformanceRepository;

@Service
public class PerformanceService {

    private final PerformanceRepository performanceRepository;


    public PerformanceService(
            PerformanceRepository performanceRepository) {

        this.performanceRepository = performanceRepository;
    }


    // =========================
    // Get all performance
    // =========================

    public List<Performance> getAllPerformance() {

        return performanceRepository.findAll();
    }


    // =========================
    // Get performance by ID
    // =========================

    public Performance getPerformanceById(int id) {

        return performanceRepository
                .findById(id)
                .orElse(null);
    }


    // =========================
    // Get performance by Student ID
    // =========================

    public List<Performance> getPerformanceByStudentId(
            int studentId) {

        return performanceRepository
                .findByStudentId(studentId);
    }


    // =========================
    // Save performance
    // =========================

    public Performance savePerformance(
            Performance performance) {

        return performanceRepository
                .save(performance);
    }


    // =========================
    // Delete performance
    // =========================

    public void deletePerformance(int id) {

        performanceRepository.deleteById(id);
    }
}