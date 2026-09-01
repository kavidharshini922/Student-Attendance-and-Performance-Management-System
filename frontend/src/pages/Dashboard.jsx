function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <div className="cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Present Today</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Absent Today</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Average Marks</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;