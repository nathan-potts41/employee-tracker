var inquirer = require('inquirer');
const db = require('./db/database');

require('dotenv').config();

const questions = () => {
    console.log(`
======================
TEAM PROFILE GENERATOR
======================
`
    )
    return inquirer.prompt([
        {
            type: 'list',
            name: 'Landing Choices',
            message: 'Which option would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add an Employee', 'Add a Role', 'Update an Employee Role'],
            filter: choiceInput => {
                let result = '';

                switch (choiceInput) {
                    case 'View All Departments':
                        result = viewDepartments();
                        break;
                    case 'View All Roles':
                        result = viewRoles();
                        break;
                    case 'View All Employees':
                        result = viewEmployees();
                        break;
                    case 'Add a Department':
                        result = addDepartment();
                        break;
                    case 'Add an Employee':
                        result = addEmployee();
                        break;
                    case 'Add a Role':
                        result = addRole();
                        break;
                    case 'Update an Employee Role':
                        result = updateEmployee();
                        break;
                }
            },
        },
    ])
}

function viewDepartments() {
    const sql = `SELECT * FROM departments`;
    
};
function viewRoles() {

};
function viewEmployees() {

};
function addDepartment() {

};
function addEmployee() {

};
function addRole() {

};
function updateEmployee() {

};

questions();