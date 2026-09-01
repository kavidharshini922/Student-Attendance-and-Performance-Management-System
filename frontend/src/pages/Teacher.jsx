
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Teacher.css";

function Teacher() {

    const navigate = useNavigate();

    // ======================================================
    // STATE
    // ======================================================

    const [teachers, setTeachers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingTeacher, setEditingTeacher] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // ======================================================
    // GET ALL TEACHERS
    // ======================================================

    const fetchTeachers = async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const response = await fetch(
                "http://localhost:8080/teachers"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch teachers");
            }

            const data = await response.json();

            setTeachers(
                Array.isArray(data) ? data : []
            );

        } catch (err) {

            console.error("Teacher API Error:", err);

            setError(
                "Unable to load teachers. Please make sure the backend is running."
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

        fetchTeachers();

    }, []);


    // ======================================================
    // FORM INPUT CHANGE
    // ======================================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // ======================================================
    // OPEN ADD FORM
    // ======================================================

    const openAddForm = () => {

        setEditingTeacher(null);

        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: ""
        });

        setMessage("");
        setError("");

        setShowForm(true);

    };


    // ======================================================
    // OPEN EDIT FORM
    // ======================================================

    const openEditForm = (teacher) => {

        setEditingTeacher(teacher);

        setFormData({
            name: teacher.name || "",
            email: teacher.email || "",
            phone: teacher.phone || "",
            subject: teacher.subject || ""
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
        setEditingTeacher(null);

        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: ""
        });

        setMessage("");
        setError("");

    };


    // ======================================================
    // ADD / UPDATE TEACHER
    // ======================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");


        // ==================================================
        // VALIDATION
        // ==================================================

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.subject.trim()
        ) {

            setError(
                "Please fill in all teacher details."
            );

            return;

        }


        try {

            let response;


            // ==================================================
            // UPDATE
            // ==================================================

            if (editingTeacher) {

                response = await fetch(
                    `http://localhost:8080/teachers/${editingTeacher.teacherId}`,
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
            // ADD
            // ==================================================

            else {

                response = await fetch(
                    "http://localhost:8080/teachers",
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
                    "Teacher operation failed"
                );

            }


            // ==================================================
            // SUCCESS
            // ==================================================

            if (editingTeacher) {

                setMessage(
                    "Teacher updated successfully."
                );

            } else {

                setMessage(
                    "Teacher added successfully."
                );

            }


            await fetchTeachers(true);


            setTimeout(() => {

                closeForm();

            }, 700);


        } catch (err) {

            console.error(
                "Teacher Save Error:",
                err
            );

            setError(
                "Unable to save teacher. Please try again."
            );

        }

    };


    // ======================================================
    // DELETE TEACHER
    // ======================================================

    const deleteTeacher = async (teacherId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this teacher?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            setError("");
            setMessage("");


            const response = await fetch(
                `http://localhost:8080/teachers/${teacherId}`,
                {
                    method: "DELETE"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Delete teacher failed"
                );

            }


            setMessage(
                "Teacher deleted successfully."
            );


            await fetchTeachers(true);


        } catch (err) {

            console.error(
                "Teacher Delete Error:",
                err
            );

            setError(
                "Unable to delete teacher."
            );

        }

    };


    // ======================================================
    // SEARCH
    // ======================================================

    const filteredTeachers = teachers.filter((teacher) => {

        const search =
            searchTerm.toLowerCase();

        return (

            (teacher.name || "")
                .toLowerCase()
                .includes(search)

            ||

            (teacher.email || "")
                .toLowerCase()
                .includes(search)

            ||

            (teacher.phone || "")
                .toLowerCase()
                .includes(search)

            ||

            (teacher.subject || "")
                .toLowerCase()
                .includes(search)

        );

    });


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="teacher-loading">

                <div className="teacher-spinner"></div>

                <h2>
                    Loading Teacher Management
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

        <div className="teacher-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="teacher-header">

                <div>

                    <button
                        className="back-button"
                        onClick={() => navigate("/admin")}
                    >
                        ← Back to Dashboard
                    </button>

                    <h1>
                        Teacher Management
                    </h1>

                    <p>
                        Manage teachers and their information
                    </p>

                </div>


                <button
                    className="add-teacher-button"
                    onClick={openAddForm}
                >
                    ➕ Add Teacher
                </button>

            </header>


            {/* ==================================================
                MESSAGES
            ================================================== */}

            {message && (

                <div className="teacher-success">
                    ✅ {message}
                </div>

            )}


            {error && (

                <div className="teacher-error">
                    ⚠️ {error}
                </div>

            )}


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <section className="teacher-statistics">

                <div className="teacher-stat-card">

                    <div className="teacher-stat-icon">
                        👨‍🏫
                    </div>

                    <div>

                        <span>
                            Total Teachers
                        </span>

                        <strong>
                            {teachers.length}
                        </strong>

                    </div>

                </div>


                <div className="teacher-stat-card">

                    <div className="teacher-stat-icon">
                        📚
                    </div>

                    <div>

                        <span>
                            Subjects
                        </span>

                        <strong>
                            {
                                new Set(
                                    teachers
                                        .map(
                                            teacher =>
                                                teacher.subject
                                        )
                                        .filter(Boolean)
                                ).size
                            }
                        </strong>

                    </div>

                </div>


                <div className="teacher-stat-card">

                    <div className="teacher-stat-icon">
                        🔎
                    </div>

                    <div>

                        <span>
                            Search Results
                        </span>

                        <strong>
                            {filteredTeachers.length}
                        </strong>

                    </div>

                </div>

            </section>


            {/* ==================================================
                SEARCH + REFRESH
            ================================================== */}

            <section className="teacher-toolbar">

                <div className="teacher-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search by name, email, phone or subject..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                    />

                </div>


                <button
                    className="refresh-teacher-button"
                    onClick={() =>
                        fetchTeachers(true)
                    }
                    disabled={refreshing}
                >

                    {refreshing
                        ? "Refreshing..."
                        : "↻ Refresh"}

                </button>

            </section>


            {/* ==================================================
                TEACHER TABLE
            ================================================== */}

            <section className="teacher-table-container">

                <div className="teacher-table-header">

                    <div>

                        <h2>
                            All Teachers
                        </h2>

                        <p>
                            {filteredTeachers.length} teacher
                            {filteredTeachers.length !== 1
                                ? "s"
                                : ""}{" "}
                            found
                        </p>

                    </div>

                </div>


                {filteredTeachers.length > 0 ? (

                    <div className="teacher-table-wrapper">

                        <table className="teacher-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Teacher
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredTeachers.map(
                                    (teacher) => (

                                        <tr
                                            key={
                                                teacher.teacherId
                                            }
                                        >

                                            <td>

                                                <span className="teacher-id">
                                                    #{teacher.teacherId}
                                                </span>

                                            </td>


                                            <td>

                                                <div className="teacher-name">

                                                    <div className="teacher-avatar">

                                                        {
                                                            teacher.name
                                                                ? teacher.name
                                                                    .charAt(0)
                                                                    .toUpperCase()
                                                                : "T"
                                                        }

                                                    </div>

                                                    <strong>
                                                        {
                                                            teacher.name ||
                                                            "N/A"
                                                        }
                                                    </strong>

                                                </div>

                                            </td>


                                            <td>

                                                <span>
                                                    {
                                                        teacher.email ||
                                                        "N/A"
                                                    }
                                                </span>

                                            </td>


                                            <td>

                                                <span>
                                                    {
                                                        teacher.phone ||
                                                        "N/A"
                                                    }
                                                </span>

                                            </td>


                                            <td>

                                                <span className="subject-badge">

                                                    {
                                                        teacher.subject ||
                                                        "N/A"
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <div className="teacher-actions">

                                                    <button
                                                        className="edit-teacher-button"
                                                        onClick={() =>
                                                            openEditForm(
                                                                teacher
                                                            )
                                                        }
                                                    >
                                                        ✏️ Edit
                                                    </button>


                                                    <button
                                                        className="delete-teacher-button"
                                                        onClick={() =>
                                                            deleteTeacher(
                                                                teacher.teacherId
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

                    <div className="teacher-empty">

                        <div>
                            👨‍🏫
                        </div>

                        <h3>
                            No teachers found
                        </h3>

                        <p>

                            {searchTerm
                                ? "Try a different search term."
                                : "No teachers have been registered yet."}

                        </p>


                        {!searchTerm && (

                            <button
                                onClick={openAddForm}
                            >
                                ➕ Add First Teacher
                            </button>

                        )}

                    </div>

                )}

            </section>


            {/* ==================================================
                ADD / EDIT MODAL
            ================================================== */}

            {showForm && (

                <div className="teacher-modal-overlay">

                    <div className="teacher-modal">

                        <div className="teacher-modal-header">

                            <div>

                                <span>
                                    {editingTeacher
                                        ? "UPDATE TEACHER"
                                        : "NEW TEACHER"}
                                </span>

                                <h2>

                                    {editingTeacher
                                        ? "Edit Teacher"
                                        : "Add Teacher"}

                                </h2>

                            </div>


                            <button
                                className="close-modal-button"
                                onClick={closeForm}
                            >
                                ✕
                            </button>

                        </div>


                        <form
                            className="teacher-form"
                            onSubmit={handleSubmit}
                        >


                            {/* NAME */}

                            <div className="form-group">

                                <label>
                                    Teacher Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter teacher name"
                                    value={formData.name}
                                    onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* SUBJECT */}

                            <div className="form-group">

                                <label>
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Enter subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* FORM ACTIONS */}

                            <div className="teacher-form-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={closeForm}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="save-teacher-button"
                                >

                                    {editingTeacher
                                        ? "Update Teacher"
                                        : "Add Teacher"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Teacher;

