import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const role = localStorage.getItem("userRole");

    // No logged-in user
    if (!role) {
        return <Navigate to="/login" replace />;
    }

    // Normalize role
    const currentRole = role.trim().toUpperCase();

    const requiredRole = allowedRole
        ? allowedRole.trim().toUpperCase()
        : null;


    // Check role
    if (requiredRole && currentRole !== requiredRole) {
        return <Navigate to="/login" replace />;
    }


    // User is authorized
    return children;
}

export default ProtectedRoute;