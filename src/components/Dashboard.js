import React, { useContext, useEffect, useState } from 'react'
import context from '../context/context';
import cg from "../images/cg.JPG";
import PieChart from './PieChart';
import BarChart from './BarChart';
import randomColor from 'randomcolor';
const moment = require('moment');

function Dashboard() {
  const econtext = useContext(context)
  const { getEmps, emps } = econtext;
  const [recentlyJoined, setRecentlyJoined] = useState([]);
  const [totalSalaryExpenditure, setTotalSalaryExpenditure] = useState(0);
  const [nextBirthdays, setNextBirthdays] = useState('');

  useEffect(() => {
    getEmps();
    return () => {
      setRecentlyJoined([]);
      setTotalSalaryExpenditure(0);
      setNextBirthdays('');
    };
  }, []);


  useEffect(() => {
    const today = moment();
    const upcoming = emps.filter((emp) => {
      const birthday = moment(emp.DOB);
      return birthday.month() === today.month() && birthday.date() > today.date();
    });
    const sortedUpcoming = upcoming.sort((a, b) => moment(a.DOB).date() - moment(b.DOB).date());
    const nextBirthdaysString = sortedUpcoming
      .map((emp) => `${emp.name} (${moment(emp.DOB).format('DD MMM')})`)
      .join(', ');
    setNextBirthdays(nextBirthdaysString);
  }, [emps]);

  useEffect(() => {
    const totalSalary = emps.reduce((total, emp) => total + parseFloat(emp.salary), 0);
    setTotalSalaryExpenditure(totalSalary);
  }, [emps]);

  useEffect(() => {
    const sortedEmployees = emps.slice().sort((a, b) => new Date(b.dateOfJoining) - new Date(a.dateOfJoining));
    const top5RecentlyJoined = sortedEmployees.slice(0, 8);
    setRecentlyJoined(top5RecentlyJoined);
  }, [emps]);

  const departments = Array.from(new Set(emps.map((emp) => emp.department)));
  const empCountByDept = departments.map((dept) => emps.filter((emp) => emp.department === dept).length);

  const salaryData = {
    labels: departments,
    datasets: [
      {
        label: 'Salary',
        data: departments.map((dept) =>
          emps
            .filter((emp) => emp.department === dept)
            .reduce((total, emp) => total + parseFloat(emp.salary), 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const empData = {
    labels: departments,
    datasets: [
      {
        label: 'No. of Employees',
        data: empCountByDept,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='w-100 px-5' >
      <div className='row'>
        <div style={{ width: "60vw" }}>
          <div className="row">
            <div className="col-sm-3">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">4</h1>
                  <p className="card-text">No. of Departments</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">{emps.length}</h1>
                  <p className="card-text">no. of Employees</p>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">{totalSalaryExpenditure.toLocaleString()}</h1>
                  <p className="card-text">Total salary expenditure</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-13 my-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Upcoming birthday's : <span className='mx-2' style={{
                  fontFamily: 'sans-serif',
                  fontSize: '1.5rem',
                  background: 'linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}> {nextBirthdays}</span></h5>
              </div>
            </div>
          </div>
          
          <div className='row px-3' style={{ justifyContent: "space-between" }}>
            <div className='col-sm-7 border rounded'>
              <h4 className='my-1'>Recently joined</h4>
              <table className="table table-striped table-sm mt-3" style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">E-id</th>
                    <th scope="col">Date of Joining</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {recentlyJoined.map((emp, index) => (
                    <tr key={emp.eid}>
                      <th scope="row">{index + 1}</th>
                      <td>{emp.eid}</td>
                      <td>{moment(emp.dateOfJoining).format('DD MMM YYYY')}</td>
                      <td>{emp.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Pie Chat (Dept v/s no. of Emp)</h5>
                  <PieChart data={{ labels: departments, datasets: [{ data: empCountByDept, backgroundColor: randomColor({ count: departments.length, luminosity: 'light' }) }] }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='ml-5'>
          <div >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Company growth</h5>
                <img src={cg} style={{ width: "28vw" }} alt="Example" />
              </div>
            </div>
          </div>
          <div className='my-3'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bar Chat (Dept v/s Salary)</h5>
                <BarChart data={salaryData} />
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Dashboard
