import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentDetails = () => {
  const { id } = useParams();
  const students = useSelector((state) => state.students.list);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const selectedStudent = students.find((stu) => stu.id === parseInt(id));
    setStudent(selectedStudent);
  }, [id, students]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5 studentDetails-container  px-4">
      <h1 className="text-center text-white mb-4 fw-bold">STUDENT DETAILS</h1>
      <div className="card p-3 glow responsive  inborder text-center">
        <h2 className="text fw-bold">{student.name}</h2>
        <h4><strong>Email:</strong> {student.email}</h4>
        <h4><strong>Age:</strong> {student.age}</h4>
        <h4><strong>Class:</strong> {student.class}</h4>
        <h4><strong>Address:</strong> {student.address}</h4>
        <h4><strong>Phone Number:</strong> {student.phone}</h4>
        <div className="btn-container">
         <NavLink to="/students" className=" btn-crimson  mt-3">Back to Student  List</NavLink>
         <NavLink to="/" className=" btn-crimson mt-3">Goto Dashboard</NavLink>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
