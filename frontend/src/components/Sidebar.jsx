import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Student Management</h2>

      <nav>
        <Link to="/">Dashboard</Link>

        <Link to="/students">Students</Link>
        <Link to="/students/add">Add Student</Link>

        <Link to="/attendance">Attendance</Link>
        <Link to="/attendance/mark">Mark Attendance</Link>

        <Link to="/performance">Performance</Link>
        <Link to="/performance/add">Add Marks</Link>

        <Link to="/reports">Reports</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;