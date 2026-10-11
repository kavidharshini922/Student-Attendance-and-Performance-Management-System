
package attendance_system.ai;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import attendance_system.entity.Performance;
import attendance_system.repository.AttendanceRepository;
import attendance_system.repository.PerformanceRepository;

@Service
public class AiAssistantService {

    private final AttendanceRepository attendanceRepository;
    private final PerformanceRepository performanceRepository;

    public AiAssistantService(
            AttendanceRepository attendanceRepository,
            PerformanceRepository performanceRepository) {

        this.attendanceRepository = attendanceRepository;
        this.performanceRepository = performanceRepository;
    }

    public String getAIResponse(String question) {

        if (question == null || question.isBlank()) {
            return "Please enter a question.";
        }

        String q = question.toLowerCase().trim();
        Integer studentId = extractStudentId(q);

        // Greeting
        if (q.contains("hello") || q.equals("hi")) {
            return "Hello! Welcome to the Student Attendance and Performance Management System. How can I help you?";
        }

        // Student summary
        if (q.contains("summary") || q.contains("overall")) {

            if (studentId == null) {
                return "Please mention a student ID. Example: Give me a summary of student 1.";
            }

            return getStudentSummary(studentId);
        }

        // Attendance improvement suggestions
        if (q.contains("improve") && q.contains("attendance")) {

            if (studentId == null) {
                return "Please mention a student ID.";
            }

            return getAttendanceSuggestions(studentId);
        }

        // Academic improvement suggestions
        if (q.contains("improve") &&
                (q.contains("academic") || q.contains("performance") || q.contains("marks"))) {

            if (studentId == null) {
                return "Please mention a student ID.";
            }

            return getAcademicSuggestions(studentId);
        }

        // Attendance report
        if (q.contains("attendance")) {

            if (studentId == null) {
                return "Please mention a student ID.";
            }

            return getAttendanceReport(studentId);
        }

        // Academic performance report
        if (q.contains("performance") || q.contains("marks")
                || q.contains("average") || q.contains("highest")
                || q.contains("lowest")) {

            if (studentId == null) {
                return "Please mention a student ID.";
            }

            return getPerformanceReport(studentId);
        }

        // General study suggestions
        if (q.contains("improve") || q.contains("study")) {
            return "To improve academic performance:\n"
                    + "1. Follow a daily study schedule.\n"
                    + "2. Revise lessons regularly.\n"
                    + "3. Practise problems every day.\n"
                    + "4. Focus on subjects with lower marks.\n"
                    + "5. Ask teachers for guidance.";
        }

        // Reports
        if (q.contains("report")) {
            return "You can ask me for attendance and academic performance reports by mentioning a student ID.";
        }

        return "I'm your Student Management Assistant. Ask me about attendance, marks, academic performance, student summaries and study suggestions.";
    }

    // Attendance report
    private String getAttendanceReport(Integer studentId) {

        long total = attendanceRepository.countByStudentId(studentId);
        long present = attendanceRepository.countByStudentIdAndStatusIgnoreCase(studentId, "PRESENT");
        long absent = attendanceRepository.countByStudentIdAndStatusIgnoreCase(studentId, "ABSENT");

        if (total == 0) {
            return "No attendance records found for Student ID " + studentId + ".";
        }

        double percentage = (present * 100.0) / total;

        return String.format(
                "Attendance Report for Student ID %d:\nTotal Classes: %d\nPresent: %d\nAbsent: %d\nAttendance Percentage: %.2f%%",
                studentId, total, present, absent, percentage);
    }

    // Attendance suggestions based on actual percentage
    private String getAttendanceSuggestions(Integer studentId) {

        long total = attendanceRepository.countByStudentId(studentId);
        long present = attendanceRepository.countByStudentIdAndStatusIgnoreCase(studentId, "PRESENT");

        if (total == 0) {
            return "No attendance records found for Student ID " + studentId + ".";
        }

        double percentage = (present * 100.0) / total;

        if (percentage >= 90) {
            return String.format(
                    "Student %d has excellent attendance at %.2f%%. Keep attending classes regularly and maintain this consistency.",
                    studentId, percentage);
        }

        if (percentage >= 75) {
            return String.format(
                    "Student %d has %.2f%% attendance. To improve:\n"
                    + "1. Attend every upcoming class.\n"
                    + "2. Avoid unnecessary absences.\n"
                    + "3. Maintain a regular attendance routine.\n"
                    + "4. Monitor attendance every week.",
                    studentId, percentage);
        }

        return String.format(
                "Student %d currently has %.2f%% attendance, which needs improvement.\n"
                + "Suggestions:\n"
                + "1. Attend all upcoming classes without missing them.\n"
                + "2. Avoid unnecessary leave.\n"
                + "3. Follow a consistent daily schedule.\n"
                + "4. Discuss attendance concerns with the class teacher.\n"
                + "5. Check attendance regularly to track improvement.",
                studentId, percentage);
    }

    // Academic performance report
    private String getPerformanceReport(Integer studentId) {

        List<Performance> records = performanceRepository.findByStudentId(studentId);

        if (records.isEmpty()) {
            return "No performance records found for Student ID " + studentId + ".";
        }

        int totalMarks = 0;
        int highest = Integer.MIN_VALUE;
        int lowest = Integer.MAX_VALUE;

        for (Performance record : records) {

            int marks = record.getMarks();

            totalMarks += marks;
            highest = Math.max(highest, marks);
            lowest = Math.min(lowest, marks);
        }

        double average = (double) totalMarks / records.size();

        return String.format(
                "Academic Performance Report for Student ID %d:\n"
                + "Total Records: %d\n"
                + "Average Marks: %.2f\n"
                + "Highest Marks: %d\n"
                + "Lowest Marks: %d",
                studentId, records.size(), average, highest, lowest);
    }

    // Academic suggestions based on actual marks
    private String getAcademicSuggestions(Integer studentId) {

        List<Performance> records = performanceRepository.findByStudentId(studentId);

        if (records.isEmpty()) {
            return "No performance records found for Student ID " + studentId + ".";
        }

        int totalMarks = 0;
        int lowest = Integer.MAX_VALUE;
        int highest = Integer.MIN_VALUE;

        for (Performance record : records) {

            int marks = record.getMarks();

            totalMarks += marks;
            lowest = Math.min(lowest, marks);
            highest = Math.max(highest, marks);
        }

        double average = (double) totalMarks / records.size();

        return String.format(
                "Academic Improvement Suggestions for Student %d:\n"
                + "Average Marks: %.2f\n"
                + "Highest Marks: %d\n"
                + "Lowest Marks: %d\n\n"
                + "Suggestions:\n"
                + "1. Maintain your current study performance.\n"
                + "2. Give additional attention to assessments with lower marks.\n"
                + "3. Practise questions regularly.\n"
                + "4. Revise important topics before examinations.\n"
                + "5. Ask teachers for feedback and guidance.",
                studentId, average, highest, lowest);
    }

    // Combined student summary
    private String getStudentSummary(Integer studentId) {

        long total = attendanceRepository.countByStudentId(studentId);
        long present = attendanceRepository.countByStudentIdAndStatusIgnoreCase(studentId, "PRESENT");
        long absent = attendanceRepository.countByStudentIdAndStatusIgnoreCase(studentId, "ABSENT");

        List<Performance> records = performanceRepository.findByStudentId(studentId);

        if (total == 0 && records.isEmpty()) {
            return "No attendance or academic records found for Student ID " + studentId + ".";
        }

        StringBuilder summary = new StringBuilder();
        summary.append("Overall Student Summary - Student ID ").append(studentId).append("\n\n");

        if (total > 0) {
            double percentage = (present * 100.0) / total;

            summary.append("ATTENDANCE\n");
            summary.append("Total Classes: ").append(total).append("\n");
            summary.append("Present: ").append(present).append("\n");
            summary.append("Absent: ").append(absent).append("\n");
            summary.append(String.format("Attendance: %.2f%%\n\n", percentage));
        } else {
            summary.append("No attendance records available.\n\n");
        }

        if (!records.isEmpty()) {

            int totalMarks = 0;
            int highest = Integer.MIN_VALUE;
            int lowest = Integer.MAX_VALUE;

            for (Performance record : records) {

                int marks = record.getMarks();

                totalMarks += marks;
                highest = Math.max(highest, marks);
                lowest = Math.min(lowest, marks);
            }

            double average = (double) totalMarks / records.size();

            summary.append("ACADEMIC PERFORMANCE\n");
            summary.append("Total Records: ").append(records.size()).append("\n");
            summary.append(String.format("Average Marks: %.2f\n", average));
            summary.append("Highest Marks: ").append(highest).append("\n");
            summary.append("Lowest Marks: ").append(lowest);
        } else {
            summary.append("No academic performance records available.");
        }

        return summary.toString();
    }

    // Extract student ID from the question
    private Integer extractStudentId(String question) {

        Pattern pattern = Pattern.compile(
                "student\\s*(?:id)?\\s*(\\d+)"
        );

        Matcher matcher = pattern.matcher(question);

        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }

        return null;
    }
}
