import { Link, useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

function TeacherDashboard() {

    const name = localStorage.getItem("userName");

    const navigate = useNavigate();


    // ======================================================
    // LOGOUT
    // ======================================================

    const logout = () => {

        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");

        navigate("/login");

    };


    return (

        <div className="teacher-dashboard">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="teacher-dashboard-header">

                <div>

                    <span className="teacher-dashboard-label">
                        TEACHER PORTAL
                    </span>

                    <h1>
                        Teacher Dashboard
                    </h1>

                    <p>
                        Welcome back, {name || "Teacher"} 👋
                    </p>

                </div>


                <button
                    className="teacher-logout-button"
                    onClick={logout}
                >
                    ↪ Logout
                </button>

            </header>


            {/* ==================================================
                DASHBOARD CARDS
            ================================================== */}

            <section className="teacher-dashboard-cards">


                {/* ==================================================
                    STUDENTS
                ================================================== */}

                <div className="teacher-dashboard-card">

                    <div className="teacher-card-icon">
                        🎓
                    </div>

                    <div className="teacher-card-content">

                        <span className="teacher-card-label">
                            STUDENT MANAGEMENT
                        </span>

                        <h2>
                            Students
                        </h2>

                        <p>
                            View and manage student information.
                        </p>


                        <Link
                            to="/students"
                            className="teacher-card-button"
                        >
                            View Students
                            <span>→</span>
                        </Link>

                    </div>

                </div>


                {/* ==================================================
                    ATTENDANCE
                ================================================== */}

                <div className="teacher-dashboard-card">

                    <div className="teacher-card-icon">
                        📅
                    </div>

                    <div className="teacher-card-content">

                        <span className="teacher-card-label">
                            ATTENDANCE MANAGEMENT
                        </span>

                        <h2>
                            Attendance
                        </h2>

                        <p>
                            Manage and monitor student attendance.
                        </p>


                        <div className="teacher-card-links">

                            <Link
                                to="/attendance"
                                className="teacher-card-button"
                            >
                                View Attendance
                                <span>→</span>
                            </Link>


                            <Link
                                to="/attendance/mark"
                                className="teacher-card-button secondary"
                            >
                                Mark Attendance
                                <span>→</span>
                            </Link>


                            <Link
                                to="/attendance/status"
                                className="teacher-card-button secondary"
                            >
                                Attendance Status
                                <span>→</span>
                            </Link>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    PERFORMANCE
                ================================================== */}

                <div className="teacher-dashboard-card">

                    <div className="teacher-card-icon">
                        📊
                    </div>

                    <div className="teacher-card-content">

                        <span className="teacher-card-label">
                            ACADEMIC MANAGEMENT
                        </span>

                        <h2>
                            Performance
                        </h2>

                        <p>
                            Manage student marks and academic performance.
                        </p>


                        <div className="teacher-card-links">

                            <Link
                                to="/performance"
                                className="teacher-card-button"
                            >
                                View Performance
                                <span>→</span>
                            </Link>


                            <Link
                                to="/performance/add"
                                className="teacher-card-button secondary"
                            >
                                Add Marks
                                <span>→</span>
                            </Link>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    REPORTS
                ================================================== */}

                <div className="teacher-dashboard-card">

                    <div className="teacher-card-icon">
                        📈
                    </div>

                    <div className="teacher-card-content">

                        <span className="teacher-card-label">
                            ANALYTICS
                        </span>

                        <h2>
                            Reports
                        </h2>

                        <p>
                            View attendance and performance reports.
                        </p>


                        <div className="teacher-card-links">

                            <Link
                                to="/reports/attendance"
                                className="teacher-card-button"
                            >
                                Attendance Report
                                <span>→</span>
                            </Link>


                            <Link
                                to="/reports/performance"
                                className="teacher-card-button secondary"
                            >
                                Performance Report
                                <span>→</span>
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="teacher-dashboard-footer">

                <p>
                    Student Attendance & Performance Management System
                </p>

            </footer>

        </div>

    );

}

export default TeacherDashboard;