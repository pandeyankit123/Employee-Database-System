import React, { useContext, useState } from 'react'
import context from '../context/context';

function Up() {
    const econtext = useContext(context)
    const { findEmpById, findEmpByName, getEmps, setCurrentPage, sortOrder, setSortOrder, setSortField } = econtext;
    const [searchType, setSearchType] = useState('id');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearch = async () => {
        
        if (searchType === 'id') {
            findEmpById(searchTerm);
        } else if (searchType === 'name') {
            findEmpByName(searchTerm);
        }
    };

    const Change = async (e) => {
        setCurrentPage(1)
        setSearchTerm(e.target.value);
        getEmps()
    };

    const handleSort = (field) => {
        setCurrentPage(1);
        setSortField(field);
        setSortOrder('asc');

        // Trigger getEmps to apply sorting
        getEmps();
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <div className="input-group" style={{ width: '20vw' }}>
                        <div className="input-group-prepend">
                            <div type="button" className="btn input-group-text" onClick={handleSearch}>Search</div>
                        </div>
                        <input type="text" className="form-control" placeholder="Search" aria-label="Input group example" aria-describedby="btnGroupAddon" value={searchTerm} onChange={Change} onKeyPress={(e) => { if (e.key === 'Enter') { handleSearch(); } }} />
                    </div>
                    <div className="form-check form-check-inline mx-3">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="id" checked={searchType === 'id'} onChange={handleSearchTypeChange} />
                        <label className="form-check-label" htmlFor="inlineRadio1">By Id</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="name" checked={searchType === 'name'} onChange={handleSearchTypeChange} />
                        <label className="form-check-label" htmlFor="inlineRadio2">By Name</label>
                    </div>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-secondary" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>Sort &#8645;</button>
                    <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#" onClick={() => handleSort('salary')}>Salary</a>
                        <a className="dropdown-item" href="#" onClick={() => handleSort('name')}>Name</a>
                        <a className="dropdown-item" href="#" onClick={() => handleSort('DOB')}>Date of Birth</a>
                        <a className="dropdown-item" href="#" onClick={() => handleSort('dateOfJoining')}>Date of Joining</a>
                        <a className="dropdown-item" href="#" onClick={() => handleSort('eid')}>Employee ID</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Up
