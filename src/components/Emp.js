import React, { useContext, useEffect } from 'react'
import context from '../context/context';
import Emplist from './Emplist';
import Up from './Up';
import Down from './Down';


function Emp(props) {
    const econtext = useContext(context)
    const {getEmps, currentPage, itemsPerPage } = econtext;
    useEffect(() => {
        getEmps();
    }, [currentPage, itemsPerPage])
    return (
        <div className="container">
            <br />
            <Up showAlert={props.showAlert} />
            <br />
            <Emplist showAlert={props.showAlert} />
            <br />
            <Down showAlert={props.showAlert} />
            <hr />
        </div>
    )
}

export default Emp
