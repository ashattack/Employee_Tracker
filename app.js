const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./Databases')
const process = require('process');
// const { removeEmployee, updateEmpRole, updateEmpManager } = require('./Databases');
require("console.table");

function init() {
    const logoText = logo({ name: "Ashlyn's Employee Manager" }).render();
    console.log(logoText);
    loadMainMenu();
}

async function loadMainMenu() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                // {
                //     name: "Remove Employee",
                //     value: "REMOVE_EMPLOYEE"
                // },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                // {
                //     name: "Update Employee Manager",
                //     value: "UPDATE_EMPLOYEE_MANAGER"
                // },
                {
                    name: "Exit",
                    value: "EXIT"
                },
            ]

        }
    ])
    handleChoices(answers);
}

function handleChoices(choices) {
    switch (choices.choice) {
        case "VIEW_EMPLOYEES":
            viewEmployees()
            return;
        case "VIEW_ROLES":
            viewRoles()
            return;
        case "VIEW_DEPARTMENTS":
            viewDepartment()
            return;
        case "ADD_EMPLOYEE":
            addEmployee()
            return;
        case "ADD_ROLE":
            addRole()
            return;
        case "ADD_DEPARTMENT":
            addDepartment()
            return;
        case "REMOVE_EMPLOYEE":
            removeEmployee();
            return;
        case "UPDATE_EMPLOYEE_ROLE":
            updateEmpRole();
            return;
        case "UPDATE_EMPLOYEE_MANAGER":
            updateEmpManager();
            return;
        case "EXIT":
            console.log("Goodbye!")
            process.exit()
        default:
            console.error("The program should not reach this point. Please contact God for help.")
            return;
    }
}

async function viewEmployees() {
    const employees = await db.findAllEmployees()
    console.log(typeof (employees))
    console.log("\n");
    console.table(employees);
    loadMainMenu();
}

async function viewRoles() {
    const roles = await db.findAllRoles()
    console.log("\n");
    console.table(roles);
    loadMainMenu();
}

async function viewDepartment() {
    const department = await db.findAllDepartments()
    console.log("\n");
    console.table(department);
    loadMainMenu();
}

async function addEmployee() {
    const roles = await db.getRolesTable()
    console.log(roles);
    const role_titles = roles.map(role => role.title)
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of your new employee?",

        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of your new employee?",

        },
        {
            type: "list",
            name: "role",
            message: "What is your employees role?",
            choices: role_titles
        }
    ])
    console.log(answers);
    const roleId = roles.filter(r => r.title == answers.role)[0].id;
    db.addEmployee(answers.firstName, answers.lastName, roleId)
    db.findAllEmployees().then((employee) => {
        console.log("\n");
        console.table(employee);
        loadMainMenu();
    })
}
async function addRole() {
    const department = await db.getDepartmentTable()
    console.log(department);
    const department_titles = department.map(depart => depart.name)
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "RoleName",
            message: "What is the role you would like to add?",

        },
        {
            type: "input",
            name: "RoleSalary",
            message: "What is the roles salary?"
        },
        {
            type: "list",
            name: "department",
            message: "What is your roles department?",
            choices: department_titles
        }
    ])
    console.log(answers);
    const departmentId = department.filter(r => r.name == answers.department)[0].id;
   await db.addRole(answers.RoleName, answers.RoleSalary, departmentId)
    db.findAllRoles().then((role) => {
        console.log("\n");
        console.table(role);
        loadMainMenu();
    })
}
async function addDepartment() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the department you would like to add?",

        },
    ])
    console.log(answers);
    db.addDepartment(answers.departmentName)
    db.findAllDepartments().then((department) => {
        console.log("\n");
        console.table(department);
        loadMainMenu();
    })
}
// async function removeEmployee() {
//     const employees = await db.findAllEmployees()

// }

async function updateEmpRole() {
    const roles = await db.getRolesTable()
    console.log(roles);
    const role_titles = roles.map(role => role.title)

    const employees = await db.findAllEmployees()
    console.log(employees);
    const employee_names = employees.map(employee => `${employee.first_name} ${employee.last_name}`)

    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "chooseEmp",
            message: "Choose an employee",
            choices: employee_names
        },
        {
            type: "list",
            name: "chooseRole",
            message: "Choose role for employee",
            choices: role_titles
        }
    ])

    const roleId = roles.filter(r => r.title == answers.chooseRole)[0].id
    const empId = employees.filter(e => `${e.first_name} ${e.last_name}` == answers.chooseEmp)[0].id

    await db.updateEmpRole(empId, roleId)
    loadMainMenu();
}

// async function updateEmpManager() {


// }
init()
