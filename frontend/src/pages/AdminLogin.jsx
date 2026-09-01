import RoleLogin from "./RoleLogin";

function AdminLogin() {

    return (
        <RoleLogin
            role="ADMIN"
            icon="🛡️"
            title="Administrator Login"
            description="Sign in to manage users, students, teachers, reports and system operations."
        />
    );

}

export default AdminLogin;

