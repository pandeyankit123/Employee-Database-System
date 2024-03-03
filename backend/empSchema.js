const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
    eid:{
        type: String,
        required: [true, 'Employee required'],
        unique: true
    },
    dateOfJoining:{
        type: Date,
        default: Date.now()
    },
    name:{
        type: String,
        required: [true, 'Name required']
    },
    DOB:{
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: [true, 'Email required'],
        unique: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Enter email in valid format']
    },
    tele:{
        type: Number,
        min: [6000000000,'Enter 10 digit mobile number'],
        max: [9999999999,'Enter 10 digit mobile number'],
        unique: true
    },
    department:{
        type: String,
        required: [true, 'Department required']
    },
    salary:{
        type: Number,
        required: [true, 'Salary required']
    }
});
module.exports = mongoose.model('Emp', EmpSchema);