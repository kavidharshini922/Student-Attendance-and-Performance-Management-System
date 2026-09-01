import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PerformanceSummary.css";

function PerformanceSummary() {

    const navigate = useNavigate();

    const [studentId, setStudentId] = useState("");
    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // ======================================================
    // SEARCH PERFORMANCE
    // ======================================================

    const searchPerformance = async (e) => {

        e.preventDefault();

        setRecords([]);
        setMessage("");
        setError("");
        setLoading(true);


        if (!studentId) {

            setError("Please enter a Student ID.");
            setLoading(false);

            return;
        }


        try {

            const response = await fetch(
                "http://localhost:8080/performance"
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to load performance"
                );

            }


            const data = await response.json();


            const studentRecords = data.filter(
                (item) =>
                    Number(item.studentId) ===
                    Number(studentId)
            );


            if (studentRecords.length === 0) {

                setMessage(
                    "No performance records found for this student."
                );

            } else {

                setRecords(studentRecords);

                setMessage(
                    "Performance records loaded successfully."
                );

            }


        } catch (error) {

            console.error(
                "Performance Summary Error:",
                error
            );

            setError(
                "Failed to load performance. Please make sure the backend is running."
            );

        } finally {

            setLoading(false);

        }

    };


    // ======================================================
    // CALCULATE AVERAGE
    // ======================================================

    const averageMarks =
        records.length > 0
            ? records.reduce(
                (total, item) =>
                    total + Number(item.marks || 0),
                0
            ) / records.length
            : 0;


    // ======================================================
    // PAGE
    // ======================================================

    return (

        <div className="performance-summary-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="performance-summary-header">

                <div>

                    <button
                        className="performance-summary-back"
                        onClick={() => navigate("/admin")}
                    >
                        ← Back to Dashboard
                    </button>


                    <h1>
                        Performance Summary
                    </h1>


                    <p>
                        View and analyze student performance records
                    </p>

                </div>

            </header>


            {/* ==================================================
                MAIN CONTENT
            ================================================== */}

            <div className="performance-summary-content">


                {/* ==================================================
                    SEARCH CARD
                ================================================== */}

                <section className="performance-search-card">

                    <div className="performance-search-icon">
                        📊
                    </div>


                    <h2>
                        Search Student Performance
                    </h2>


                    <p>
                        Enter the Student ID to view their performance summary.
                    </p>


                    <form
                        className="performance-search-form"
                        onSubmit={searchPerformance}
                    >

                        <div className="performance-input-group">

                            <label>
                                Student ID
                            </label>


                            <input
                                type="number"
                                min="1"
                                value={studentId}
                                onChange={(e) =>
                                    setStudentId(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter Student ID"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="performance-search-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Searching..."
                                : "🔍 Search"}

                        </button>

                    </form>

                </section>


                {/* ==================================================
                    SUCCESS MESSAGE
                ================================================== */}

                {message && (

                    <div className="performance-summary-message">
                        ✅ {message}
                    </div>

                )}


                {/* ==================================================
                    ERROR MESSAGE
                ================================================== */}

                {error && (

                    <div className="performance-summary-error">
                        ⚠️ {error}
                    </div>

                )}


                {/* ==================================================
                    SUMMARY STATISTICS
                ================================================== */}

                {records.length > 0 && (

                    <section className="performance-summary-stats">


                        <div className="performance-summary-stat-card">

                            <div className="performance-stat-icon">
                                📝
                            </div>

                            <div>

                                <span>
                                    Total Exams
                                </span>

                                <strong>
                                    {records.length}
                                </strong>

                            </div>

                        </div>


                        <div className="performance-summary-stat-card">

                            <div className="performance-stat-icon">
                                🎯
                            </div>

                            <div>

                                <span>
                                    Average Marks
                                </span>

                                <strong>
                                    {averageMarks.toFixed(2)}
                                </strong>

                            </div>

                        </div>


                        <div className="performance-summary-stat-card">

                            <div className="performance-stat-icon">
                                🏆
                            </div>

                            <div>

                                <span>
                                    Highest Marks
                                </span>

                                <strong>
                                    {
                                        Math.max(
                                            ...records.map(
                                                item =>
                                                    Number(
                                                        item.marks || 0
                                                    )
                                            )
                                        )
                                    }
                                </strong>

                            </div>

                        </div>

                    </section>

                )}


                {/* ==================================================
                    PERFORMANCE TABLE
                ================================================== */}

                {records.length > 0 && (

                    <section className="performance-summary-table-container">


                        <div className="performance-summary-table-header">

                            <div>

                                <h2>
                                    Performance Records
                                </h2>

                                <p>
                                    Student ID: #{studentId}
                                </p>

                            </div>

                        </div>


                        <div className="performance-summary-table-wrapper">

                            <table className="performance-summary-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Performance ID
                                        </th>

                                        <th>
                                            Subject ID
                                        </th>

                                        <th>
                                            Exam
                                        </th>

                                        <th>
                                            Marks
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {records.map((item) => (

                                        <tr
                                            key={
                                                item.performanceId
                                            }
                                        >

                                            <td>

                                                <span className="performance-id-badge">
                                                    #
                                                    {item.performanceId}
                                                </span>

                                            </td>


                                            <td>

                                                <span className="summary-subject-badge">
                                                    Subject{" "}
                                                    {item.subjectId}
                                                </span>

                                            </td>


                                            <td>

                                                <div className="summary-exam">

                                                    <span className="summary-exam-icon">
                                                        📚
                                                    </span>

                                                    <strong>
                                                        {item.exam}
                                                    </strong>

                                                </div>

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        Number(item.marks) >= 40
                                                            ? "summary-marks-pass"
                                                            : "summary-marks-fail"
                                                    }
                                                >
                                                    {item.marks}
                                                </span>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </section>

                )}


                {/* ==================================================
                    EMPTY INITIAL STATE
                ================================================== */}

                {records.length === 0 &&
                    !message &&
                    !error && (

                        <div className="performance-summary-empty">

                            <div className="performance-empty-icon">
                                📈
                            </div>

                            <h3>
                                Search for a Student
                            </h3>

                            <p>
                                Enter a Student ID above to view
                                their performance records.
                            </p>

                        </div>

                    )}

            </div>

        </div>

    );

}

export default PerformanceSummary;