
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddMarks.css";

function AddMarks() {

    const navigate = useNavigate();

    const [studentId, setStudentId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [exam, setExam] = useState("");
    const [marks, setMarks] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!studentId || !subjectId || !exam || !marks) {

            setError("Please fill in all the details.");
            return;

        }

        try {

            const response = await fetch(
                "https://student-attendance-and-performance.onrender.com/performance",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        studentId: Number(studentId),
                        subjectId: Number(subjectId),
                        exam: exam,
                        marks: Number(marks),
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {

                setMessage("Marks added successfully!");

                console.log(
                    "Saved performance:",
                    data
                );

                setStudentId("");
                setSubjectId("");
                setExam("");
                setMarks("");

            } else {

                setError(
                    data.message ||
                    "Failed to add marks."
                );

            }

        } catch (error) {

            console.error(
                "Connection error:",
                error
            );

            setError(
                "Backend server is not working."
            );

        }
    };


    return (

        <div className="add-marks-page">

            {/* HEADER */}

            <header className="add-marks-header">

                <div>

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                    <h1>
                        Add Marks
                    </h1>

                    <p>
                        Add academic performance records for students
                    </p>

                </div>

            </header>


            {/* MESSAGE */}

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


            {/* FORM CARD */}

            <div className="marks-form-container">

                <div className="marks-form-header">

                    <div className="marks-icon">
                        📊
                    </div>

                    <div>

                        <h2>
                            Enter Student Marks
                        </h2>

                        <p>
                            Provide the student's examination details below
                        </p>

                    </div>

                </div>


                <form
                    className="marks-form"
                    onSubmit={handleSubmit}
                >

                    {/* STUDENT ID */}

                    <div className="marks-form-group">

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
                            placeholder="Enter student ID"
                            required
                        />

                    </div>


                    {/* SUBJECT ID */}

                    <div className="marks-form-group">

                        <label>
                            Subject ID
                        </label>

                        <input
                            type="number"
                            value={subjectId}
                            onChange={(e) =>
                                setSubjectId(
                                    e.target.value
                                )
                            }
                            placeholder="Enter subject ID"
                            required
                        />

                    </div>


                    {/* EXAM */}

                    <div className="marks-form-group">

                        <label>
                            Examination
                        </label>

                        <input
                            type="text"
                            value={exam}
                            onChange={(e) =>
                                setExam(
                                    e.target.value
                                )
                            }
                            placeholder="Example: Unit Test 1"
                            required
                        />

                    </div>


                    {/* MARKS */}

                    <div className="marks-form-group">

                        <label>
                            Marks
                        </label>

                        <input
                            type="number"
                            value={marks}
                            onChange={(e) =>
                                setMarks(
                                    e.target.value
                                )
                            }
                            placeholder="Enter marks"
                            min="0"
                            required
                        />

                    </div>


                    {/* ACTIONS */}

                    <div className="marks-form-actions">

                        <button
                            type="button"
                            className="marks-cancel-button"
                            onClick={() =>
                                navigate("/performance")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="marks-save-button"
                        >
                            ➕ Add Marks
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddMarks;

