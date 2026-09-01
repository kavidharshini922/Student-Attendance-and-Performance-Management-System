
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentProfile.css";

function StudentProfile() {

    const navigate = useNavigate();

    const studentId = localStorage.getItem("studentId");

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ======================================================
    // FETCH STUDENT PROFILE
    // ======================================================

    useEffect(() => {

        setLoading(true);
        setError("");

        fetch("http://localhost:8080/students")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }

                return response.json();

            })
            .then(data => {

                const result = data.find(
                    item =>
                        Number(item.studentId) ===
                        Number(studentId)
                );

                setStudent(result);

            })
            .catch(error => {

                console.error(
                    "Student Profile API Error:",
                    error
                );

                setError(
                    "Unable to load your profile."
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

            <div className="profile-loading">

                <div className="profile-spinner"></div>

                <h2>
                    Loading Your Profile
                </h2>

                <p>
                    Please wait...
                </p>

            </div>

        );

    }


    // ======================================================
    // ERROR
    // ======================================================

    if (error) {

        return (

            <div className="profile-message-page">

                <div className="profile-message-card">

                    <div className="profile-message-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to Load Profile
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/student")}
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            </div>

        );

    }


    // ======================================================
    // PROFILE NOT FOUND
    // ======================================================

    if (!student) {

        return (

            <div className="profile-message-page">

                <div className="profile-message-card">

                    <div className="profile-message-icon">
                        👤
                    </div>

                    <h2>
                        Student Profile Not Found
                    </h2>

                    <p>
                        We couldn't find your student information.
                    </p>

                    <button
                        onClick={() => navigate("/student")}
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            </div>

        );

    }


    // ======================================================
    // PAGE
    // ======================================================

    return (

        <div className="student-profile-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="student-profile-header">

                <div>

                    <button
                        className="profile-back-button"
                        onClick={() => navigate("/student")}
                    >
                        ← Back to Dashboard
                    </button>

                    <span className="profile-label">
                        STUDENT ACCOUNT
                    </span>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        View your personal and academic information.
                    </p>

                </div>

            </header>


            {/* ==================================================
                PROFILE OVERVIEW
            ================================================== */}

            <section className="profile-overview">

                <div className="profile-avatar">

                    {
                        student.name
                            ? student.name
                                .charAt(0)
                                .toUpperCase()
                            : "S"
                    }

                </div>

                <div className="profile-overview-info">

                    <h2>
                        {student.name}
                    </h2>

                    <p>
                        Roll Number: {student.rollNumber}
                    </p>

                    <span className="profile-student-id">
                        Student ID #{student.studentId}
                    </span>

                </div>

            </section>


            {/* ==================================================
                INFORMATION
            ================================================== */}

            <section className="profile-information">

                <div className="profile-section-header">

                    <div>

                        <span>
                            PERSONAL INFORMATION
                        </span>

                        <h2>
                            Student Details
                        </h2>

                    </div>

                </div>


                <div className="profile-details-grid">


                    {/* STUDENT ID */}

                    <div className="profile-detail-card">

                        <span>
                            Student ID
                        </span>

                        <strong>
                            {student.studentId}
                        </strong>

                    </div>


                    {/* ROLL NUMBER */}

                    <div className="profile-detail-card">

                        <span>
                            Roll Number
                        </span>

                        <strong>
                            {student.rollNumber}
                        </strong>

                    </div>


                    {/* NAME */}

                    <div className="profile-detail-card">

                        <span>
                            Full Name
                        </span>

                        <strong>
                            {student.name}
                        </strong>

                    </div>


                    {/* EMAIL */}

                    <div className="profile-detail-card">

                        <span>
                            Email Address
                        </span>

                        <strong>
                            {student.email}
                        </strong>

                    </div>


                    {/* PHONE */}

                    <div className="profile-detail-card">

                        <span>
                            Phone Number
                        </span>

                        <strong>
                            {student.phone}
                        </strong>

                    </div>


                    {/* CLASS */}

                    <div className="profile-detail-card">

                        <span>
                            Class
                        </span>

                        <strong>
                            {student.className}
                        </strong>

                    </div>


                    {/* SECTION */}

                    <div className="profile-detail-card">

                        <span>
                            Section
                        </span>

                        <strong>
                            {student.section}
                        </strong>

                    </div>


                </div>

            </section>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="profile-footer">

                <button
                    className="profile-dashboard-button"
                    onClick={() => navigate("/student")}
                >
                    ← Back to Student Dashboard
                </button>

            </div>


        </div>

    );

}

export default StudentProfile;

