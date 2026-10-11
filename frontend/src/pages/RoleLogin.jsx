import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RoleLogin.css";


function RoleLogin({ role, title, icon, description }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    // ==================================================
    // LOGIN FUNCTION
    // ==================================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await fetch(
                "https://student-attendance-and-performance.onrender.com/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            // ==================================================
            // LOGIN FAILED
            // ==================================================

            if (!response.ok) {

                alert(
                    data.message || "Login failed"
                );

                setLoading(false);

                return;
            }


            // ==================================================
            // CHECK ROLE
            // ==================================================

            if (data.role !== role) {

                alert(
                    `This account is not a ${role.toLowerCase()} account. Please use the correct login page.`
                );

                setLoading(false);

                return;
            }


            // ==================================================
            // STORE USER INFORMATION
            // ==================================================

            localStorage.setItem(
                "userName",
                data.name
            );

            localStorage.setItem(
                "userRole",
                data.role
            );


            // ==================================================
            // STORE STUDENT ID
            // ==================================================

            if (data.studentId) {

                localStorage.setItem(
                    "studentId",
                    data.studentId
                );

            }


            // ==================================================
            // REDIRECT
            // ==================================================

            if (data.role === "ADMIN") {

                navigate("/admin");

            }
            else if (data.role === "TEACHER") {

                navigate("/teacher");

            }
            else if (data.role === "STUDENT") {

                navigate("/student");

            }


        }
        catch (error) {

            console.error(
                "Login Error:",
                error
            );

            alert(
                "Unable to connect to the server. Please make sure the backend is running."
            );

        }
        finally {

            setLoading(false);

        }

    };


    // ==================================================
    // PAGE UI
    // ==================================================

    return (

        <div className="role-login-page">


            {/* ==================================================
                BACK TO HOME
            ================================================== */}

            <Link
                to="/"
                className="login-back"
            >
                ← Back to Home
            </Link>


            {/* ==================================================
                LOGIN CARD
            ================================================== */}

            <div className="role-login-card">


                {/* ==================================================
                    ROLE ICON
                ================================================== */}

                <div className="login-role-icon">
                    {icon}
                </div>


                {/* ==================================================
                    TITLE
                ================================================== */}

                <h1>
                    {title}
                </h1>


                <p className="login-description">
                    {description}
                </p>


                {/* ==================================================
                    LOGIN FORM
                ================================================== */}

                <form onSubmit={handleLogin}>


                    {/* EMAIL */}

                    <div className="input-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="input-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In →"
                        }

                    </button>

                </form>


                {/* ==================================================
                    SECURITY MESSAGE
                ================================================== */}

                <div className="login-security">

                    🔐 Secure role-based access

                </div>


                {/* ==================================================
                    OTHER LOGIN PORTALS
                ================================================== */}

                <div className="other-login">

                    <span>
                        Need another portal?
                    </span>


                    <div className="other-login-links">


                        {/* STUDENT */}

                        {role !== "STUDENT" && (

                            <Link to="/student-login">
                                Student
                            </Link>

                        )}


                        {/* TEACHER */}

                        {role !== "TEACHER" && (

                            <Link to="/teacher-login">
                                Teacher
                            </Link>

                        )}


                        {/* ADMIN */}

                        {role !== "ADMIN" && (

                            <Link to="/admin-login">
                                Admin
                            </Link>

                        )}

                    </div>

                </div>


            </div>

        </div>

    );

}


export default RoleLogin;

