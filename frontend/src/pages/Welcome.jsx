import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
    return (
        <div className="welcome-page">

            {/* =========================
                HERO SECTION
            ========================== */}

            <section className="hero-section">

                <div className="hero-content">

                    <div className="brand-badge">
                        🎓 Academic Management System
                    </div>

                    <h1>
                        Student Attendance &
                        <span> Performance Management</span>
                    </h1>

                    <p className="hero-description">
                        A smarter and more efficient platform to manage
                        student attendance, academic performance and
                        educational records in one place.
                    </p>

                    <div className="hero-buttons">

                        <a href="#roles" className="primary-button">
                            Get Started →
                        </a>

                        <a href="#about" className="secondary-button">
                            Explore System
                        </a>

                    </div>

                    {/* Trust indicators */}

                    <div className="trust-row">

                        <div>
                            <strong>100%</strong>
                            <small>Digital</small>
                        </div>

                        <div>
                            <strong>24/7</strong>
                            <small>Access</small>
                        </div>

                        <div>
                            <strong>1</strong>
                            <small>Unified System</small>
                        </div>

                    </div>

                </div>


                {/* =========================
                    DASHBOARD PREVIEW
                ========================== */}

                <div className="dashboard-preview">

                    <div className="preview-header">

                        <div>
                            <span className="status-dot"></span>
                            System Overview
                        </div>

                        <span className="preview-menu">•••</span>

                    </div>


                    <div className="preview-welcome">
                        <small>WELCOME BACK</small>

                        <h2>
                            Academic Overview
                        </h2>
                    </div>


                    <div className="preview-stats">

                        <div className="preview-card">
                            <div className="preview-icon attendance-icon">
                                ✓
                            </div>

                            <div>
                                <small>Attendance</small>
                                <strong>92%</strong>
                            </div>
                        </div>


                        <div className="preview-card">
                            <div className="preview-icon performance-icon">
                                ↗
                            </div>

                            <div>
                                <small>Performance</small>
                                <strong>87%</strong>
                            </div>
                        </div>

                    </div>


                    <div className="progress-section">

                        <div className="progress-title">
                            <span>Academic Progress</span>
                            <strong>87%</strong>
                        </div>

                        <div className="progress-bar">
                            <div></div>
                        </div>

                    </div>


                    <div className="preview-footer">

                        <div>
                            <span className="mini-avatar">👨‍🎓</span>

                            <span>
                                Student Performance
                            </span>
                        </div>

                        <span>View →</span>

                    </div>

                </div>

            </section>


            {/* =========================
                ROLE SECTION
            ========================== */}

            <section className="roles-section" id="roles">

                <div className="section-heading">

                    <span>
                        ACCESS PORTAL
                    </span>

                    <h2>
                        Choose your role
                    </h2>

                    <p>
                        Select the portal that matches your role
                        in the institution.
                    </p>

                </div>


                <div className="role-grid">

                    {/* Student */}

                    <div className="role-card student-card">

                        <div className="role-icon">
                            🎓
                        </div>

                        <span className="role-label">
                            STUDENT PORTAL
                        </span>

                        <h3>
                            Student
                        </h3>

                        <p>
                            Access your attendance, academic
                            performance and personal profile.
                        </p>

                        <ul>
                            <li>✓ View Attendance</li>
                            <li>✓ Track Performance</li>
                            <li>✓ Manage Profile</li>
                        </ul>

                        <Link
                            to="/student-login"
                            className="role-button"
                        >
                            Student Login →
                        </Link>

                    </div>


                    {/* Teacher */}

                    <div className="role-card teacher-card">

                        <div className="role-icon">
                            👨‍🏫
                        </div>

                        <span className="role-label">
                            FACULTY PORTAL
                        </span>

                        <h3>
                            Teacher
                        </h3>

                        <p>
                            Manage student attendance, marks
                            and academic performance.
                        </p>

                        <ul>
                            <li>✓ Mark Attendance</li>
                            <li>✓ Manage Marks</li>
                            <li>✓ View Reports</li>
                        </ul>

                        <Link
                            to="/teacher-login"
                            className="role-button"
                        >
                            Teacher Login →
                        </Link>

                    </div>


                    {/* Admin */}

                    <div className="role-card admin-card">

                        <div className="role-icon">
                            🛡️
                        </div>

                        <span className="role-label">
                            ADMINISTRATION
                        </span>

                        <h3>
                            Administrator
                        </h3>

                        <p>
                            Control users, students, teachers,
                            reports and system operations.
                        </p>

                        <ul>
                            <li>✓ Manage Students</li>
                            <li>✓ Manage Teachers</li>
                            <li>✓ System Reports</li>
                        </ul>

                        <Link
                            to="/admin-login"
                            className="role-button"
                        >
                            Admin Login →
                        </Link>

                    </div>

                </div>

            </section>


            {/* =========================
                FEATURES
            ========================== */}

            <section className="features-section" id="about">

                <div className="feature">

                    <div className="feature-icon">
                        🔐
                    </div>

                    <div>
                        <h3>Secure Access</h3>
                        <p>
                            Role-based access keeps information
                            protected.
                        </p>
                    </div>

                </div>


                <div className="feature">

                    <div className="feature-icon">
                        ⚡
                    </div>

                    <div>
                        <h3>Efficient Management</h3>
                        <p>
                            Reduce manual work and manage records
                            efficiently.
                        </p>
                    </div>

                </div>


                <div className="feature">

                    <div className="feature-icon">
                        📊
                    </div>

                    <div>
                        <h3>Clear Insights</h3>
                        <p>
                            Understand attendance and performance
                            through useful reports.
                        </p>
                    </div>

                </div>


                <div className="feature">

                    <div className="feature-icon">
                        ☁️
                    </div>

                    <div>
                        <h3>Centralized Records</h3>
                        <p>
                            Keep academic information organized
                            in one system.
                        </p>
                    </div>

                </div>

            </section>


            {/* =========================
                FOOTER
            ========================== */}

            <footer className="welcome-footer">

                <div>
                    <strong>
                        🎓 Student Management System
                    </strong>

                    <span>
                        Smart • Simple • Efficient
                    </span>
                </div>

                <p>
                    © 2026 Student Attendance & Performance
                    Management System
                </p>

            </footer>

        </div>
    );
}

export default Welcome;

