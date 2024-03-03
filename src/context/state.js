import context from "./context";
import { useState } from "react";

const State = (props) => {
  const host = "http://localhost:5000"
  const [emps, setEmps] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const [len, setlen] = useState(Math.ceil(emps.length / itemsPerPage));

  const [sortField, setSortField] = useState('eid');
  const [sortOrder, setSortOrder] = useState('asc');

  // Get all
  const getEmps = async () => {
    const response = await fetch(`${host}/emp/allemp`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json()
    setEmps(json)
  }

  // Add
  const addEmp = async (eid, name, DOB, email, tele, department, salary) => {
    const response = await fetch(`${host}/emp/addemp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eid, name, DOB, email, tele, department, salary })
    });

    const emp = await response.json();
    setEmps(emps.concat(emp))
  }

  // FindById
  const findEmpById = async (id) => {
    const newEmp = emps.filter((emp) => emp.eid.includes(id))
    setEmps(newEmp)
  }

  // FindByName
  const findEmpByName = async (fname) => {
    const newEmp = emps.filter((emp) => emp.name.toLowerCase().includes(fname.toLowerCase()))
    setEmps(newEmp)
  }

  // Edit
  const editEmp = async (id, name, DOB, email, tele, department, salary) => {
    const response = await fetch(`${host}/emp/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, DOB, email, tele, department, salary })
    });
    const json = await response.json();
    console.log(json)
    let newEmps = JSON.parse(JSON.stringify(emps))
    // Logic to edit
    for (let index = 0; index < newEmps.length; index++) {
      const element = newEmps[index];
      if (element.eid === id) {
        newEmps[index].name = name;
        newEmps[index].DOB = DOB;
        newEmps[index].email = email;
        newEmps[index].tele = tele;
        newEmps[index].department = department;
        newEmps[index].salary = salary;
        break;
      }
    }
    setEmps(newEmps);
  }

  // Delete
  const deleteEmp = async (id) => {
    try {
      const response = await fetch(`${host}/emp/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        const newEmp = emps.filter((emp) => emp.eid !== id);
        setEmps(newEmp);
      } else {
        console.error('Failed to delete employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };



  return (
    <context.Provider value={{ emps, addEmp, deleteEmp, editEmp, getEmps, findEmpById, findEmpByName, currentPage, setCurrentPage, itemsPerPage, len, setlen, sortField, setSortField, sortOrder, setSortOrder }}>
      {props.children}
    </context.Provider>
  )
}
export default State;