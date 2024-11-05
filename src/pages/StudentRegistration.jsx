import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../redux/studentSlice';
import { useNavigate } from 'react-router-dom';

const StudentRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Define the state for each form field
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    class: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.age || isNaN(form.age)) newErrors.age = 'Valid age is required';
    if (!form.class) {
      newErrors.class = 'Class is required';
    } else if (!/^(1st|2nd|3rd|[4-9]th|1[0-2]th) Grade$/.test(form.class)) {
      newErrors.class = 'Class is invalid. Use format: "1st Grade", "2nd Grade", etc.';
    }
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
  
    if (validate()) {
      dispatch(addStudent({ ...form, id: Date.now() })); // Adding a unique ID

      alert('Student Registration successful !');
      setForm({
        name: '',
        email: '',
        age: '',
        class: '',
        address: '',
        phone: '',
      });
      navigate('/students')
    }
  };

  return (
    <div className="container my-5 register-container p-5">
      <h2 className="text-center mb-4 text-white fw-bold">REGISTER NEW STUDENT</h2>
      <form onSubmit={handleSubmit} className="inborder card p-4 glow field">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold">Student Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="age" className="form-label fw-semibold">Age</label>
          <input
            type="number"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            id="age"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="class" className="form-label fw-semibold">Class</label>
          <input
            type="text"
            className={`form-control ${errors.class ? 'is-invalid' : ''}`}
            id="class"
            name="class"
            value={form.class}
            onChange={handleChange}
            required
          />
          {errors.class && <div className="invalid-feedback">{errors.class}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label fw-semibold">Address</label>
          <input
            type="text"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <button type="submit" className="btn-crimson mt-3">
          Register Student
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;
