
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentPerformance.css";

function StudentPerformance() {

    const navigate = useNavigate();

    const studentId = localStorage.getItem("studentId");

    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ======================================================
    // FETCH PERFORMANCE
    // ======================================================

    useEffect(() => {

        setLoading(true);
        setError("");

        fetch(
            `http://localhost:8080/performance/student/${studentId}`
        )
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch performance");
                }

                return response.json();

            })
            .then(data => {

                setPerformance(
                    Array.isArray(data) ? data : []
                );

            })
            .catch(error => {

                console.error(
                    "Performance API Error:",
                    error
                );

                setError(
                    "Unable to load performance records."
                );

            })
            .finally(() => {

                setLoading(false);

            });

    }, [studentId]);


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="performance-loading">

                <div className="performance-spinner"></div>

                <h2>
                    Loading Performance
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

        <div className="student-performance-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="student-performance-header">

                <div>

                    <button
                        className="performance-back-button"
                        onClick={() => navigate("/student")}
                    >
                        ← Back to Dashboard
                    </button>

                    <span className="performance-label">
                        ACADEMIC RECORD
                    </span>

                    <h1>
                        My Performance
                    </h1>

                    <p>
                        View your marks and academic performance.
                    </p>

                </div>

            </header>


            {/* ==================================================
                ERROR MESSAGE
            ================================================== */}

            {error && (

                <div className="performance-error">
                    ⚠️ {error}
                </div>

            )}


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <section className="performance-statistics">


                <div className="performance-stat-card">

                    <div className="performance-stat-icon">
                        📊
                    </div>

                    <div>

                        <span>
                            Total Records
                        </span>

                        <strong>
                            {performance.length}
                        </strong>

                    </div>

                </div>


                <div className="performance-stat-card">

                    <div className="performance-stat-icon">
                        📚
                    </div>

                    <div>

                        <span>
                            Subjects
                        </span>

                        <strong>
                            {
                                new Set(
                                    performance
                                        .map(record => record.subjectId)
                                        .filter(Boolean)
                                ).size
                            }
                        </strong>

                    </div>

                </div>


                <div className="performance-stat-card">

                    <div className="performance-stat-icon">
                        📝
                    </div>

                    <div>

                        <span>
                            Exams
                        </span>

                        <strong>
                            {
                                new Set(
                                    performance
                                        .map(record => record.exam)
                                        .filter(Boolean)
                                ).size
                            }
                        </strong>

                    </div>

                </div>


            </section>


            {/* ==================================================
                PERFORMANCE RECORDS
            ================================================== */}

            <section className="performance-table-container">

                <div className="performance-table-header">

                    <div>

                        <h2>
                            Performance Records
                        </h2>

                        <p>
                            Your academic marks and examination details
                        </p>

                    </div>

                </div>


                {performance.length === 0 ? (

                    <div className="performance-empty">

                        <div className="performance-empty-icon">
                            📊
                        </div>

                        <h3>
                            No Performance Records
                        </h3>

                        <p>
                            No academic performance records are
                            available yet.
                        </p>

                    </div>

                ) : (

                    <div className="performance-table-wrapper">

                        <table className="performance-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
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

                                {performance.map(
                                    (record) => (

                                        <tr
                                            key={
                                                record.performanceId
                                            }
                                        >

                                            <td>

                                                <span className="performance-id">

                                                    #
                                                    {
                                                        record.performanceId
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <span className="subject-badge">

                                                    {
                                                        record.subjectId
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <strong className="exam-name">

                                                    {
                                                        record.exam
                                                    }

                                                </strong>

                                            </td>


                                            <td>

                                                <span className="marks-badge">

                                                    {
                                                        record.marks
                                                    }

                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>


            {/* ==================================================
                FOOTER ACTION
            ================================================== */}

            <div className="performance-footer">

                <button
                    className="performance-dashboard-button"
                    onClick={() => navigate("/student")}
                >
                    ← Back to Student Dashboard
                </button>

            </div>


        </div>

    );

}

export default StudentPerformance;

