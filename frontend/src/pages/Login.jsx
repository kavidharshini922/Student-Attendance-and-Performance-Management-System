
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();


    // ======================================================
    // LOGIN
    // ======================================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8080/auth/login",
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


            if (!response.ok) {

                setError(
                    data.message || "Invalid email or password."
                );

                setLoading(false);

                return;
            }


            // ==================================================
            // STORE USER DETAILS
            // ==================================================

            localStorage.setItem(
                "userName",
                data.name
            );

            localStorage.setItem(
                "userRole",
                data.role
            );


            // Store student ID for student pages

            if (data.role === "STUDENT" && data.studentId) {

                localStorage.setItem(
                    "studentId",
                    data.studentId
                );

            }


            // ==================================================
            // ROLE-BASED NAVIGATION
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
            else {

                setError("Invalid user role.");

            }


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );

            setError(
                "Unable to connect to the server. Please make sure the backend is running."
            );

        } finally {

            setLoading(false);

        }

    };


    // ======================================================
    // PAGE
    // ======================================================

    return (

        <div className="login-page">


            {/* ==================================================
                LOGIN CARD
            ================================================== */}

            <div className="login-card">


                {/* HEADER */}

                <div className="login-header">

                    <div className="login-icon">
                        🎓
                    </div>

                    <h1>
                        Student Attendance
                    </h1>

                    <h2>
                        & Performance Management
                    </h2>

                    <p>
                        Sign in to access your dashboard
                    </p>

                </div>


                {/* ERROR MESSAGE */}

                {error && (

                    <div className="login-error">
                        ⚠️ {error}
                    </div>

                )}


                {/* LOGIN FORM */}

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >


                    {/* EMAIL */}

                    <div className="login-form-group">

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

                    <div className="login-form-group">

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
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In →"}

                    </button>

                </form>


                {/* FOOTER */}

                <div className="login-footer">

                    <p>
                        Student Attendance & Performance Management System
                    </p>

                </div>

            </div>

        </div>

    );
}

export default Login;

