const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./Databases')
require("console.table");

function init() {
    const logoText = logo({ name: "Ashlyn's Employee Manager" }).render();
    console.log(logoText);
    loadMainMenu();
}

function loadMainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                }
            ]

        }
    ]).then(function (choices) {
        console.log(choices);
        handleChoices(choices);

    })
}
function handleChoices(choices) {
    switch (choices.choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees()

    }
}

async function viewEmployees() {
    const employees = await db.findAllEmployees()
    console.log("\n");
    console.table(employees);
}

init()