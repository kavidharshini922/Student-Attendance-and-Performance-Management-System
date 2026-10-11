import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MarkAttendance.css";

function MarkAttendance() {

    const navigate = useNavigate();

    const [studentId, setStudentId] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("PRESENT");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);


    // ======================================================
    // MARK ATTENDANCE
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setSaving(true);


        try {

            const response = await fetch(
                "https://student-attendance-and-performance.onrender.com/attendance",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        studentId: Number(studentId),
                        date: date,
                        status: status,
                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to mark attendance."
                );

            }


            // ==================================================
            // SUCCESS
            // ==================================================

            console.log(
                "Saved attendance:",
                data
            );

            setMessage(
                "Attendance marked successfully!"
            );


            // Clear form

            setStudentId("");
            setDate("");
            setStatus("PRESENT");


        } catch (error) {

            console.error(
                "Attendance Error:",
                error
            );

            setError(
                error.message ||
                "Backend server is not working."
            );

        } finally {

            setSaving(false);

        }

    };


    // ======================================================
    // PAGE
    // ======================================================

    return (

        <div className="attendance-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="attendance-header">

                <div>

                    <button
                        className="attendance-back-button"
                        onClick={() => navigate("/admin")}
                    >
                        ← Back to Dashboard
                    </button>

                    <h1>
                        Mark Attendance
                    </h1>

                    <p>
                        Record attendance for a student
                    </p>

                </div>

            </header>


            {/* ==================================================
                SUCCESS MESSAGE
            ================================================== */}

            {message && (

                <div className="attendance-success">
                    ✅ {message}
                </div>

            )}


            {/* ==================================================
                ERROR MESSAGE
            ================================================== */}

            {error && (

                <div className="attendance-error">
                    ⚠️ {error}
                </div>

            )}


            {/* ==================================================
                FORM CARD
            ================================================== */}

            <section className="attendance-form-container">

                <div className="attendance-form-header">

                    <div className="attendance-form-icon">
                        📋
                    </div>

                    <div>

                        <h2>
                            Attendance Details
                        </h2>

                        <p>
                            Enter the student's attendance information
                        </p>

                    </div>

                </div>


                <form
                    className="attendance-form"
                    onSubmit={handleSubmit}
                >


                    {/* ==================================================
                        STUDENT ID
                    ================================================== */}

                    <div className="attendance-form-group">

                        <label>
                            Student ID
                        </label>

                        <input
                            type="number"
                            placeholder="Enter student ID"
                            value={studentId}
                            onChange={(e) =>
                                setStudentId(
                                    e.target.value
                                )
                            }
                            min="1"
                            required
                        />

                    </div>


                    {/* ==================================================
                        DATE
                    ================================================== */}

                    <div className="attendance-form-group">

                        <label>
                            Attendance Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* ==================================================
                        STATUS
                    ================================================== */}

                    <div className="attendance-form-group">

                        <label>
                            Attendance Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                        >

                            <option value="PRESENT">
                                PRESENT
                            </option>

                            <option value="ABSENT">
                                ABSENT
                            </option>

                        </select>

                    </div>


                    {/* ==================================================
                        ACTIONS
                    ================================================== */}

                    <div className="attendance-form-actions">

                        <button
                            type="button"
                            className="attendance-cancel-button"
                            onClick={() =>
                                navigate("/admin")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="attendance-submit-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "✓ Mark Attendance"}

                        </button>

                    </div>

                </form>

            </section>


        </div>

    );

}

export default MarkAttendance;