
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AttendanceStatus.css";

function AttendanceStatus() {

    const navigate = useNavigate();

    const [studentId, setStudentId] = useState("");
    const [attendance, setAttendance] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    // ======================================================
    // SEARCH ATTENDANCE
    // ======================================================

    const searchAttendance = async (e) => {

        e.preventDefault();

        setMessage("");
        setAttendance([]);

        if (!studentId) {
            setMessage("Please enter Student ID.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `http://localhost:8080/attendance/student/${studentId}`
            );

            if (!response.ok) {
                throw new Error("Failed to load attendance");
            }

            const data = await response.json();

            if (data.length === 0) {

                setMessage(
                    "No attendance records found for this student."
                );

            } else {

                setAttendance(data);

            }

        } catch (error) {

            console.error(error);

            setMessage(
                "Failed to load attendance. Please make sure the backend is running."
            );

        } finally {

            setLoading(false);

        }

    };


    // ======================================================
    // PAGE
    // ======================================================

    return (

        <div className="attendance-status-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="attendance-status-header">

                <div>

                    <button
                        className="attendance-back-button"
                        onClick={() => navigate("/admin")}
                    >
                        ← Back to Dashboard
                    </button>

                    <h1>
                        Attendance Status
                    </h1>

                    <p>
                        Search and view attendance records of students
                    </p>

                </div>

            </header>


            {/* ==================================================
                SEARCH CARD
            ================================================== */}

            <section className="attendance-search-card">

                <div className="attendance-card-title">

                    <div className="attendance-icon">
                        🔎
                    </div>

                    <div>

                        <h2>
                            Search Attendance
                        </h2>

                        <p>
                            Enter a student ID to view attendance records
                        </p>

                    </div>

                </div>


                <form
                    className="attendance-search-form"
                    onSubmit={searchAttendance}
                >

                    <div className="attendance-input-group">

                        <label>
                            Student ID
                        </label>

                        <input
                            type="number"
                            placeholder="Enter Student ID"
                            value={studentId}
                            onChange={(e) =>
                                setStudentId(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="attendance-search-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Searching..."
                            : "🔍 Search"}

                    </button>

                </form>

            </section>


            {/* ==================================================
                MESSAGE
            ================================================== */}

            {message && (

                <div className="attendance-message">

                    ⚠️ {message}

                </div>

            )}


            {/* ==================================================
                RESULTS
            ================================================== */}

            {attendance.length > 0 && (

                <section className="attendance-results-card">


                    {/* RESULTS HEADER */}

                    <div className="attendance-results-header">

                        <div>

                            <h2>
                                Attendance Records
                            </h2>

                            <p>
                                Student ID: #{studentId}
                            </p>

                        </div>


                        <div className="attendance-record-count">

                            <span>
                                Records
                            </span>

                            <strong>
                                {attendance.length}
                            </strong>

                        </div>

                    </div>


                    {/* TABLE */}

                    <div className="attendance-table-wrapper">

                        <table className="attendance-status-table">

                            <thead>

                                <tr>

                                    <th>
                                        Attendance ID
                                    </th>

                                    <th>
                                        Student ID
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {attendance.map((item) => (

                                    <tr
                                        key={item.attendanceId}
                                    >

                                        <td>

                                            <span className="attendance-id">

                                                #{item.attendanceId}

                                            </span>

                                        </td>


                                        <td>

                                            <span className="attendance-student-id">

                                                #{item.studentId}

                                            </span>

                                        </td>


                                        <td>

                                            {item.date}

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    item.status === "PRESENT"
                                                        ? "status-present"
                                                        : "status-absent"
                                                }
                                            >

                                                {item.status === "PRESENT"
                                                    ? "✓ PRESENT"
                                                    : "✕ ABSENT"}

                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </section>

            )}

        </div>

    );

}

export default AttendanceStatus;

