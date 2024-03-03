import React, { useContext, useRef, useState } from 'react'
import context from '../context/context';
import { utils as XLSXUtils, writeFile as writeExcelFile } from 'xlsx';
const moment = require('moment');

function Down(props) {
    const econtext = useContext(context);
    const {emps, addEmp, currentPage, setCurrentPage, len } = econtext;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrev = () => setCurrentPage(currentPage - 1);
    const handleNext = () => setCurrentPage(currentPage + 1);

    const reff = useRef(null)
    const reffClose = useRef(null)
    const [Eemp, setEemp] = useState({ id: "", ename: "", eDOB: "", eemail: "", etele: "", edepartment: "", esalary: "" })

    const add = () => {
        reff.current.click();
    }

    const handleClick = (e) => {
        e.preventDefault();
        addEmp(Eemp.id, Eemp.ename, Eemp.eDOB, Eemp.eemail, Eemp.etele, Eemp.edepartment, Eemp.esalary);
        reffClose.current.click();
        setEemp({ id: "", ename: "", eDOB: "", eemail: "", etele: "", edepartment: "", esalary: "" });
        props.showAlert("Added Successfully", "success")
    }

    const onChange = (e) => {
        setEemp({ ...Eemp, [e.target.name]: e.target.value });
    };

    const exportToExcel = () => {
        // Create a new workbook
        const workbook = XLSXUtils.book_new();
    
        // Convert employee data to a worksheet
        const worksheet = XLSXUtils.json_to_sheet(emps);
    
        // Add the worksheet to the workbook
        XLSXUtils.book_append_sheet(workbook, worksheet, 'EmployeeList');
    
        // Generate an Excel file and download it
        writeExcelFile(workbook, 'EmployeeList.xlsx');
    };
    

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <nav aria-label="Page navigation example" >
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={handlePrev}>
                                &laquo;
                            </a>
                        </li>
                        {Array.from({ length: len }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => paginate(i + 1)}>
                                    {i + 1}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === len ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={handleNext}>
                                &raquo;
                            </a>
                        </li>
                    </ul>
                </nav>


                <button ref={reff} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Employee</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-x"></i></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="eid" className="form-label">Eid</label>
                                            <input type="text" className="form-control" id="id" name="id" value={Eemp.id} placeholder="Enter the employee ID" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="ename" name="ename" value={Eemp.ename} placeholder="Name??" onChange={onChange} minLength={3} required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">E-mail id</label>
                                        <input type="text" className="form-control" id="eemail" name="eemail" value={Eemp.eemail} placeholder="Enter the emailID" onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="row ">
                                        <div className="col">
                                            <label htmlFor="DOB" className="form-label">D.O.B</label>
                                            <input type="date" className="form-control" id="eDOB" name="eDOB" value={moment(Eemp.eDOB).format('YYYY-MM-DD')} onChange={onChange} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="tele" className="form-label">Mobile No.</label>
                                            <input type="text" className="form-control" id="etele" name="etele" value={Eemp.etele} placeholder="10 digit Mobile No." onChange={onChange} minLength={10} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="department" className="form-label">Department</label>
                                            <select className="form-control" id="edepartment" name="edepartment" value={Eemp.edepartment} placeholder="Select one" onChange={onChange}>
                                                <option>Development</option>
                                                <option>Analyst</option>
                                                <option>Production</option>
                                                <option>Consultancy</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="salary" className="form-label">Salary</label>
                                            <input type="text" className="form-control" id="esalary" name="esalary" value={Eemp.esalary} placeholder="Tankhwa??" onChange={onChange} minLength={2} required />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={reffClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={Eemp.ename.length < 3 || Eemp.eemail.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Add Employee</button>
                            </div>
                        </div >
                    </div >
                </div >

                <div>
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => { add() }} style={{ "alignItems": "center" }}>Add Employee</button>
                    <button className="btn btn-secondary btn-lg mx-2 " onClick={exportToExcel} title="Export to Excel"><i class='fas fa-file-export' style={{ fontSize: "25px"}}></i></button>
                </div>
            </div>
        </>
    )
}

export default Down;
