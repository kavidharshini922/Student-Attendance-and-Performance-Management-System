import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateMarks() {
    const { id } = useParams();

    const [studentId, setStudentId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [exam, setExam] = useState("");
    const [marks, setMarks] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // Load existing marks
    useEffect(() => {
        if (!id) {
            setMessage("Performance ID is missing.");
            setLoading(false);
            return;
        }

        fetch(`https://student-attendance-and-performance.onrender.com/performance/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load performance");
                }

                return response.json();
            })
            .then((data) => {
                setStudentId(data.studentId);
                setSubjectId(data.subjectId);
                setExam(data.exam);
                setMarks(data.marks);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setMessage("Failed to load marks.");
                setLoading(false);
            });
    }, [id]);

    // Update marks
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            const response = await fetch(
                `https://student-attendance-and-performance.onrender.com/performance/${id}`,
                {
                    method: "PUT",
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

            if (response.ok) {
                setMessage("Marks updated successfully!");
            } else {
                setMessage("Failed to update marks.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Backend server is not working.");
        }
    };

    if (loading) {
        return <h2>Loading marks...</h2>;
    }

    return (
        <div>
            <h2>Update Marks</h2>

            <p>
                Performance ID: <strong>{id}</strong>
            </p>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Student ID: </label>

                    <input
                        type="number"
                        value={studentId}
                        onChange={(e) =>
                            setStudentId(e.target.value)
                        }
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Subject ID: </label>

                    <input
                        type="number"
                        value={subjectId}
                        onChange={(e) =>
                            setSubjectId(e.target.value)
                        }
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Exam: </label>

                    <input
                        type="text"
                        value={exam}
                        onChange={(e) =>
                            setExam(e.target.value)
                        }
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Marks: </label>

                    <input
                        type="number"
                        value={marks}
                        onChange={(e) =>
                            setMarks(e.target.value)
                        }
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Update Marks
                </button>

            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdateMarks;