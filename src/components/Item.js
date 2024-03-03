import React, { useContext } from 'react'
import context from "../context/context"
const moment = require('moment');

const Item = (props) => {
  const econtext = useContext(context);
  const { deleteEmp } = econtext;
  const { emp, updateEmp } = props;

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');

    if (isConfirmed) {
      deleteEmp(emp.eid);
      props.showAlert('Deleted Successfully', 'success');
    }
  };

  return (
    <>
      <tr>
        <th scope="row">{emp.eid}</th>
        <td>{moment(emp.dateOfJoining).format('DD MMM YYYY')}</td>
        <td>{emp.name}</td>
        <td>{moment(emp.DOB).format('DD MMM YYYY')}</td>
        <td>{emp.department}</td>
        <td>{emp.salary}</td>
        <td>
          <button className="btn btn-sm btn-info mx-1" onClick={() => { updateEmp(emp) }}><i className="far fa-edit"></i></button>
          <button className="btn btn-sm btn-danger mx-1" onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    </>
  )
}

export default Item