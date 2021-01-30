const connection = require("./connection")

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name As department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id"
        );
    }
    findAllRoles() {
        return this.connection.query(
            "SELECT role.title, role.salary, department.name FROM role LEFT JOIN department on role.department_id = department.id"
        );
    }
    findAllDepartments() {
        return this.connection.query(
            "SELECT department.name FROM department "
        )
    }
    getRolesTable() {
        return this.connection.query("SELECT * FROM role");
    }
    getDepartmentTable() {
        return this.connection.query("SELECT * FROM department");
    } 

    addEmployee(firstName, lastName, roleId) {
        return this.connection.query(
            `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', ${roleId})`
        )
    }
    addRole(RoleName, RoleSalary, department) {
        return this.connection.query(
            `INSERT INTO role (title, salary, department_id) VALUES ('${RoleName}', '${RoleSalary}', ${department})`
        )
    }
    addDepartment(departmentName) {
        return this.connection.query(
            `INSERT INTO department (name) VALUES ('${departmentName}')`
        )
    }

    removeEmployee() {
        return this.connection.query(

        )
    }
    updateEmpRole(empId, roleId) {
        return this.connection.query(
            `UPDATE employee SET role_id = ${roleId} WHERE id = ${empId} `
        )
    }
    updateEmpManager() {
        return this.connection.query(

        )
    }
}


module.exports = new DB(connection)


// insert into TABLE_NAME values (VALUE_TO_INSERT)
