
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewAttendance.css";

function ViewAttendance() {

    const navigate = useNavigate();

    const [attendance, setAttendance] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // ======================================================
    // GET ALL ATTENDANCE
    // ======================================================

    const fetchAttendance = async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");
            setMessage("");

            const response = await fetch(
                "https://student-attendance-and-performance.onrender.com/attendance"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch attendance"
                );
            }

            const data = await response.json();

            setAttendance(
                Array.isArray(data) ? data : []
            );

        } catch (err) {

            console.error(
                "Attendance API Error:",
                err
            );

            setError(
                "Unable to load attendance. Please make sure the backend is running."
            );

        } finally {

            setLoading(false);
            setRefreshing(false);

        }

    };


    // ======================================================
    // INITIAL LOAD
    // ======================================================

    useEffect(() => {

        fetchAttendance();

    }, []);


    // ======================================================
    // SEARCH
    // ======================================================

    const filteredAttendance = attendance.filter(
        (record) => {

            const search =
                searchTerm.toLowerCase();

            return (

                String(
                    record.attendanceId || ""
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    record.studentId || ""
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    record.date || ""
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    record.status || ""
                )
                    .toLowerCase()
                    .includes(search)

            );

        }
    );


    // ======================================================
    // STATISTICS
    // ======================================================

    const presentCount =
        attendance.filter(
            record =>
                String(record.status)
                    .toUpperCase() === "PRESENT"
        ).length;


    const absentCount =
        attendance.filter(
            record =>
                String(record.status)
                    .toUpperCase() === "ABSENT"
        ).length;


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="view-attendance-loading">

                <div className="view-attendance-spinner"></div>

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

        <div className="view-attendance-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="view-attendance-header">

                <div>

                    <button
                        className="view-attendance-back-button"
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                    <h1>
                        Attendance Management
                    </h1>

                    <p>
                        View and monitor student attendance records
                    </p>

                </div>


                <button
                    className="view-attendance-mark-button"
                    onClick={() =>
                        navigate("/attendance/mark")
                    }
                >
                    ➕ Mark Attendance
                </button>

            </header>


            {/* ==================================================
                MESSAGES
            ================================================== */}

            {message && (

                <div className="view-attendance-success">
                    ✅ {message}
                </div>

            )}


            {error && (

                <div className="view-attendance-error">
                    ⚠️ {error}
                </div>

            )}


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <section className="view-attendance-statistics">


                {/* TOTAL RECORDS */}

                <div className="view-attendance-stat-card">

                    <div className="view-attendance-stat-icon">
                        📋
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


                {/* PRESENT */}

                <div className="view-attendance-stat-card">

                    <div className="view-attendance-stat-icon">
                        ✅
                    </div>

                    <div>

                        <span>
                            Present
                        </span>

                        <strong>
                            {presentCount}
                        </strong>

                    </div>

                </div>


                {/* ABSENT */}

                <div className="view-attendance-stat-card">

                    <div className="view-attendance-stat-icon">
                        ❌
                    </div>

                    <div>

                        <span>
                            Absent
                        </span>

                        <strong>
                            {absentCount}
                        </strong>

                    </div>

                </div>


                {/* SEARCH RESULTS */}

                <div className="view-attendance-stat-card">

                    <div className="view-attendance-stat-icon">
                        🔎
                    </div>

                    <div>

                        <span>
                            Search Results
                        </span>

                        <strong>
                            {filteredAttendance.length}
                        </strong>

                    </div>

                </div>

            </section>


            {/* ==================================================
                TOOLBAR
            ================================================== */}

            <section className="view-attendance-toolbar">


                <div className="view-attendance-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search by attendance ID, student ID, date or status..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                    />

                </div>


                <button
                    className="view-attendance-refresh-button"
                    onClick={() =>
                        fetchAttendance(true)
                    }
                    disabled={refreshing}
                >

                    {refreshing
                        ? "Refreshing..."
                        : "↻ Refresh"}

                </button>


                <button
                    className="view-attendance-status-button"
                    onClick={() =>
                        navigate("/attendance/status")
                    }
                >
                    🔎 Check Status
                </button>

            </section>


            {/* ==================================================
                ATTENDANCE TABLE
            ================================================== */}

            <section className="view-attendance-table-container">


                <div className="view-attendance-table-header">

                    <div>

                        <h2>
                            All Attendance Records
                        </h2>

                        <p>

                            {filteredAttendance.length} record
                            {filteredAttendance.length !== 1
                                ? "s"
                                : ""}{" "}
                            found

                        </p>

                    </div>

                </div>


                {filteredAttendance.length > 0 ? (

                    <div className="view-attendance-table-wrapper">

                        <table className="view-attendance-table">

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

                                {filteredAttendance.map(
                                    (record) => (

                                        <tr
                                            key={
                                                record.attendanceId
                                            }
                                        >

                                            <td>

                                                <span className="view-attendance-id">

                                                    #
                                                    {
                                                        record.attendanceId
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <span className="view-attendance-student-id">

                                                    Student #
                                                    {
                                                        record.studentId
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <span>

                                                    {
                                                        record.date ||
                                                        "N/A"
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        String(
                                                            record.status
                                                        ).toUpperCase() ===
                                                        "PRESENT"
                                                            ? "attendance-present-badge"
                                                            : "attendance-absent-badge"
                                                    }
                                                >

                                                    {
                                                        String(
                                                            record.status ||
                                                            "N/A"
                                                        ).toUpperCase()
                                                    }

                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="view-attendance-empty">

                        <div>
                            📋
                        </div>

                        <h3>
                            No attendance records found
                        </h3>

                        <p>

                            {searchTerm
                                ? "Try a different search term."
                                : "No attendance records have been created yet."}

                        </p>


                        {!searchTerm && (

                            <button
                                onClick={() =>
                                    navigate(
                                        "/attendance/mark"
                                    )
                                }
                            >
                                ➕ Mark First Attendance
                            </button>

                        )}

                    </div>

                )}

            </section>

        </div>

    );

}

export default ViewAttendance;

