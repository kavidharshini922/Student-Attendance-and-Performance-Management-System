import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ViewMarks.css";

function ViewMarks() {

    const navigate = useNavigate();

    // ======================================================
    // STATE
    // ======================================================

    const [marks, setMarks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // ======================================================
    // GET ALL PERFORMANCE RECORDS
    // ======================================================

    const loadMarks = async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const response = await fetch(
                "http://localhost:8080/performance"
            );

            if (!response.ok) {
                throw new Error("Failed to load marks");
            }

            const data = await response.json();

            setMarks(
                Array.isArray(data) ? data : []
            );

        } catch (err) {

            console.error(
                "Performance API Error:",
                err
            );

            setError(
                "Unable to load performance records. Please make sure the backend is running."
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

        loadMarks();

    }, []);


    // ======================================================
    // DELETE MARKS
    // ======================================================

    const deleteMarks = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this mark?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            setMessage("");
            setError("");

            const response = await fetch(
                `http://localhost:8080/performance/${id}`,
                {
                    method: "DELETE"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to delete marks"
                );

            }


            setMessage(
                "Marks deleted successfully."
            );


            await loadMarks(true);


        } catch (err) {

            console.error(
                "Delete Marks Error:",
                err
            );

            setError(
                "Unable to delete marks. Please try again."
            );

        }

    };


    // ======================================================
    // SEARCH
    // ======================================================

    const filteredMarks = marks.filter((item) => {

        const search =
            searchTerm.toLowerCase();


        return (

            String(item.performanceId || "")
                .toLowerCase()
                .includes(search)

            ||

            String(item.studentId || "")
                .toLowerCase()
                .includes(search)

            ||

            String(item.subjectId || "")
                .toLowerCase()
                .includes(search)

            ||

            (item.exam || "")
                .toLowerCase()
                .includes(search)

        );

    });


    // ======================================================
    // STATISTICS
    // ======================================================

    const totalMarks = marks.length;

    const totalStudents = new Set(
        marks
            .map(item => item.studentId)
            .filter(Boolean)
    ).size;


    const totalSubjects = new Set(
        marks
            .map(item => item.subjectId)
            .filter(Boolean)
    ).size;


    const averageMarks = marks.length > 0
        ? (
            marks.reduce(
                (total, item) =>
                    total + Number(item.marks || 0),
                0
            ) / marks.length
        ).toFixed(2)
        : "0.00";


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="marks-loading">

                <div className="marks-spinner"></div>

                <h2>
                    Loading Performance Management
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

        <div className="marks-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="marks-header">

                <div>

                    <button
                        className="marks-back-button"
                        onClick={() => navigate("/admin")}
                    >
                        ← Back to Dashboard
                    </button>


                    <h1>
                        Performance Management
                    </h1>


                    <p>
                        Manage student marks and performance records
                    </p>

                </div>


                <Link
                    to="/performance/add"
                    className="add-marks-button"
                >
                    ➕ Add Marks
                </Link>

            </header>


            {/* ==================================================
                MESSAGES
            ================================================== */}

            {message && (

                <div className="marks-success">
                    ✅ {message}
                </div>

            )}


            {error && (

                <div className="marks-error">
                    ⚠️ {error}
                </div>

            )}


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <section className="marks-statistics">


                {/* TOTAL RECORDS */}

                <div className="marks-stat-card">

                    <div className="marks-stat-icon">
                        📊
                    </div>

                    <div>

                        <span>
                            Total Records
                        </span>

                        <strong>
                            {totalMarks}
                        </strong>

                    </div>

                </div>


                {/* STUDENTS */}

                <div className="marks-stat-card">

                    <div className="marks-stat-icon">
                        🎓
                    </div>

                    <div>

                        <span>
                            Students
                        </span>

                        <strong>
                            {totalStudents}
                        </strong>

                    </div>

                </div>


                {/* SUBJECTS */}

                <div className="marks-stat-card">

                    <div className="marks-stat-icon">
                        📚
                    </div>

                    <div>

                        <span>
                            Subjects
                        </span>

                        <strong>
                            {totalSubjects}
                        </strong>

                    </div>

                </div>


                {/* AVERAGE */}

                <div className="marks-stat-card">

                    <div className="marks-stat-icon">
                        ⭐
                    </div>

                    <div>

                        <span>
                            Average Marks
                        </span>

                        <strong>
                            {averageMarks}
                        </strong>

                    </div>

                </div>

            </section>


            {/* ==================================================
                SEARCH + REFRESH
            ================================================== */}

            <section className="marks-toolbar">


                <div className="marks-search">

                    <span>
                        🔍
                    </span>


                    <input
                        type="text"
                        placeholder="Search by student ID, subject ID or exam..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                    />

                </div>


                <button
                    className="refresh-marks-button"
                    onClick={() =>
                        loadMarks(true)
                    }
                    disabled={refreshing}
                >

                    {refreshing
                        ? "Refreshing..."
                        : "↻ Refresh"}

                </button>

            </section>


            {/* ==================================================
                MARKS TABLE
            ================================================== */}

            <section className="marks-table-container">


                <div className="marks-table-header">

                    <div>

                        <h2>
                            All Performance Records
                        </h2>

                        <p>

                            {filteredMarks.length} record
                            {filteredMarks.length !== 1
                                ? "s"
                                : ""}{" "}
                            found

                        </p>

                    </div>

                </div>


                {filteredMarks.length > 0 ? (

                    <div className="marks-table-wrapper">

                        <table className="marks-table">

                            <thead>

                                <tr>

                                    <th>
                                        Performance ID
                                    </th>

                                    <th>
                                        Student ID
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

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredMarks.map(
                                    (item) => (

                                        <tr
                                            key={
                                                item.performanceId
                                            }
                                        >


                                            {/* PERFORMANCE ID */}

                                            <td>

                                                <span className="performance-id">

                                                    #
                                                    {item.performanceId}

                                                </span>

                                            </td>


                                            {/* STUDENT ID */}

                                            <td>

                                                <span className="student-id-badge">

                                                    🎓 Student{" "}
                                                    {item.studentId}

                                                </span>

                                            </td>


                                            {/* SUBJECT ID */}

                                            <td>

                                                <span className="subject-id-badge">

                                                    📚 Subject{" "}
                                                    {item.subjectId}

                                                </span>

                                            </td>


                                            {/* EXAM */}

                                            <td>

                                                <div className="exam-name">

                                                    <span className="exam-icon">
                                                        📝
                                                    </span>

                                                    <strong>
                                                        {
                                                            item.exam ||
                                                            "N/A"
                                                        }
                                                    </strong>

                                                </div>

                                            </td>


                                            {/* MARKS */}

                                            <td>

                                                <span
                                                    className={
                                                        Number(item.marks) >= 50
                                                            ? "marks-badge marks-pass"
                                                            : "marks-badge marks-fail"
                                                    }
                                                >

                                                    {item.marks}

                                                </span>

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="marks-actions">


                                                    <Link
                                                        className="edit-marks-button"
                                                        to={`/performance/update/${item.performanceId}`}
                                                    >
                                                        ✏️ Edit
                                                    </Link>


                                                    <button
                                                        className="delete-marks-button"
                                                        onClick={() =>
                                                            deleteMarks(
                                                                item.performanceId
                                                            )
                                                        }
                                                    >
                                                        🗑️ Delete
                                                    </button>


                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="marks-empty">

                        <div>
                            📊
                        </div>


                        <h3>
                            No performance records found
                        </h3>


                        <p>

                            {searchTerm
                                ? "Try a different search term."
                                : "No student performance records have been added yet."}

                        </p>


                        {!searchTerm && (

                            <Link
                                to="/performance/add"
                            >
                                ➕ Add First Marks
                            </Link>

                        )}

                    </div>

                )}

            </section>

        </div>

    );

}

export default ViewMarks;