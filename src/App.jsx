import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentRegistration from './pages/StudentRegistration';
import StudentDetails from './pages/StudentDetails';
import EditStudent from './pages/EditStudent';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Navbar />      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
      </Routes>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
