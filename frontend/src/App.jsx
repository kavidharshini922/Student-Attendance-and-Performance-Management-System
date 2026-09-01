
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ======================================================
// Welcome Page
// ======================================================

import Welcome from "./pages/Welcome";

// ======================================================
// Login Pages
// ======================================================

import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import AdminLogin from "./pages/AdminLogin";

// ======================================================
// Role Dashboards
// ======================================================

import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

// ======================================================
// Protected Route
// ======================================================

import ProtectedRoute from "./pages/ProtectedRoute";

// ======================================================
// Student Management Pages
// ======================================================

import AddStudent from "./pages/students/AddStudent";
import ViewStudents from "./pages/students/ViewStudents";
import EditStudent from "./pages/students/EditStudent";

// ======================================================
// Teacher Management Page
// ======================================================

import Teacher from "./pages/Teacher";

// ======================================================
// Student Personal Pages
// ======================================================

import StudentProfile from "./pages/StudentProfile";
import StudentAttendance from "./pages/StudentAttendance";
import StudentPerformance from "./pages/StudentPerformance";

// ======================================================
// Attendance Pages
// ======================================================

import MarkAttendance from "./pages/attendance/MarkAttendance";
import ViewAttendance from "./pages/attendance/ViewAttendance";
import AttendanceStatus from "./pages/attendance/AttendanceStatus";

// ======================================================
// Performance Pages
// ======================================================

import AddMarks from "./pages/performance/AddMarks";
import ViewMarks from "./pages/performance/ViewMarks";
import UpdateMarks from "./pages/performance/UpdateMarks";

// ======================================================
// Report Pages
// ======================================================

import AttendancePercentage from "./pages/reports/AttendancePercentage";
import PerformanceSummary from "./pages/reports/PerformanceSummary";

// ======================================================
// OLD / EXISTING DASHBOARD
// ======================================================

function Dashboard() {

    return (

        <div className="dashboard">

            <h1>
                Student Attendance & Performance Management System
            </h1>

            <p>
                Welcome to the Dashboard
            </p>

            <div className="dashboard-cards">

                {/* ==================================================
                    STUDENTS
                ================================================== */}

                <div className="card">

                    <h2>
                        Students
                    </h2>

                    <p>
                        Manage student information
                    </p>

                    <a href="/students">
                        View Students
                    </a>

                    <br />
                    <br />

                    <a href="/students/add">
                        Add Student
                    </a>

                </div>

                {/* ==================================================
                    ATTENDANCE
                ================================================== */}

                <div className="card">

                    <h2>
                        Attendance
                    </h2>

                    <p>
                        Manage student attendance
                    </p>

                    <a href="/attendance">
                        View Attendance
                    </a>

                    <br />
                    <br />

                    <a href="/attendance/mark">
                        Mark Attendance
                    </a>

                    <br />
                    <br />

                    <a href="/attendance/status">
                        Attendance Status
                    </a>

                </div>

                {/* ==================================================
                    PERFORMANCE
                ================================================== */}

                <div className="card">

                    <h2>
                        Performance
                    </h2>

                    <p>
                        Manage student marks
                    </p>

                    <a href="/performance">
                        View Performance
                    </a>

                    <br />
                    <br />

                    <a href="/performance/add">
                        Add Marks
                    </a>

                </div>

                {/* ==================================================
                    REPORTS
                ================================================== */}

                <div className="card">

                    <h2>
                        Reports
                    </h2>

                    <p>
                        View student reports
                    </p>

                    <a href="/reports/attendance">
                        Attendance Percentage
                    </a>

                    <br />
                    <br />

                    <a href="/reports/performance">
                        Performance Summary
                    </a>

                </div>

            </div>

        </div>

    );

}

// ======================================================
// MAIN APPLICATION
// ======================================================

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ==================================================
                    WELCOME SCREEN
                ================================================== */}

                <Route
                    path="/"
                    element={
                        <Welcome />
                    }
                />

                {/* ==================================================
                    OLD LOGIN
                ================================================== */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />

                {/* ==================================================
                    STUDENT LOGIN
                ================================================== */}

                <Route
                    path="/student-login"
                    element={
                        <StudentLogin />
                    }
                />

                {/* ==================================================
                    TEACHER LOGIN
                ================================================== */}

                <Route
                    path="/teacher-login"
                    element={
                        <TeacherLogin />
                    }
                />

                {/* ==================================================
                    ADMIN LOGIN
                ================================================== */}

                <Route
                    path="/admin-login"
                    element={
                        <AdminLogin />
                    }
                />

                {/* ==================================================
                    STUDENT DASHBOARD
                ================================================== */}

                <Route
                    path="/student"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">

                            <StudentDashboard />

                        </ProtectedRoute>
                    }
                />

                {/* ==================================================
                    STUDENT PROFILE
                ================================================== */}

                <Route
                    path="/student/profile"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">

                            <StudentProfile />

                        </ProtectedRoute>
                    }
                />

                {/* ==================================================
                    STUDENT ATTENDANCE
                ================================================== */}

                <Route
                    path="/student/attendance"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">

                            <StudentAttendance />

                        </ProtectedRoute>
                    }
                />

                {/* ==================================================
                    STUDENT PERFORMANCE
                ================================================== */}

                <Route
                    path="/student/performance"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">

                            <StudentPerformance />

                        </ProtectedRoute>
                    }
                />

                {/* ==================================================
                    TEACHER DASHBOARD
                ================================================== */}

                <Route
                    path="/teacher"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">

                            <TeacherDashboard />

                        </ProtectedRoute>
                    }
                />

                {/* ==================================================
                    ADMIN DASHBOARD
                ================================================== */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">

                            <AdminDashboard />

                        </ProtectedRoute>
                    }
                />

                {/* ==================================================
                    OLD / GENERAL DASHBOARD
                ================================================== */}

                <Route
                    path="/dashboard"
                    element={
                        <Dashboard />
                    }
                />

                {/* ==================================================
                    STUDENT MANAGEMENT
                ================================================== */}

                <Route
                    path="/students"
                    element={
                        <ViewStudents />
                    }
                />

                <Route
                    path="/students/add"
                    element={
                        <AddStudent />
                    }
                />

                <Route
                    path="/students/edit/:id"
                    element={
                        <EditStudent />
                    }
                />

                {/* ==================================================
                    TEACHER MANAGEMENT
                ================================================== */}

                <Route
                    path="/teachers"
                    element={
                        <Teacher />
                    }
                />

                {/* ==================================================
                    ATTENDANCE
                ================================================== */}

                <Route
                    path="/attendance"
                    element={
                        <ViewAttendance />
                    }
                />

                <Route
                    path="/attendance/mark"
                    element={
                        <MarkAttendance />
                    }
                />

                <Route
                    path="/attendance/status"
                    element={
                        <AttendanceStatus />
                    }
                />

                {/* ==================================================
                    PERFORMANCE
                ================================================== */}

                <Route
                    path="/performance"
                    element={
                        <ViewMarks />
                    }
                />

                <Route
                    path="/performance/add"
                    element={
                        <AddMarks />
                    }
                />

                <Route
                    path="/performance/update/:id"
                    element={
                        <UpdateMarks />
                    }
                />

                {/* ==================================================
                    REPORTS
                ================================================== */}

                <Route
                    path="/reports/attendance"
                    element={
                        <AttendancePercentage />
                    }
                />

                <Route
                    path="/reports/performance"
                    element={
                        <PerformanceSummary />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default App;

