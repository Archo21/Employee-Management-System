const fs = require('fs');
const DB =require("./db")
const inquirer = require('inquirer');
const { addDepartment } = require('./db');
const { BADFAMILY } = require('dns');
require ("console.table")
init()
function init(){
  employeeTrack()
}
function employeeTrack(){
    inquirer
      .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Update employees by Manager",
          "Add Employee",
          "Remove Employee",
          "View Employee Role",
          "Update Employee Role",
          "Update Employee Manager",
          "Add Department",
          "Remove Department",
          "ViewAllBut Manager",
          "exit"
        ],
        name:"choice"
      }
    ]).then(function(res) {
      console.log(
        res.choice
        );
        switch (res.choice) {
          case "View all employees":
            viewEmployee();
            console.log("employees");
            break;
  
          case "View all employees by department":
            viewAllEmployeeByDepartment();
            break;
  
          case "View all employees by Manager":
            viewAllEmployeeByManager();
            break;

            case "Update employees by Manager":
            updateEmployeeByManager();
            break;
  
          case "Add Employee":
            addEmployee();
            break;
  
          case "Remove Employee":
            removeEmployee();
            break;

            case "View Employee Role":
            employeeRoleView();
            break;
  
          case "Update Employee Role":
            employeeRoleUpdate();
            break;
  
          case "Update Manager":
            employeeManager();
            break;

            case "Add Department":
            departmentAdd();
            break;

            case "Remove Department":
            departmentRemove();
            break;

            case "ViewAllBut Manager":
            viewAllButManager();
            break;


          case "Quit":
            connection.end();
            break;
        }
    })
  };
  const viewEmployee = () => {
    DB.findAllEmployees()
    .then (([rows])=> {
      let employees =rows
      console.log("\n");
      console.table(employees);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const viewAllEmployeeByDepartment = () => {
    DB.viewAllDepartment()

    .then (([rows])=> {
      let department =rows
      const departmentChoices = department.map (({
        id,name
      })=>({
        name:name,
        value:id,
      }))
    inquirer.prompt([
      {
        name:"departmentId",
        type:"list",
        message:"which department are you from?",
        choices:departmentChoices

      }
    ])
    .then ((response)=>{
      return DB.findAllEmployeesByDepartment(response.departmentId)
    })
    .then (([rows])=> {
      let employees =rows
      console.log("\n");
      console.table(employees);
    })
    .then(()=>{
      employeeTrack ()
    })
      
    })
  }
  
  const viewAllEmployeeByManager = () => {
    DB.findAllEmployeesByManager()
    .then (([rows])=> {
      let employees =rows
      console.log("\n");
      console.table(employees);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const updateEmployeeByManager = () => {
    DB.updateEmployeesByManager()
    .then (([rows])=> {
      let employees =rows
      console.log("\n");
      console.table(employees);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const addEmployee = () => {
    DB.addEmployee()
    .then (([rows])=> {
      let employees =rows
      console.log("\n");
      console.table(employees);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const removeEmployee= () => {
    DB.employeeRemove()
    .then (([rows])=> {
      let employees =rows
      console.log("\n");
      console.table(employees);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const employeeRoleView = () => {
    DB.findAllEmployeesRole()
    .then (([rows])=> {
      let employees =rows
      console.log("\n");
      console.table(employees);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const employeeRoleUpdate = () => {
    DB.updateEmployeesRole()
    .then (([rows])=> {
      let employees =rows
      console.log("\n");
      console.table(employees);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const departmentAdd= () => {
    DB.addDepartment()
    .then (([rows])=> {
      let Employees =rows
      console.log("\n");
      console.table(deparmrnt);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const departmentRemove= () => {
    DB.removeDepartment()
    .then (([raws])=> {
      let department =raws
      console.log("\n");
      console.table(deparmrnt);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const viewAllButManager= () => {
    DB.findAllButManager()
    .then (([raws])=> {
      let manager =rows
      console.log("\n");
      console.table(deparmrnt);
    })
    .then (()=> {
      employeeTrack ()
    })
  }