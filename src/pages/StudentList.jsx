import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, deleteStudent } from '../redux/studentSlice';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const dispatch = useDispatch();
  const { list: students, status, error } = useSelector((state) => state.students);

  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error loading students.</div>;
  }

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = students
    .filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((student) => (classFilter ? student.class === classFilter : true))
    .sort((a, b) => {
      if (sortKey === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortKey === 'class') {
        return a.class.localeCompare(b.class);
      }
      return 0;
    })
    .slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div className="student-list-container">
      <h2 className="title">Student List</h2>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="class-filter"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="">Filter by Class</option>
          <option value="10th Grade">10th Grade</option>
          <option value="11th Grade">11th Grade</option>
          <option value="12th Grade">12th Grade</option>
        </select>

        <select
          className="sort-filter"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="class">Class</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.class}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/students/${student.id}`} className="btn view-btn">View</Link>
                    <Link to={`/edit-student/${student.id}`} className="btn edit-btn">Edit</Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination section */}
      <nav className="pagination-nav">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default StudentList;
