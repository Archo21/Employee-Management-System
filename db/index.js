const connection = require ("./connection")

class DB {
    constructor(connection){
    this.connection = connection
    }
findAllEmployees (){
    return this.connection.promise().query(
        "select employee.id, employee.first_name,employee.last_name,role.title,department.name as department,role.salary,concat(manager.first_name,' ',manager.last_name)as manager FROM employee LEFT JOIN role on employee.role_id =role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    )
}
findAllEmployeesByManager(managerId){
return this.connection.promise().query(
    "select employee.id ,employee.first_name,employee.last_name,role.title,department.name as department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department on department.id = role.department_id WHERE manager_id = ? ;",
    managerId
)
}
findAllEmployeesByDepartment(departmentId){
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
    )
}
findAllRole(){
    return this.connection.promise().query(
        "select role.id,role.title,department.name as department,role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    )
}
addRole(role){
return this.connection.promise().query(
    "INSERT INTO role SET ?",
        role
)
}
removeRole(role_id){
    return this.connection.promise().query(
        "DELETE FROM role WHERE id= ?",
        role_id
    )
}
addEmployee(employee){
    return this.connection.promise().query(
        "INSERT INTO employee SET ?",
        employee
    )
}
removeEmployee(employee_id){
    return this.connection.promise().query(
        "DELETE FROM employee WHERE id= ?",
        employee_id
    )
}
updateEmployee(employee_id,role_id){
    return this.connection.promise().query(
        "UPDATE employee SET role_id= ? WHERE id =?",
        [role_id, employee_id]
    )
}
updateEmployeeManager(employee_id,manager_id){
    return this.connection.promise().query(
        "UPDATE employee SET manager_id= ? WHERE id =?",
        [manager_id, employee_id]
    )
    }
    viewAllDepartment(){
        return this.connection.promise().query(
            "select department.id,department.name FROM department;"
        )
    }
    addDepartment(department){
        return this.connection.promise().query(
            "INSERT INTO department SET ?",
            department
        )
    }
    removeDepartment(department_id){
        return this.connection.promise().query(
            "DELETE FROM department WHERE id= ?",
            department_id
        )
    }
findAllButManager(manager_id){
    return this.connection.promise().query(
        "select id , first_name, last_name FROM employee WHERE id !=?",
        manager_id
    )
}
}
module.exports = new DB(connection)
