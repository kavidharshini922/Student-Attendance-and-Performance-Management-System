
import { useNavigate, Link } from "react-router-dom";
import AIAssistant from "../components/AIAssistant";
import "./StudentDashboard.css";

function StudentDashboard() {

    const name = localStorage.getItem("userName");

    const navigate = useNavigate();

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        localStorage.removeItem("studentId");

        navigate("/login");
    };

    return (
        <div className="student-dashboard-page">

            {/* HEADER */}
            <header className="student-dashboard-header">
                <div>
                    <span className="student-dashboard-label">
                        STUDENT PORTAL
                    </span>

                    <h1>Student Dashboard</h1>

                    <p>Welcome back, {name || "Student"} 👋</p>
                </div>

                <button
                    className="student-logout-button"
                    onClick={logout}
                >
                    Logout
                </button>
            </header>

            {/* WELCOME BANNER */}
            <section className="student-welcome-card">
                <div>
                    <span className="welcome-small-text">
                        Welcome Back
                    </span>

                    <h2>Hello, {name || "Student"}!</h2>

                    <p>
                        Access your attendance, academic performance
                        and personal information from one place.
                    </p>
                </div>

                <div className="student-welcome-icon">
                    🎓
                </div>
            </section>

            {/* DASHBOARD SECTION */}
            <section className="student-dashboard-section">
                <div className="student-section-heading">
                    <div>
                        <h2>My Academic Information</h2>

                        <p>
                            Select an option to view your information.
                        </p>
                    </div>
                </div>

                {/* DASHBOARD CARDS */}
                <div className="student-dashboard-cards">

                    {/* ATTENDANCE */}
                    <Link
                        to="/student/attendance"
                        className="student-dashboard-link"
                    >
                        <div className="student-dashboard-card">
                            <div className="student-card-top">
                                <div className="student-card-icon attendance-icon">
                                    📅
                                </div>

                                <span className="student-card-arrow">
                                    →
                                </span>
                            </div>

                            <h3>My Attendance</h3>

                            <p>
                                View your attendance records,
                                dates and attendance status.
                            </p>

                            <div className="student-card-action">
                                View Attendance →
                            </div>
                        </div>
                    </Link>

                    {/* PERFORMANCE */}
                    <Link
                        to="/student/performance"
                        className="student-dashboard-link"
                    >
                        <div className="student-dashboard-card">
                            <div className="student-card-top">
                                <div className="student-card-icon performance-icon">
                                    📊
                                </div>

                                <span className="student-card-arrow">
                                    →
                                </span>
                            </div>

                            <h3>My Performance</h3>

                            <p>
                                View your marks, subjects and
                                academic performance.
                            </p>

                            <div className="student-card-action">
                                View Performance →
                            </div>
                        </div>
                    </Link>

                    {/* PROFILE */}
                    <Link
                        to="/student/profile"
                        className="student-dashboard-link"
                    >
                        <div className="student-dashboard-card">
                            <div className="student-card-top">
                                <div className="student-card-icon profile-icon">
                                    👤
                                </div>

                                <span className="student-card-arrow">
                                    →
                                </span>
                            </div>

                            <h3>My Profile</h3>

                            <p>
                                View your personal and student
                                information.
                            </p>

                            <div className="student-card-action">
                                View Profile →
                            </div>
                        </div>
                    </Link>

                </div>
            </section>

            {/* QUICK INFORMATION */}
            <section className="student-info-section">

                <div className="student-info-card">
                    <div className="student-info-icon">
                        📚
                    </div>

                    <div>
                        <h3>Stay Updated</h3>

                        <p>
                            Regularly check your attendance and
                            academic performance to stay on track.
                        </p>
                    </div>
                </div>

                <div className="student-info-card">
                    <div className="student-info-icon">
                        🎯
                    </div>

                    <div>
                        <h3>Keep Improving</h3>

                        <p>
                            Monitor your progress and work towards
                            achieving your academic goals.
                        </p>
                    </div>
                </div>

            </section>

            {/* AI STUDENT ASSISTANT */}
            <section className="student-ai-section">
                <div className="student-ai-heading">
                    <h2>AI Student Assistant</h2>

                    <p>
                        Get help understanding your attendance,
                        academic performance and study progress.
                    </p>
                </div>

                <AIAssistant />
            </section>

        </div>
    );
}

export default StudentDashboard;
