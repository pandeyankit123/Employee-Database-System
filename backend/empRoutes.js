const express = require('express');
const Emp = require('./empSchema');
const router = express.Router();

router.get('/allemp', async (req, res) => {
    try {
        const employees = await Emp.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addemp', async (req, res) => {
    try {
        const checkid = await Emp.findOne({ eid: req.body.eid });
        const checkemail = await Emp.findOne({ email: req.body.email });
        if (checkemail || checkid)
            res.status(400).send("Employee already exist");
        else {
            const newemp = new Emp(req.body);
            await newemp.save();
            res.status(201).json(newemp);
            console.log(newemp);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/findById/:eid', async (req, res) => {
    try {
        const employee = await Emp.findOne({ eid: req.params.eid });
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/findByName/:name', async (req, res) => {
    try {
        const employee = await Emp.findOne({ name: req.params.name });
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/update/:eid', async (req, res) => {
    try {
        const updatedEmployee = await Emp.findOneAndUpdate(
            { eid: req.params.eid },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete/:eid', async (req, res) => {
    try {
        const deletedEmployee = await Emp.findOneAndDelete({ eid: req.params.eid });

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;