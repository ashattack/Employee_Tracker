const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./Databases')
const process = require('process');
const { removeEmployee, updateEmpRole, updateEmpManager } = require('./Databases');
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
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
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
// async function removeEmployee() {
//     const employees = await db.findAllEmployees()

// }

// async function updateEmpRole() {


// }

// async function updateEmpManager() {


// }
init()
