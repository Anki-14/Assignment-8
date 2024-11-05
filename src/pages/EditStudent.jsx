import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { updateStudent } from '../redux/studentSlice';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    class: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    const studentToEdit = students.find((student) => student.id === parseInt(id));
    if (studentToEdit) {
      setFormData(studentToEdit);
    }
  }, [id, students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.class || !formData.age || !formData.address || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    dispatch(updateStudent(formData));
    navigate('/students'); 
  };

  return (
    <div className="container my-5 edit-container">
      <h2 className="text-center mb-4 text-white fw-bold">EDIT STUDENT</h2>
      <form onSubmit={handleSubmit} className="inborder edit-student-form card p-4 shadow">
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control inborder"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control inborder"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Age</label>
          <input
            type="number"
            name="age"
            className="form-control inborder"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Class</label>
          <input
            type="text"
            name="class"
            className="form-control inborder"
            value={formData.class}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control inborder"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-control inborder"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn-crimson mt-3">Save Changes</button>
        <NavLink to="/students" className="btn-crimson mt-3 text-center">Back to Student List</NavLink>
      </form>
    </div>
  );
};

export default EditStudent;
