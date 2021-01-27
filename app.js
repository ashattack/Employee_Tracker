const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./Databases')
require("console.table");

function init() {
    const logoText = logo({ name: "Ashlyn's Employee Manager" }).render();
    console.log(logoText);
}

init()