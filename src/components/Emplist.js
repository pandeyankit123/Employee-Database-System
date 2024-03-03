import React, { useContext, useRef, useState } from 'react'
import context from '../context/context';
import Item from './Item';
const moment = require('moment');

function Emplist(props) {
  const econtext = useContext(context)
  const { emps, editEmp, currentPage, itemsPerPage, setCurrentPage, setlen, sortField, sortOrder } = econtext;

  const [selectedDepartment, setSelectedDepartment] = useState('');

  const filteredItems = selectedDepartment
  ? emps.filter((emp) => emp.department === selectedDepartment)
  : emps;

  const compareFields = (fieldA, fieldB) => {
    if (typeof fieldA === 'string') {
      return fieldA.localeCompare(fieldB);
    } else if (typeof fieldA === 'number') {
      return fieldA - fieldB;
    } else {
      // Add more type comparisons as needed
      return 0;
    }
  };
  const sortedItems = [...filteredItems].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (sortOrder === 'asc') {
      return compareFields(fieldA, fieldB);
    } else {
      return compareFields(fieldB, fieldA);
    }
  });

  setlen(Math.ceil(sortedItems.length / itemsPerPage))

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);


  const ref = useRef(null)
  const refClose = useRef(null)
  const [Eemp, setEemp] = useState({ id: "", ename: "", eDOB: "", eemail: "", etele: "", edepartment: "", esalary: "" })

  const updateEmp = (currentEmp) => {
    ref.current.click()
    setEemp({ id: currentEmp.eid, ename: currentEmp.name, eDOB: currentEmp.DOB, eemail: currentEmp.email, etele: currentEmp.tele, edepartment: currentEmp.department, esalary: currentEmp.salary })
  }

  const handleClick = (e) => {
    editEmp(Eemp.id, Eemp.ename, Eemp.eDOB, Eemp.eemail, Eemp.etele, Eemp.edepartment, Eemp.esalary)
    props.showAlert("Updated Successfully", "success")
    refClose.current.click();
  }
  const onChange = (e) => {
    setEemp({ ...Eemp, [e.target.name]: e.target.value });
  };

  const handleDepartmentFilter = (department) => {
    setSelectedDepartment(department);
    setCurrentPage(1)
  };

  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit & View Employee</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-x"></i></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="eid" className="form-label">Eid</label>
                    <input type="text" className="form-control" id="id" name="id" value={Eemp.id} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                  </div>
                  <div className="col">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="ename" name="ename" value={Eemp.ename} onChange={onChange} minLength={3} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail id</label>
                  <input type="text" className="form-control" id="eemail" name="eemail" value={Eemp.eemail} onChange={onChange} minLength={5} required />
                </div>
                <div className="row ">
                  <div className="col">
                    <label htmlFor="DOB" className="form-label">D.O.B</label>
                    <input type="date" className="form-control" id="eDOB" name="eDOB" value={moment(Eemp.eDOB).format('YYYY-MM-DD')} onChange={onChange} />
                  </div>
                  <div className="col">
                    <label htmlFor="tele" className="form-label">Telephone</label>
                    <input type="text" className="form-control" id="etele" name="etele" value={Eemp.etele} onChange={onChange} minLength={10} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="department" className="form-label">Department</label>
                    <select className="form-control" id="edepartment" name="edepartment" value={Eemp.edepartment} onChange={onChange}>
                      <option>Development</option>
                      <option>Analyst</option>
                      <option>Production</option>
                      <option>Consultancy</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="text" className="form-control" id="esalary" name="esalary" value={Eemp.esalary} onChange={onChange} minLength={2} required />
                  </div>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={Eemp.ename.length < 3 || Eemp.eemail.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Employee</button>
            </div>
          </div >
        </div >
      </div >
      <div className="min-vh-70 border border-dark rounded" style={{ minHeight: "49vh" }}>
        <table className="table table-hover table-sm" style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th scope="col">E-id</th>
              <th scope="col">D.O.J</th>
              <th scope="col">Name</th>
              <th scope="col">D.O.B</th>
              <th scope="col">
                <div class="dropdown show">
                  <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" style={{ color: 'black' }} aria-expanded="false"> Department </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#" onClick={() => handleDepartmentFilter('Development')}> Development </a>
                    <a class="dropdown-item" href="#" onClick={() => handleDepartmentFilter('Analyst')}> Analyst </a>
                    <a class="dropdown-item" href="#" onClick={() => handleDepartmentFilter('Production')}> Production </a>
                    <a class="dropdown-item" href="#" onClick={() => handleDepartmentFilter('Consultancy')}> Consultancy </a>
                    <a class="dropdown-item" href="#" onClick={() => handleDepartmentFilter('')}> Clear Filter </a>
                  </div>
                </div>
              </th>
            <th scope="col">Salary</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody >
          <div className="container mx-2">
            {emps.length === 0 && 'No notes to display'}
          </div>
          {currentItems.map((emp) => {
            return <Item key={emp.eid} updateEmp={updateEmp} showAlert={props.showAlert} emp={emp} />
          })}
        </tbody>
      </table>
    </div >
    </>
  )
}

export default Emplist