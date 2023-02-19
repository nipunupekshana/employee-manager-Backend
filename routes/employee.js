const express = require("express");
const router = express.Router();
const Employee = require("../model/employee");

// @route   GET api/employee
// @desc    Get all employees
router.get("/", async (_req, res,next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   POST api/employee
// @desc    Add new employee
router.post("/", async (req, res,next) => {
  try {
    const { first_name, last_name, email, number, gender, photo } = req.body;

    // check if employee already exists
    const isEmployeeAvailable = await Employee.findOne({ email });
    if (isEmployeeAvailable) {
      const error = new Error('Employee already exists');
      error.status = 404;
      throw error;
    }

    let employee = new Employee({
      first_name,
      last_name,
      email,
      number,
      gender,
      photo,
    });
    await employee.save();
    return res.status(200).send("Employee added successfully");
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   get api/employee/:id
// @desc    Get employee by ID
router.get("/:id", async (req, res,next) => {
  try {
    if (!req.params.id) return res.status(400).json({ msg: "" });
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      const error = new Error('Employee not found');
      error.status = 404;
      throw error;
    }
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   PUT api/employee/:id
// @desc    Update employee
router.put("/:id", async (req, res,next) => {
  try {
    const { first_name, last_name, email, number,gender, photo } = req.body;
    const document = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      {
        first_name,
        last_name,
        email,
        number,
        gender,
        photo,
      },
      { new: true }
    );
    if (!document) {
      const error = new Error('Employee not found');
      error.status = 404;
      throw error;
    }
    res.status(200).send("Employee updated successfully");
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   DELETE api/employee/:id
// @desc    Delete employee
router.delete("/:id", async (req, res,next) => {
  try {
    const document = await Employee.findOneAndDelete({ _id: req.params.id });
    if (!document) {
      const error = new Error('Employee not found');
      error.status = 404;
      throw error;
    }
    res.status(200).send("Employee deleted successfully");
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
