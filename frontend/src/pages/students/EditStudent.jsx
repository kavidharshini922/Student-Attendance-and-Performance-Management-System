import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    rollNumber: "",
    name: "",
    email: "",
    phone: "",
    className: "",
    section: ""
  });

  useEffect(() => {
    fetch(`https://student-attendance-and-performance.onrender.com/students/${id}`)
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://student-attendance-and-performance.onrender.com/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(student)
        }
      );

      if (response.ok) {
        alert("Student updated successfully!");
        navigate("/students");
      } else {
        alert("Failed to update student.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Update Student</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Roll Number</label>
          <input
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={student.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            value={student.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            name="phone"
            value={student.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Class</label>
          <input
            name="className"
            value={student.className}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Section</label>
          <input
            name="section"
            value={student.section}
            onChange={handleChange}
          />
        </div>

        <button className="btn" type="submit">
          Update Student
        </button>
      </form>
    </div>
  );
}

export default EditStudent;