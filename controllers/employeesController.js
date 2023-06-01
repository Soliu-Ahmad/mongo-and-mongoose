
const Employee = require("../models/Employee");

const getAllEmployees = async (req, res) => {
  const employee = await Employee.find();
  if (!employee)
    return res
      .status(204)
      .json({ message: "No Employee found" })
      res.json(employee)
};

const createNewEmployee = async (req, res) => {
  if(!req?.body?.firstname || !req?.body?.lastname) {
    res.status(400).json({ "message": "firstname and lastname are required"})
  }

  try{  
    const result = await Employee.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname
  })
    res.status(201).json(result)
   
  }catch(err){
    console.log(err)
  }
};

const updateEmployee = async (req, res) => {
  if(!req?.body?.id) {
    return res.status(400).json({'message': "ID parameter is required"})
  }
  const employee = await Employee.findOne({_id: req.body.id}).exec()
  if(!employee) {
    return res.status(204).json({'message': `No employee matches ID ${req.body.id}.`}); 
  }

  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async(req, res) => {
  if(!req?.body?.id) return res.status(400).json({'message': 'Employee ID required.'})
  const employee = await Employee.findOne({_id: req.body.id}).exec()
  if(!employee) {
    return res.status(204).json({'message': `No employee matches ID ${req.body.id}`})
  }
  const result = await employee.deleteOne({_id: req.body.id})
  res.json(data.employee);
};

const getEmployee = async (req, res) => {
  if (!req.params?.id) return res.status(400).json({'message': 'Employee ID required'});
 
  const employee = await Employee.findOne({_id: req.params.id}).exec();
  if(!employee) {
    return res.status(204).json({'message': `No employee mtachs ID ${req.params.id}.`})
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
};