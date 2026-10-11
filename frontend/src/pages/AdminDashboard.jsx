import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AIAssistant from "../components/AIAssistant";
import "./AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    // Logged-in Admin
    const name =
        localStorage.getItem("userName") || "Administrator";

    // State
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [performance, setPerformance] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const [serviceStatus, setServiceStatus] = useState({
        students: false,
        teachers: false,
        attendance: false,
        performance: false
    });

    // Current Date
    const today = new Date();

    const formattedDate =
        today.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    // Logout
    const logout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        localStorage.removeItem("studentId");

        navigate("/admin-login");
    };

    // Load Dashboard Data
    const loadDashboardData = async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const status = {
                students: false,
                teachers: false,
                attendance: false,
                performance: false
            };

            // STUDENTS
            try {

                const response = await fetch(
                    "https://student-attendance-and-performance.onrender.com/students"
                );

                if (response.ok) {
                    const data = await response.json();

                    setStudents(
                        Array.isArray(data) ? data : []
                    );

                    status.students = true;
                }

            } catch (err) {
                console.error("Students API Error:", err);
            }

            // TEACHERS
            try {

                const response = await fetch(
                    "https://student-attendance-and-performance.onrender.com/teachers"
                );

                if (response.ok) {
                    const data = await response.json();

                    console.log("Teachers API Response:", data);

                    setTeachers(
                        Array.isArray(data) ? data : []
                    );

                    status.teachers = true;
                }

            } catch (err) {
                console.error("Teachers API Error:", err);
            }

            // ATTENDANCE
            try {

                const response = await fetch(
                    "https://student-attendance-and-performance.onrender.com/attendance"
                );

                if (response.ok) {
                    const data = await response.json();

                    setAttendance(
                        Array.isArray(data) ? data : []
                    );

                    status.attendance = true;
                }

            } catch (err) {
                console.error("Attendance API Error:", err);
            }

            // PERFORMANCE
            try {

                const response = await fetch(
                    "https://student-attendance-and-performance.onrender.com/performance"
                );

                if (response.ok) {
                    const data = await response.json();

                    setPerformance(
                        Array.isArray(data) ? data : []
                    );

                    status.performance = true;
                }

            } catch (err) {
                console.error("Performance API Error:", err);
            }

            // Update Service Status
            setServiceStatus(status);

            // Backend Connection Warning
            if (
                !status.students &&
                !status.teachers &&
                !status.attendance &&
                !status.performance
            ) {
                setError(
                    "Unable to connect to the backend server. Please make sure Spring Boot is running on port 8080."
                );
            }

        } catch (err) {

            console.error("Admin Dashboard Error:", err);

            setError(
                "Unable to load dashboard information."
            );

        } finally {

            setLoading(false);
            setRefreshing(false);
        }
    };

    // Initial Load
    useEffect(() => {
        loadDashboardData();
    }, []);

    // Loading Screen
    if (loading) {

        return (
            <div className="admin-loading">

                <div className="loading-spinner"></div>

                <h2>
                    Loading Admin Dashboard
                </h2>

                <p>
                    Preparing your management overview...
                </p>

            </div>
        );
    }

    // Dashboard
    return (

        <div className="admin-layout">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                {/* LOGO */}

                <div className="sidebar-logo">

                    <div className="logo-icon">
                        🎓
                    </div>

                    <div>
                        <h2>EduManage</h2>
                        <span>Management System</span>
                    </div>

                </div>

                {/* NAVIGATION */}

                <nav className="sidebar-navigation">

                    <p className="navigation-title">
                        MAIN MENU
                    </p>

                    <button
                        className="sidebar-link active"
                        onClick={() => navigate("/admin")}
                    >
                        <span>🏠</span>
                        Dashboard
                    </button>

                    <button
                        className="sidebar-link"
                        onClick={() => navigate("/students")}
                    >
                        <span>🎓</span>
                        Students
                    </button>

                    <button
                        className="sidebar-link"
                        onClick={() => navigate("/teachers")}
                    >
                        <span>👨‍🏫</span>
                        Teachers
                    </button>

                    <button
                        className="sidebar-link"
                        onClick={() => navigate("/attendance")}
                    >
                        <span>📋</span>
                        Attendance
                    </button>

                    <button
                        className="sidebar-link"
                        onClick={() => navigate("/performance")}
                    >
                        <span>📊</span>
                        Performance
                    </button>

                    <button
                        className="sidebar-link"
                        onClick={() => navigate("/reports/attendance")}
                    >
                        <span>📈</span>
                        Reports & Analytics
                    </button>

                    <p className="navigation-title second-title">
                        SYSTEM
                    </p>

                    <button
                        className="sidebar-link"
                        onClick={() => loadDashboardData(true)}
                        disabled={refreshing}
                    >
                        <span>🔄</span>
                        {refreshing ? "Refreshing..." : "Refresh Data"}
                    </button>

                </nav>

                {/* SIDEBAR BOTTOM */}

                <div className="sidebar-bottom">

                    <div className="sidebar-admin">

                        <div className="admin-avatar">
                            {name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>{name}</strong>
                            <span>Administrator</span>
                        </div>

                    </div>

                    <button
                        className="sidebar-logout"
                        onClick={logout}
                    >
                        <span>🚪</span>
                        Logout
                    </button>

                </div>

            </aside>

            {/* MAIN CONTENT */}

            <main className="admin-main">

                {/* TOP BAR */}

                <header className="admin-topbar">

                    <div>
                        <p className="topbar-date">
                            {formattedDate}
                        </p>
                    </div>

                    <div className="topbar-right">

                        <button
                            className="notification"
                            onClick={() => loadDashboardData(true)}
                            title="Refresh dashboard"
                        >
                            🔔
                        </button>

                        <div className="topbar-profile">

                            <div className="topbar-avatar">
                                {name.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <strong>{name}</strong>
                                <span>Admin</span>
                            </div>

                        </div>

                    </div>

                </header>

                {/* PAGE CONTENT */}

                <div className="admin-content">

                    {/* ERROR MESSAGE */}

                    {error && (

                        <div className="dashboard-warning">

                            <span>⚠️</span>

                            <div>
                                <strong>
                                    Backend Connection Warning
                                </strong>

                                <p>{error}</p>
                            </div>

                            <button
                                onClick={() => loadDashboardData(true)}
                            >
                                Retry
                            </button>

                        </div>

                    )}

                    {/* WELCOME SECTION */}

                    <section className="admin-welcome">

                        <div>

                            <span className="welcome-badge">
                                ADMINISTRATOR
                            </span>

                            <h1>
                                Welcome back, {name} 👋
                            </h1>

                            <p>
                                Here's your complete overview of
                                the Student Attendance & Performance
                                Management System.
                            </p>

                        </div>

                        <div className="welcome-decoration">

                            <div className="decoration-circle">
                                🎓
                            </div>

                        </div>

                    </section>

                    {/* STATISTICS */}

                    <section className="statistics-section">

                        <div className="section-title">

                            <div>
                                <h2>System Overview</h2>
                                <p>Current academic records</p>
                            </div>

                            <button
                                className="refresh-button"
                                onClick={() => loadDashboardData(true)}
                                disabled={refreshing}
                            >
                                {refreshing ? "Refreshing..." : "↻ Refresh"}
                            </button>

                        </div>

                        <div className="statistics-grid">

                            {/* STUDENTS */}

                            <div
                                className="stat-card"
                                onClick={() => navigate("/students")}
                            >

                                <div className="stat-card-top">

                                    <div className="stat-icon student-icon">
                                        🎓
                                    </div>

                                    <span className="stat-arrow">→</span>

                                </div>

                                <p>Total Students</p>

                                <h3>{students.length}</h3>

                                <span className="stat-description">
                                    Registered students
                                </span>

                            </div>

                            {/* TEACHERS */}

                            <div
                                className="stat-card"
                                onClick={() => navigate("/teachers")}
                            >

                                <div className="stat-card-top">

                                    <div className="stat-icon teacher-icon">
                                        👨‍🏫
                                    </div>

                                    <span className="stat-arrow">→</span>

                                </div>

                                <p>Total Teachers</p>

                                <h3>{teachers.length}</h3>

                                <span className="stat-description">
                                    Registered teachers
                                </span>

                            </div>

                            {/* ATTENDANCE */}

                            <div
                                className="stat-card"
                                onClick={() => navigate("/attendance")}
                            >

                                <div className="stat-card-top">

                                    <div className="stat-icon attendance-icon">
                                        📋
                                    </div>

                                    <span className="stat-arrow">→</span>

                                </div>

                                <p>Attendance Records</p>

                                <h3>{attendance.length}</h3>

                                <span className="stat-description">
                                    Attendance entries
                                </span>

                            </div>

                            {/* PERFORMANCE */}

                            <div
                                className="stat-card"
                                onClick={() => navigate("/performance")}
                            >

                                <div className="stat-card-top">

                                    <div className="stat-icon performance-icon">
                                        📊
                                    </div>

                                    <span className="stat-arrow">→</span>

                                </div>

                                <p>Performance Records</p>

                                <h3>{performance.length}</h3>

                                <span className="stat-description">
                                    Academic records
                                </span>

                            </div>

                        </div>

                    </section>

                    {/* QUICK ACTIONS */}

                    <section className="quick-actions-section">

                        <div className="section-title">

                            <div>
                                <h2>Quick Actions</h2>
                                <p>Frequently used management tools</p>
                            </div>

                        </div>

                        <div className="quick-actions-grid">

                            <button
                                className="quick-action"
                                onClick={() => navigate("/students/add")}
                            >
                                <div className="quick-action-icon">➕</div>

                                <div>
                                    <strong>Add Student</strong>
                                    <span>Register a new student</span>
                                </div>

                                <span className="action-arrow">→</span>
                            </button>

                            <button
                                className="quick-action"
                                onClick={() => navigate("/students")}
                            >
                                <div className="quick-action-icon">👥</div>

                                <div>
                                    <strong>Manage Students</strong>
                                    <span>View student information</span>
                                </div>

                                <span className="action-arrow">→</span>
                            </button>

                            <button
                                className="quick-action"
                                onClick={() => navigate("/teachers/add")}
                            >
                                <div className="quick-action-icon">👨‍🏫</div>

                                <div>
                                    <strong>Add Teacher</strong>
                                    <span>Register a new teacher</span>
                                </div>

                                <span className="action-arrow">→</span>
                            </button>

                            <button
                                className="quick-action"
                                onClick={() => navigate("/teachers")}
                            >
                                <div className="quick-action-icon">👥</div>

                                <div>
                                    <strong>Manage Teachers</strong>
                                    <span>View teacher information</span>
                                </div>

                                <span className="action-arrow">→</span>
                            </button>

                            <button
                                className="quick-action"
                                onClick={() => navigate("/attendance/mark")}
                            >
                                <div className="quick-action-icon">✅</div>

                                <div>
                                    <strong>Mark Attendance</strong>
                                    <span>Record today's attendance</span>
                                </div>

                                <span className="action-arrow">→</span>
                            </button>

                            <button
                                className="quick-action"
                                onClick={() => navigate("/performance/add")}
                            >
                                <div className="quick-action-icon">📝</div>

                                <div>
                                    <strong>Add Marks</strong>
                                    <span>Update academic performance</span>
                                </div>

                                <span className="action-arrow">→</span>
                            </button>

                        </div>

                    </section>

                    {/* LOWER SECTION */}

                    <div className="dashboard-lower-grid">

                        {/* RECENT ATTENDANCE */}

                        <section className="dashboard-panel">

                            <div className="panel-header">

                                <div>
                                    <h2>Recent Attendance</h2>
                                    <p>Latest attendance records</p>
                                </div>

                                <button
                                    onClick={() => navigate("/attendance")}
                                >
                                    View All →
                                </button>

                            </div>

                            <div className="attendance-list">

                                {attendance.length > 0 ? (

                                    attendance
                                        .slice(-5)
                                        .reverse()
                                        .map((record) => (

                                            <div
                                                className="attendance-item"
                                                key={
                                                    record.attendanceId ||
                                                    `${record.studentId}-${record.date}`
                                                }
                                            >

                                                <div className="attendance-date">
                                                    <strong>
                                                        {record.date || "N/A"}
                                                    </strong>
                                                </div>

                                                <div className="attendance-student">
                                                    <span>Student ID</span>
                                                    <strong>
                                                        {record.studentId || "N/A"}
                                                    </strong>
                                                </div>

                                                <span
                                                    className={
                                                        record.status === "PRESENT"
                                                            ? "status-present"
                                                            : record.status === "ABSENT"
                                                                ? "status-absent"
                                                                : "status-unknown"
                                                    }
                                                >
                                                    {record.status || "UNKNOWN"}
                                                </span>

                                            </div>

                                        ))

                                ) : (

                                    <div className="empty-state">

                                        <span>📋</span>

                                        <p>
                                            No attendance records available.
                                        </p>

                                        <button
                                            onClick={() => navigate("/attendance/mark")}
                                        >
                                            Mark Attendance
                                        </button>

                                    </div>

                                )}

                            </div>

                        </section>

                        {/* PERFORMANCE SUMMARY */}

                        <section className="dashboard-panel">

                            <div className="panel-header">

                                <div>
                                    <h2>Performance Summary</h2>
                                    <p>Latest academic records</p>
                                </div>

                                <button
                                    onClick={() => navigate("/performance")}
                                >
                                    View All →
                                </button>

                            </div>

                            <div className="performance-summary">

                                <div className="performance-number">
                                    <span>Total Records</span>
                                    <strong>{performance.length}</strong>
                                </div>

                                <div className="performance-info">

                                    <div>

                                        <span className="performance-icon">
                                            📚
                                        </span>

                                        <div>
                                            <strong>
                                                Academic Performance
                                            </strong>

                                            <p>
                                                Student marks and examination
                                                records
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <button
                                    className="performance-button"
                                    onClick={() => navigate("/performance")}
                                >
                                    Manage Performance →
                                </button>

                            </div>

                        </section>

                    </div>

                    {/* SYSTEM STATUS */}

                    <section className="system-status-panel">

                        <div className="system-status-header">

                            <div>
                                <h2>System Status</h2>
                                <p>Current application services</p>
                            </div>

                            <span
                                className={
                                    serviceStatus.students &&
                                    serviceStatus.teachers &&
                                    serviceStatus.attendance &&
                                    serviceStatus.performance
                                        ? "system-online"
                                        : "system-warning"
                                }
                            >

                                {serviceStatus.students &&
                                serviceStatus.teachers &&
                                serviceStatus.attendance &&
                                serviceStatus.performance
                                    ? "● All systems operational"
                                    : "● Some services unavailable"}

                            </span>

                        </div>

                        <div className="system-status-grid">

                            {/* STUDENT DATABASE */}

                            <div className="system-status-item">

                                <span>🗄️</span>

                                <div>
                                    <strong>Student Database</strong>

                                    <p>
                                        {serviceStatus.students
                                            ? "Connected"
                                            : "Unavailable"}
                                    </p>
                                </div>

                                <b
                                    className={
                                        serviceStatus.students
                                            ? "service-active"
                                            : "service-inactive"
                                    }
                                >
                                    ●
                                </b>

                            </div>

                            {/* TEACHER DATABASE */}

                            <div className="system-status-item">

                                <span>👨‍🏫</span>

                                <div>
                                    <strong>Teacher Database</strong>

                                    <p>
                                        {serviceStatus.teachers
                                            ? "Connected"
                                            : "Unavailable"}
                                    </p>
                                </div>

                                <b
                                    className={
                                        serviceStatus.teachers
                                            ? "service-active"
                                            : "service-inactive"
                                    }
                                >
                                    ●
                                </b>

                            </div>

                            {/* ATTENDANCE SYSTEM */}

                            <div className="system-status-item">

                                <span>📋</span>

                                <div>
                                    <strong>Attendance System</strong>

                                    <p>
                                        {serviceStatus.attendance
                                            ? "Active"
                                            : "Unavailable"}
                                    </p>
                                </div>

                                <b
                                    className={
                                        serviceStatus.attendance
                                            ? "service-active"
                                            : "service-inactive"
                                    }
                                >
                                    ●
                                </b>

                            </div>

                            {/* PERFORMANCE SYSTEM */}

                            <div className="system-status-item">

                                <span>📊</span>

                                <div>
                                    <strong>Performance System</strong>

                                    <p>
                                        {serviceStatus.performance
                                            ? "Active"
                                            : "Unavailable"}
                                    </p>
                                </div>

                                <b
                                    className={
                                        serviceStatus.performance
                                            ? "service-active"
                                            : "service-inactive"
                                    }
                                >
                                    ●
                                </b>

                            </div>

                        </div>

                    </section>

                    {/* AI ASSISTANT */}

                    <section className="admin-ai-section">

                        <AIAssistant />

                    </section>

                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;