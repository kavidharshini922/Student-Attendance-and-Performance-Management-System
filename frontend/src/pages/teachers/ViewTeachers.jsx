import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewTeachers() {

    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ======================================================
    // Load Teachers
    // ======================================================

    const loadTeachers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "https://student-attendance-and-performance.onrender.com/teachers"
            );

            if (!response.ok) {
                throw new Error("Failed to load teachers");
            }

            const data = await response.json();

            setTeachers(
                Array.isArray(data) ? data : []
            );

        }
        catch (err) {

            console.error("Teacher API Error:", err);

            setError(
                "Unable to load teachers. Please make sure the backend is running."
            );

        }
        finally {

            setLoading(false);

        }

    };


    // ======================================================
    // Initial Load
    // ======================================================

    useEffect(() => {

        loadTeachers();

    }, []);


    // ======================================================
    // Delete Teacher
    // ======================================================

    const deleteTeacher = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this teacher?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `https://student-attendance-and-performance.onrender.com/teachers/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete teacher");
            }

            // Remove deleted teacher from screen
            setTeachers(
                teachers.filter(
                    teacher => teacher.teacherId !== id
                )
            );

            alert("Teacher deleted successfully!");

        }
        catch (err) {

            console.error(
                "Delete Teacher Error:",
                err
            );

            alert(
                "Unable to delete teacher."
            );

        }

    };


    // ======================================================
    // Search Filter
    // ======================================================

    const filteredTeachers = teachers.filter(
        teacher =>
            teacher.name
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            teacher.email
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            teacher.subject
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            teacher.phone
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );


    // ======================================================
    // Loading
    // ======================================================

    if (loading) {

        return (

            <div style={styles.loadingContainer}>

                <h2>
                    Loading Teachers...
                </h2>

            </div>

        );

    }


    // ======================================================
    // Page
    // ======================================================

    return (

        <div style={styles.page}>


            {/* ==================================================
                HEADER
            ================================================== */}

            <div style={styles.header}>

                <div>

                    <h1 style={styles.title}>
                        Teacher Management
                    </h1>

                    <p style={styles.subtitle}>
                        Manage teachers and their information
                    </p>

                </div>


                <button
                    style={styles.addButton}
                    onClick={() =>
                        navigate("/teachers/add")
                    }
                >
                    + Add Teacher
                </button>

            </div>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

                <div style={styles.error}>
                    ⚠️ {error}
                </div>

            )}


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div style={styles.statsContainer}>

                <div style={styles.statCard}>

                    <div style={styles.statIcon}>
                        👨‍🏫
                    </div>

                    <div>

                        <p style={styles.statLabel}>
                            Total Teachers
                        </p>

                        <h2 style={styles.statNumber}>
                            {teachers.length}
                        </h2>

                    </div>

                </div>

            </div>


            {/* ==================================================
                SEARCH
            ================================================== */}

            <div style={styles.searchContainer}>

                <span style={styles.searchIcon}>
                    🔍
                </span>

                <input
                    type="text"
                    placeholder="Search by name, email, subject or phone..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    style={styles.searchInput}
                />

            </div>


            {/* ==================================================
                TEACHER TABLE
            ================================================== */}

            <div style={styles.tableContainer}>

                <div style={styles.tableHeader}>

                    <h2 style={styles.tableTitle}>
                        All Teachers
                    </h2>

                    <span style={styles.resultCount}>
                        {filteredTeachers.length} teacher
                        {filteredTeachers.length !== 1
                            ? "s"
                            : ""}
                    </span>

                </div>


                {filteredTeachers.length === 0 ? (

                    <div style={styles.empty}>

                        <div style={styles.emptyIcon}>
                            👨‍🏫
                        </div>

                        <h3>
                            No teachers found
                        </h3>

                        <p>
                            {search
                                ? "Try a different search."
                                : "No teachers have been registered yet."}
                        </p>


                        {!search && (

                            <button
                                style={styles.addButton}
                                onClick={() =>
                                    navigate("/teachers/add")
                                }
                            >
                                + Add First Teacher
                            </button>

                        )}

                    </div>

                ) : (

                    <div style={styles.tableWrapper}>

                        <table style={styles.table}>

                            <thead>

                                <tr>

                                    <th style={styles.th}>
                                        ID
                                    </th>

                                    <th style={styles.th}>
                                        Teacher
                                    </th>

                                    <th style={styles.th}>
                                        Email
                                    </th>

                                    <th style={styles.th}>
                                        Phone
                                    </th>

                                    <th style={styles.th}>
                                        Subject
                                    </th>

                                    <th style={styles.th}>
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

                                            <td style={styles.td}>

                                                <strong>
                                                    #
                                                    {
                                                        teacher.teacherId
                                                    }
                                                </strong>

                                            </td>


                                            <td style={styles.td}>

                                                <div
                                                    style={
                                                        styles.teacherInfo
                                                    }
                                                >

                                                    <div
                                                        style={
                                                            styles.avatar
                                                        }
                                                    >
                                                        {teacher.name
                                                            ?.charAt(
                                                                0
                                                            )
                                                            .toUpperCase()}
                                                    </div>

                                                    <strong>
                                                        {
                                                            teacher.name
                                                        }
                                                    </strong>

                                                </div>

                                            </td>


                                            <td style={styles.td}>
                                                {
                                                    teacher.email
                                                }
                                            </td>


                                            <td style={styles.td}>
                                                {
                                                    teacher.phone
                                                }
                                            </td>


                                            <td style={styles.td}>

                                                <span
                                                    style={
                                                        styles.subject
                                                    }
                                                >
                                                    {
                                                        teacher.subject
                                                    }
                                                </span>

                                            </td>


                                            <td style={styles.td}>

                                                <div
                                                    style={
                                                        styles.actions
                                                    }
                                                >

                                                    <button
                                                        style={
                                                            styles.editButton
                                                        }
                                                        onClick={() =>
                                                            navigate(
                                                                `/teachers/edit/${teacher.teacherId}`
                                                            )
                                                        }
                                                    >
                                                        ✏️ Edit
                                                    </button>


                                                    <button
                                                        style={
                                                            styles.deleteButton
                                                        }
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

                )}

            </div>


            {/* ==================================================
                BACK BUTTON
            ================================================== */}

            <button
                style={styles.backButton}
                onClick={() =>
                    navigate("/admin")
                }
            >
                ← Back to Admin Dashboard
            </button>

        </div>

    );

}


// ======================================================
// Styles
// ======================================================

const styles = {

    page: {
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif"
    },

    loadingContainer: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
    },

    title: {
        margin: 0,
        fontSize: "32px",
        color: "#1f2937"
    },

    subtitle: {
        marginTop: "8px",
        color: "#6b7280",
        fontSize: "15px"
    },

    addButton: {
        border: "none",
        background: "#2563eb",
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "600"
    },

    error: {
        background: "#fee2e2",
        color: "#991b1b",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px"
    },

    statsContainer: {
        display: "flex",
        gap: "20px",
        marginBottom: "25px"
    },

    statCard: {
        background: "white",
        borderRadius: "12px",
        padding: "20px 25px",
        display: "flex",
        alignItems: "center",
        gap: "18px",
        minWidth: "230px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
    },

    statIcon: {
        fontSize: "32px"
    },

    statLabel: {
        margin: 0,
        color: "#6b7280",
        fontSize: "14px"
    },

    statNumber: {
        margin: "5px 0 0",
        fontSize: "28px",
        color: "#111827"
    },

    searchContainer: {
        background: "white",
        padding: "15px 20px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "25px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    },

    searchIcon: {
        fontSize: "18px"
    },

    searchInput: {
        width: "100%",
        border: "none",
        outline: "none",
        fontSize: "15px"
    },

    tableContainer: {
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        overflow: "hidden"
    },

    tableHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 25px",
        borderBottom: "1px solid #e5e7eb"
    },

    tableTitle: {
        margin: 0,
        fontSize: "20px",
        color: "#1f2937"
    },

    resultCount: {
        color: "#6b7280",
        fontSize: "14px"
    },

    tableWrapper: {
        overflowX: "auto"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    th: {
        textAlign: "left",
        padding: "15px 20px",
        background: "#f9fafb",
        color: "#4b5563",
        fontSize: "13px",
        borderBottom: "1px solid #e5e7eb"
    },

    td: {
        padding: "16px 20px",
        borderBottom: "1px solid #f0f0f0",
        color: "#374151",
        fontSize: "14px"
    },

    teacherInfo: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },

    avatar: {
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        background: "#dbeafe",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#1d4ed8",
        fontWeight: "bold"
    },

    subject: {
        background: "#eef2ff",
        color: "#4338ca",
        padding: "5px 10px",
        borderRadius: "15px",
        fontSize: "12px",
        fontWeight: "600"
    },

    actions: {
        display: "flex",
        gap: "8px"
    },

    editButton: {
        border: "none",
        background: "#fef3c7",
        color: "#92400e",
        padding: "7px 10px",
        borderRadius: "6px",
        cursor: "pointer"
    },

    deleteButton: {
        border: "none",
        background: "#fee2e2",
        color: "#b91c1c",
        padding: "7px 10px",
        borderRadius: "6px",
        cursor: "pointer"
    },

    empty: {
        textAlign: "center",
        padding: "60px 20px",
        color: "#6b7280"
    },

    emptyIcon: {
        fontSize: "50px",
        marginBottom: "10px"
    },

    backButton: {
        marginTop: "25px",
        border: "none",
        background: "transparent",
        color: "#2563eb",
        cursor: "pointer",
        fontSize: "14px"
    }

};

export default ViewTeachers;