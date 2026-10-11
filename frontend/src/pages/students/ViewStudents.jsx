
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewStudents.css";

function ViewStudents() {

    const navigate = useNavigate();

    // ======================================================
    // STATE
    // ======================================================

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingStudent, setEditingStudent] = useState(null);

    const [formData, setFormData] = useState({
        rollNumber: "",
        name: "",
        email: "",
        phone: "",
        className: "",
        section: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // ======================================================
    // GET ALL STUDENTS
    // ======================================================

    const fetchStudents = async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const response = await fetch(
                "https://student-attendance-and-performance.onrender.com/students"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }

            const data = await response.json();

            setStudents(
                Array.isArray(data) ? data : []
            );

        } catch (err) {

            console.error(
                "Student API Error:",
                err
            );

            setError(
                "Unable to load students. Please make sure the backend is running."
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

        fetchStudents();

    }, []);


    // ======================================================
    // FORM INPUT CHANGE
    // ======================================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    };


    // ======================================================
    // OPEN ADD FORM
    // ======================================================

    const openAddForm = () => {

        setEditingStudent(null);

        setFormData({
            rollNumber: "",
            name: "",
            email: "",
            phone: "",
            className: "",
            section: ""
        });

        setMessage("");
        setError("");

        setShowForm(true);

    };


    // ======================================================
    // OPEN EDIT FORM
    // ======================================================

    const openEditForm = (student) => {

        setEditingStudent(student);

        setFormData({
            rollNumber: student.rollNumber || "",
            name: student.name || "",
            email: student.email || "",
            phone: student.phone || "",
            className: student.className || "",
            section: student.section || ""
        });

        setMessage("");
        setError("");

        setShowForm(true);

    };


    // ======================================================
    // CLOSE FORM
    // ======================================================

    const closeForm = () => {

        setShowForm(false);

        setEditingStudent(null);

        setFormData({
            rollNumber: "",
            name: "",
            email: "",
            phone: "",
            className: "",
            section: ""
        });

        setMessage("");
        setError("");

    };


    // ======================================================
    // ADD / UPDATE STUDENT
    // ======================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");


        // ==================================================
        // VALIDATION
        // ==================================================

        if (
            !formData.rollNumber.trim() ||
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.className.trim() ||
            !formData.section.trim()
        ) {

            setError(
                "Please fill in all student details."
            );

            return;

        }


        try {

            let response;


            // ==================================================
            // UPDATE STUDENT
            // ==================================================

            if (editingStudent) {

                response = await fetch(
                    `https://student-attendance-and-performance.onrender.com/students/${editingStudent.studentId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(formData)
                    }
                );

            }


            // ==================================================
            // ADD STUDENT
            // ==================================================

            else {

                response = await fetch(
                    "https://student-attendance-and-performance.onrender.com/students",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(formData)
                    }
                );

            }


            if (!response.ok) {

                throw new Error(
                    "Student operation failed"
                );

            }


            // ==================================================
            // SUCCESS MESSAGE
            // ==================================================

            if (editingStudent) {

                setMessage(
                    "Student updated successfully."
                );

            } else {

                setMessage(
                    "Student added successfully."
                );

            }


            await fetchStudents(true);


            setTimeout(() => {

                closeForm();

            }, 700);


        } catch (err) {

            console.error(
                "Student Save Error:",
                err
            );

            setError(
                "Unable to save student. Please try again."
            );

        }

    };


    // ======================================================
    // DELETE STUDENT
    // ======================================================

    const deleteStudent = async (studentId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            setError("");
            setMessage("");


            const response = await fetch(
                `https://student-attendance-and-performance.onrender.com/students/${studentId}`,
                {
                    method: "DELETE"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Delete student failed"
                );

            }


            setMessage(
                "Student deleted successfully."
            );


            await fetchStudents(true);


        } catch (err) {

            console.error(
                "Student Delete Error:",
                err
            );

            setError(
                "Unable to delete student."
            );

        }

    };


    // ======================================================
    // SEARCH
    // ======================================================

    const filteredStudents = students.filter((student) => {

        const search = searchTerm
            .toLowerCase()
            .trim();

        return (

            (student.rollNumber || "")
                .toString()
                .toLowerCase()
                .includes(search)

            ||

            (student.name || "")
                .toLowerCase()
                .includes(search)

            ||

            (student.email || "")
                .toLowerCase()
                .includes(search)

            ||

            (student.phone || "")
                .toString()
                .toLowerCase()
                .includes(search)

            ||

            (student.className || "")
                .toLowerCase()
                .includes(search)

            ||

            (student.section || "")
                .toLowerCase()
                .includes(search)

        );

    });


    // ======================================================
    // LOADING SCREEN
    // ======================================================

    if (loading) {

        return (

            <div className="student-loading">

                <div className="student-spinner"></div>

                <h2>
                    Loading Student Management
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

        <div className="student-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="student-header">

                <div>

                    <button
                        className="back-button"
                        onClick={() => navigate("/admin")}
                    >
                        ← Back to Dashboard
                    </button>

                    <h1>
                        Student Management
                    </h1>

                    <p>
                        Manage students and their information
                    </p>

                </div>


                <button
                    className="add-student-button"
                    onClick={openAddForm}
                >
                    ➕ Add Student
                </button>

            </header>


            {/* ==================================================
                MESSAGES
            ================================================== */}

            {message && (

                <div className="student-success">
                    ✅ {message}
                </div>

            )}


            {error && (

                <div className="student-error">
                    ⚠️ {error}
                </div>

            )}


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <section className="student-statistics">


                {/* TOTAL STUDENTS */}

                <div className="student-stat-card">

                    <div className="student-stat-icon">
                        🎓
                    </div>

                    <div>

                        <span>
                            Total Students
                        </span>

                        <strong>
                            {students.length}
                        </strong>

                    </div>

                </div>


                {/* TOTAL CLASSES */}

                <div className="student-stat-card">

                    <div className="student-stat-icon">
                        🏫
                    </div>

                    <div>

                        <span>
                            Classes
                        </span>

                        <strong>

                            {
                                new Set(
                                    students
                                        .map(
                                            student =>
                                                student.className
                                        )
                                        .filter(Boolean)
                                ).size
                            }

                        </strong>

                    </div>

                </div>


                {/* SEARCH RESULTS */}

                <div className="student-stat-card">

                    <div className="student-stat-icon">
                        🔎
                    </div>

                    <div>

                        <span>
                            Search Results
                        </span>

                        <strong>
                            {filteredStudents.length}
                        </strong>

                    </div>

                </div>


            </section>


            {/* ==================================================
                SEARCH + REFRESH
            ================================================== */}

            <section className="student-toolbar">


                <div className="student-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search by roll number, name, email, phone or class..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                    />

                </div>


                <button
                    className="refresh-student-button"
                    onClick={() =>
                        fetchStudents(true)
                    }
                    disabled={refreshing}
                >

                    {refreshing
                        ? "Refreshing..."
                        : "↻ Refresh"}

                </button>

            </section>


            {/* ==================================================
                STUDENT TABLE
            ================================================== */}

            <section className="student-table-container">


                <div className="student-table-header">

                    <div>

                        <h2>
                            All Students
                        </h2>

                        <p>

                            {filteredStudents.length} student
                            {filteredStudents.length !== 1
                                ? "s"
                                : ""}{" "}
                            found

                        </p>

                    </div>

                </div>


                {filteredStudents.length > 0 ? (

                    <div className="student-table-wrapper">

                        <table className="student-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Roll Number
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Class
                                    </th>

                                    <th>
                                        Section
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredStudents.map(
                                    (student) => (

                                        <tr
                                            key={
                                                student.studentId
                                            }
                                        >


                                            {/* ID */}

                                            <td>

                                                <span className="student-id">

                                                    #
                                                    {student.studentId}

                                                </span>

                                            </td>


                                            {/* ROLL NUMBER */}

                                            <td>

                                                <span className="roll-number-badge">

                                                    {
                                                        student.rollNumber ||
                                                        "N/A"
                                                    }

                                                </span>

                                            </td>


                                            {/* NAME */}

                                            <td>

                                                <div className="student-name">

                                                    <div className="student-avatar">

                                                        {
                                                            student.name
                                                                ? student.name
                                                                    .charAt(0)
                                                                    .toUpperCase()
                                                                : "S"
                                                        }

                                                    </div>

                                                    <strong>

                                                        {
                                                            student.name ||
                                                            "N/A"
                                                        }

                                                    </strong>

                                                </div>

                                            </td>


                                            {/* EMAIL */}

                                            <td>

                                                <span>

                                                    {
                                                        student.email ||
                                                        "N/A"
                                                    }

                                                </span>

                                            </td>


                                            {/* PHONE */}

                                            <td>

                                                <span>

                                                    {
                                                        student.phone ||
                                                        "N/A"
                                                    }

                                                </span>

                                            </td>


                                            {/* CLASS */}

                                            <td>

                                                <span className="class-badge">

                                                    {
                                                        student.className ||
                                                        "N/A"
                                                    }

                                                </span>

                                            </td>


                                            {/* SECTION */}

                                            <td>

                                                <span className="section-badge">

                                                    {
                                                        student.section ||
                                                        "N/A"
                                                    }

                                                </span>

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="student-actions">

                                                    <button
                                                        className="edit-student-button"
                                                        onClick={() =>
                                                            openEditForm(
                                                                student
                                                            )
                                                        }
                                                    >
                                                        ✏️ Edit
                                                    </button>


                                                    <button
                                                        className="delete-student-button"
                                                        onClick={() =>
                                                            deleteStudent(
                                                                student.studentId
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

                    <div className="student-empty">

                        <div>
                            🎓
                        </div>

                        <h3>
                            No students found
                        </h3>

                        <p>

                            {searchTerm
                                ? "Try a different search term."
                                : "No students have been registered yet."}

                        </p>


                        {!searchTerm && (

                            <button
                                onClick={openAddForm}
                            >
                                ➕ Add First Student
                            </button>

                        )}

                    </div>

                )}

            </section>


            {/* ==================================================
                ADD / EDIT MODAL
            ================================================== */}

            {showForm && (

                <div className="student-modal-overlay">

                    <div className="student-modal">


                        {/* MODAL HEADER */}

                        <div className="student-modal-header">

                            <div>

                                <span>

                                    {editingStudent
                                        ? "UPDATE STUDENT"
                                        : "NEW STUDENT"}

                                </span>

                                <h2>

                                    {editingStudent
                                        ? "Edit Student"
                                        : "Add Student"}

                                </h2>

                            </div>


                            <button
                                className="close-modal-button"
                                onClick={closeForm}
                            >
                                ✕
                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            className="student-form"
                            onSubmit={handleSubmit}
                        >


                            {/* ROLL NUMBER */}

                            <div className="form-group">

                                <label>
                                    Roll Number
                                </label>

                                <input
                                    type="text"
                                    name="rollNumber"
                                    placeholder="Enter roll number"
                                    value={
                                        formData.rollNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* NAME */}

                            <div className="form-group">

                                <label>
                                    Student Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter student name"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* PHONE */}

                            <div className="form-group">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* CLASS */}

                            <div className="form-group">

                                <label>
                                    Class
                                </label>

                                <input
                                    type="text"
                                    name="className"
                                    placeholder="Enter class"
                                    value={
                                        formData.className
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* SECTION */}

                            <div className="form-group">

                                <label>
                                    Section
                                </label>

                                <input
                                    type="text"
                                    name="section"
                                    placeholder="Enter section"
                                    value={
                                        formData.section
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* FORM ACTIONS */}

                            <div className="student-form-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={closeForm}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="save-student-button"
                                >

                                    {editingStudent
                                        ? "Update Student"
                                        : "Add Student"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

}

export default ViewStudents;

