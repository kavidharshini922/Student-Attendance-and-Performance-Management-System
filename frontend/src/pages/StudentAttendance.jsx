import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentAttendance.css";

function StudentAttendance() {

    const navigate = useNavigate();

    const studentId = localStorage.getItem("studentId");

    const [attendance, setAttendance] = useState([]);
    const [percentage, setPercentage] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ======================================================
    // FETCH ATTENDANCE DATA
    // ======================================================

    useEffect(() => {

        const fetchAttendance = async () => {

            try {

                setLoading(true);
                setError("");

                // Get attendance records
                const attendanceResponse = await fetch(
                    `http://localhost:8080/attendance/student/${studentId}`
                );

                if (!attendanceResponse.ok) {
                    throw new Error("Failed to fetch attendance");
                }

                const attendanceData =
                    await attendanceResponse.json();

                setAttendance(
                    Array.isArray(attendanceData)
                        ? attendanceData
                        : []
                );


                // Get attendance percentage
                const percentageResponse = await fetch(
                    `http://localhost:8080/attendance/student/${studentId}/percentage`
                );

                if (!percentageResponse.ok) {
                    throw new Error(
                        "Failed to fetch attendance percentage"
                    );
                }

                const percentageData =
                    await percentageResponse.json();

                setPercentage(
                    Number(percentageData) || 0
                );

            } catch (error) {

                console.error(
                    "Attendance Error:",
                    error
                );

                setError(
                    "Unable to load attendance information. Please make sure the backend is running."
                );

            } finally {

                setLoading(false);

            }

        };


        if (studentId) {
            fetchAttendance();
        } else {

            setError(
                "Student information not found. Please login again."
            );

            setLoading(false);

        }

    }, [studentId]);


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="student-attendance-loading">

                <div className="student-attendance-spinner"></div>

                <h2>
                    Loading Attendance
                </h2>

                <p>
                    Please wait...
                </p>

            </div>

        );

    }


    // ======================================================
    // PAGE
    // ======================================================

    return (

        <div className="student-attendance-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="student-attendance-header">

                <div>

                    <button
                        className="student-attendance-back-button"
                        onClick={() => navigate("/student")}
                    >
                        ← Back to Dashboard
                    </button>

                    <h1>
                        My Attendance
                    </h1>

                    <p>
                        View your attendance records and percentage
                    </p>

                </div>

            </header>


            {/* ==================================================
                ERROR MESSAGE
            ================================================== */}

            {error && (

                <div className="student-attendance-error">

                    ⚠️ {error}

                </div>

            )}


            {/* ==================================================
                ATTENDANCE SUMMARY
            ================================================== */}

            <section className="student-attendance-summary">


                {/* PERCENTAGE */}

                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        📊
                    </div>

                    <div>

                        <span>
                            Attendance Percentage
                        </span>

                        <strong>
                            {Number(percentage).toFixed(2)}%
                        </strong>

                    </div>

                </div>


                {/* TOTAL RECORDS */}

                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        📅
                    </div>

                    <div>

                        <span>
                            Total Records
                        </span>

                        <strong>
                            {attendance.length}
                        </strong>

                    </div>

                </div>


                {/* PRESENT DAYS */}

                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        ✅
                    </div>

                    <div>

                        <span>
                            Present
                        </span>

                        <strong>

                            {
                                attendance.filter(
                                    record =>
                                        record.status ===
                                        "PRESENT"
                                ).length
                            }

                        </strong>

                    </div>

                </div>


                {/* ABSENT DAYS */}

                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        ❌
                    </div>

                    <div>

                        <span>
                            Absent
                        </span>

                        <strong>

                            {
                                attendance.filter(
                                    record =>
                                        record.status ===
                                        "ABSENT"
                                ).length
                            }

                        </strong>

                    </div>

                </div>

            </section>


            {/* ==================================================
                ATTENDANCE RECORDS
            ================================================== */}

            <section className="student-attendance-table-container">

                <div className="student-attendance-table-header">

                    <div>

                        <h2>
                            Attendance Records
                        </h2>

                        <p>
                            {attendance.length} record
                            {attendance.length !== 1
                                ? "s"
                                : ""}{" "}
                            found
                        </p>

                    </div>

                </div>


                {attendance.length > 0 ? (

                    <div className="student-attendance-table-wrapper">

                        <table className="student-attendance-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
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

                                {attendance.map(
                                    (record) => (

                                        <tr
                                            key={
                                                record.attendanceId
                                            }
                                        >

                                            <td>

                                                <span className="attendance-id">

                                                    #
                                                    {
                                                        record.attendanceId
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <span className="attendance-date">

                                                    {
                                                        record.date
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        record.status ===
                                                        "PRESENT"
                                                            ? "attendance-status-present"
                                                            : "attendance-status-absent"
                                                    }
                                                >

                                                    {record.status ===
                                                    "PRESENT"
                                                        ? "✓ Present"
                                                        : "✕ Absent"}

                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="student-attendance-empty">

                        <div>
                            📅
                        </div>

                        <h3>
                            No Attendance Records
                        </h3>

                        <p>
                            No attendance records have been found for your account.
                        </p>

                    </div>

                )}

            </section>


            {/* ==================================================
                BACK BUTTON
            ================================================== */}

            <div className="student-attendance-footer">

                <button
                    className="student-attendance-dashboard-button"
                    onClick={() => navigate("/student")}
                >
                    ← Back to Student Dashboard
                </button>

            </div>

        </div>

    );

}

export default StudentAttendance;