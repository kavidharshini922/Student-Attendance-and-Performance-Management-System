import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AttendancePercentage.css";

function AttendancePercentage() {

    const navigate = useNavigate();

    const [studentId, setStudentId] = useState("");
    const [percentage, setPercentage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // ======================================================
    // GET ATTENDANCE PERCENTAGE
    // ======================================================

    const getPercentage = async (e) => {

        e.preventDefault();

        setPercentage(null);
        setMessage("");
        setError("");
        setLoading(true);


        try {

            const response = await fetch(
                `https://student-attendance-and-performance.onrender.com/attendance/student/${studentId}/percentage`
            );


            if (!response.ok) {
                throw new Error(
                    "Failed to get percentage"
                );
            }


            const data = await response.json();


            setPercentage(
                Number(data)
            );


            setMessage(
                "Attendance percentage loaded successfully."
            );


        } catch (error) {

            console.error(
                "Attendance Percentage Error:",
                error
            );

            setError(
                "Failed to load attendance percentage. Please check the Student ID."
            );

        } finally {

            setLoading(false);

        }

    };


    // ======================================================
    // PAGE
    // ======================================================

    return (

        <div className="percentage-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="percentage-header">

                <div>

                    <button
                        className="percentage-back-button"
                        onClick={() => navigate("/admin")}
                    >
                        ← Back to Dashboard
                    </button>


                    <h1>
                        Attendance Percentage
                    </h1>


                    <p>
                        Check the attendance percentage of a student
                    </p>

                </div>

            </header>


            {/* ==================================================
                MAIN CONTENT
            ================================================== */}

            <div className="percentage-content">


                {/* ==================================================
                    SEARCH CARD
                ================================================== */}

                <section className="percentage-card">

                    <div className="percentage-card-icon">
                        📊
                    </div>


                    <h2>
                        Check Student Attendance
                    </h2>


                    <p>
                        Enter the Student ID to view the attendance percentage.
                    </p>


                    <form
                        className="percentage-form"
                        onSubmit={getPercentage}
                    >

                        <div className="percentage-input-group">

                            <label>
                                Student ID
                            </label>


                            <input
                                type="number"
                                value={studentId}
                                onChange={(e) =>
                                    setStudentId(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter Student ID"
                                min="1"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="check-percentage-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Checking..."
                                : "🔍 Check Percentage"}

                        </button>

                    </form>

                </section>


                {/* ==================================================
                    SUCCESS MESSAGE
                ================================================== */}

                {message && (

                    <div className="percentage-success">
                        ✅ {message}
                    </div>

                )}


                {/* ==================================================
                    ERROR MESSAGE
                ================================================== */}

                {error && (

                    <div className="percentage-error">
                        ⚠️ {error}
                    </div>

                )}


                {/* ==================================================
                    RESULT
                ================================================== */}

                {percentage !== null && (

                    <section className="percentage-result">

                        <div className="result-icon">
                            🎓
                        </div>


                        <div className="result-details">

                            <span>
                                Attendance Percentage
                            </span>


                            <strong>
                                {percentage.toFixed(2)}%
                            </strong>


                            <p>
                                Student ID:{" "}
                                <b>
                                    {studentId}
                                </b>
                            </p>

                        </div>


                        <div className="percentage-progress">

                            <div
                                className="percentage-progress-bar"
                                style={{
                                    width: `${Math.min(
                                        Math.max(
                                            percentage,
                                            0
                                        ),
                                        100
                                    )}%`
                                }}
                            ></div>

                        </div>

                    </section>

                )}

            </div>

        </div>

    );

}

export default AttendancePercentage;