import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../redux/studentSlice';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const totalStudents = students.length;

  const studentsPerClass = students.reduce((acc, student) => {
    acc[student.class] = (acc[student.class] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(studentsPerClass),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(studentsPerClass),
        backgroundColor: [
          'rgba(76, 190, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="home-heading">Student Management Portal</h1>
      <div className="dashboard-content container mt-5">
        <div className="chart-container">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top' },
                title: {
                  display: true,
                  text: 'STUDENTS DATA',
                  color: '#00ffcc',
                  font: {
                    size: 20,
                    weight: 'bold',
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,
                  max: Math.max(...Object.values(studentsPerClass)) + 5, // Dynamic max
                  ticks: {
                    stepSize: 2,
                    color: '#ffffff', // White ticks for contrast
                  },
                },
                x: {
                  ticks: {
                    color: '#ffffff', // White labels for contrast
                  },
                },
              },
            }}
          />
        </div>

        <div className="total-students-box p-3 rounded">
          <h5>Total Students: <span className="total-count">{totalStudents}</span> nos.</h5>
        </div>

        <div className="students-per-class">    
          {Object.entries(studentsPerClass).map(([className, count]) => (
            <p key={className} className="class-count">
              {className}: <span className="class-number">{count}</span> students
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
