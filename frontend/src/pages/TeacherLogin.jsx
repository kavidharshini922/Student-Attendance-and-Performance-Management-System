import RoleLogin from "./RoleLogin";

function TeacherLogin() {

    return (
        <RoleLogin
            role="TEACHER"
            icon="👨‍🏫"
            title="Teacher Login"
            description="Sign in to manage student attendance, performance and academic records."
        />
    );

}

export default TeacherLogin;

