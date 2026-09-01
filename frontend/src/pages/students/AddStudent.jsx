import { useState } from "react";

function AddStudent() {
    const [student, setStudent] = useState({
        rollNumber: "",
        name: "",
        email: "",
        phone: "",
        className: "",
        section: ""
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            });

            if (response.ok) {
                alert("Student added successfully!");

                setStudent({
                    rollNumber: "",
                    name: "",
                    email: "",
                    phone: "",
                    className: "",
                    section: ""
                });
            } else {
                alert("Failed to add student");
            }
        } catch (error) {
            console.error(error);
            alert("Backend server is not running");
        }
    };

    return (
        <div>
            <h2>Add Student</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={student.rollNumber}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={student.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={student.phone}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="className"
                    placeholder="Class"
                    value={student.className}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="section"
                    placeholder="Section"
                    value={student.section}
                    onChange={handleChange}
                />

                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default AddStudent;