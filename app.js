const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./Databases')
const process = require('process')
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
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
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
        case "ADD_DEPARTMENT":
            addDepartment()
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

async function addDepartment() {
    await inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What would you like to name your new dept., Karen?",

        }
    ]).then(function (deptName) {
        console.log(deptName);
        db.addDepartment(deptName.deptName)
        db.findAllDepartments().then((dept) => {
            console.log("\n");
            console.table(dept);
            loadMainMenu();
        })
    })
}

init()
