const fs = require('fs');
const DB =require("./db")
const inquirer = require('inquirer');
const { addDepartment } = require('./db');
const { BADFAMILY } = require('dns');
const { title } = require('process');
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
          "View all department",
          "View all employees by department",
          "View all employees by Manager",
          "Update employees by Manager",
          "Add Employee",
          "Remove Employee",
          "View Employee Role",
          "Add Employee Role",
          "Update Employee Role",
          "Update Employee Manager",
          "Add Department",
          "Remove Department",
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
          case "View all department":
            viewAllDepartment();
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
  
            case "Add Employee Role":
            addEmployeeRole();
            break;

            case "Remove Employee Role":
            removeEmployeeRole();
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

          case "exit":
            exit();
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
    DB.findAllEmployees()
      .then (([rows])=> {
        let manager = rows
        const managerChoices = manager.map(({id,first_name,last_name})=>({
          name:`${first_name} ${last_name}`,
        value:id, 
        }))
      inquirer.prompt([
        {
          name:"managerId",
          type:"list",
          message:"which department are they from?",
          choices:managerChoices
  
        }
      ])
      .then ((response)=>{
        return DB.findAllEmployeesByManager(response.managerId)
      })
      .then (([rows])=> {
        let employees =rows
        console.log("\n");
        if (employees.length === 0){
          console.log("employee has no manager")
        }else{
          console.table(employees);
        }
        
      })
      .then(()=>{
        employeeTrack ()
      })
        
      })
    }
    const viewAllDepartment = () => {
      DB.viewAllDepartment()
      .then (([rows])=> {
        let department =rows
        console.log("\n");
        console.table(department);
      })
      .then (()=> {
        employeeTrack ()
      })}

  const updateEmployeeByManager = () => {
    DB.findAllEmployees()
      .then (([rows])=> {
        let employees = rows
        const employeeChoices = employees.map(({id,first_name,last_name})=>({
          name:`${first_name} ${last_name}`,
        value:id, 
        }))
      inquirer.prompt([
        {
          name:"employeeId",
          type:"list",
          message:"which employee do you want update?",
          choices:employeeChoices
  
        }
      ])
      .then((res)=>{
        let employeeId = res.employeeId
        console.log(employeeId)
        DB.findAllButManager(employeeId)
        .then (([rows])=> {
          let manager = rows
          const managerChoices = manager.map(({id,first_name,last_name})=>({
            name:`${first_name} ${last_name}`,
          value:id, 
          }))
        inquirer.prompt([
          {
            name:"managerId",
            type:"list",
            message:"which employee do you want to update?",
            choices:managerChoices
    
          }
        ])
        .then((res)=>{
          DB.updateEmployeeManager(employeeId,res.managerId)
        })
        .then(()=>{
          console.log("manager updated")
        })
        .then(()=>{
          employeeTrack()
        })

        
      })
  })
})
}
  const addEmployee = () => {
   
   inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "Enter Employee First name"
    }, 
    {
      name: "last_name",
      type: "input",
      message: "Enter Employee Last name" 
    }])
    .then ((response)=>{
      let first_name = response.first_name
      let last_name = response.last_name
      DB.findAllRole()
      .then(([rows])=>{
        let roles =rows
        const roleChoices =roles.map(({id,title})=>({
          name: title,
          value: id,
        }))
        inquirer .prompt({
      name: "roleId",
      type: "list",
      message: "What role do the Employee have?",
      choices:roleChoices,
    
        })
        .then((res)=>{
          let roleId =res.roleId
          DB.findAllEmployees()
          .then(([rows])=>{
            let employees =rows
            const managerChoices =employees.map(({id,first_name,last_name})=>({
              name:`${first_name} ${last_name}`,
              value: id
            }))
            managerChoices.unshift({name:"None", value:null })
            inquirer .prompt({
              name: "managerId",
              type: "list",
              message: "What manager do the Employee have?",
              choices:managerChoices,
             
        
                })
                .then(( res)=>{
                  let employee={
                    manager_id:res.managerId,
                    role_id:roleId,
                    first_name:first_name ,
                    last_name:last_name,
                  }
                  DB.addEmployee(employee)
                })
                .then(()=>{
                  console.log("employee added to database")
                })
                .then(()=>{
                  employeeTrack()
                })
          })
        })

      })

    })
   
  }
  const removeEmployee= () => {
    DB.findAllEmployees()
    .then(([rows])=>{
      let employees = rows
      const employeeChoices =employees.map(({id,first_name,last_name})=>({
        name:`${first_name} ${last_name}`,
        value: id
      }))
   
    inquirer
    .prompt({
      name: "employeeRemove",
      type: "list",
      message: "What employee would you like to remove?",
      choices: employeeChoices
    })
    .then ((res)=> {
      DB.removeEmployee(res.employeeRemove)
    })
    .then(()=>{
      console.log("employee deleted succesful")
    })
    .then (()=> {
      employeeTrack ()
    })
  })
  }
  const employeeRoleView = () => {
    DB.findAllRole()
    .then (([rows])=> {
      let roles =rows
      console.log("\n");
      console.table(roles);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const addEmployeeRole= () => {
    DB.viewAllDepartment()
    .then(([rows])=>{
      let department =rows
      const departmentChoices =department.map(({
        id,name
      })=>({
        name:name,
        value:id,
      }))
      inquirer
    .prompt([{
      name: "title",
      type: "input",
      message: "what is the name of the role?",

    },
  {name: "salary",
  type: "input",
  message: "what is the salary?",
},{
  name: "department_id",
      type: "list",
      message: "which department does the role belong to?",
      choices: departmentChoices
}
  ])
  .then((role)=>{
    DB.addRole(role)
    .then(()=>{
      console.log(`${role.title}added`)
     
    })
    .then (()=> {
      employeeTrack ()
    })
  })

    })
    
    
  }
  const removeEmployeeRole = () => {
    DB.removeRole()
    inquirer
    .prompt({
      name: "removeEmployeeRole",
      type: "input",
      message: "Enter Employee Id"
    })
    .then (([rows])=> {
      let roles =rows
      console.log("\n");
      console.table(roles);
    })
    .then (()=> {
      employeeTrack ()
    })
  }
  const employeeRoleUpdate = () => {
    DB.findAllEmployees()
      .then (([rows])=> {
        let employees = rows
        const employeeChoices = employees.map(({id,first_name,last_name})=>({
          name:`${first_name} ${last_name}`,
        value:id, 
        }))
      inquirer.prompt([
        {
          name:"employeeId",
          type:"list",
          message:"which employee role do you want update?",
          choices:employeeChoices
  
        }
      ])
      .then((res)=>{
        let employeeId = res.employeeId
        
        DB.findAllRole()
        .then (([rows])=> {
          let role = rows
          const roleChoices = role.map(({id,title})=>({
            name:title,
          value:id, 
          }))
        inquirer.prompt([
          {
            name:"roleId",
            type:"list",
            message:"what is the employee new role do you want to update?",
            choices:roleChoices
    
          }
        ])
        .then((res)=>{
          DB.updateEmployee(employeeId,res.roleId)
        })
        .then(()=>{
          console.log("roleupdated")
        })
        .then(()=>{
          employeeTrack()
        })

        
      })
  })
})
  }
  const departmentAdd= () => {
    inquirer
    .prompt([{
      name: "name",
      type: "input",
      message: "what is the name of the department?"
    }, 
    ])
    .then ((res)=> {
      let name =res
      DB.addDepartment(name)
      .then(()=>{
        console.log("departmnet Added")
      })
      .then(()=>{
        employeeTrack()
      })
    })
  }
  const departmentRemove= () => {
    DB.viewAllDepartment()
    .then(([rows])=>{
      let department=rows
      const departmentChoices =department.map(({
        id,name
      })=>({
        name:name,
        value:id,
      }))

    
    inquirer
    .prompt({
      name: "removeDepartment",
      type: "list",
      message: "which department would like to remove?",
      choices:departmentChoices,
    })
    .then ((res)=> {
      DB.removeDepartment(res.removeDepartment)
      .then(()=>{
        console.log("department Deleted")
      })
    
    .then (()=> {
      employeeTrack ()
    })
  })
})
  }
  
  const exit= () => {
    console.log("exit")
    process.exit()
  }