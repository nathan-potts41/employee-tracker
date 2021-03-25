var inquirer = require('inquirer');
const db = require('./db/database');

require('dotenv').config();

function exitTracker() {
    return
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What department would you like to add?',
                validate: (departmentInput) => {
                    if (departmentInput) {
                        return true
                    } else {
                        return console.log(`Please enter a Department`)
                    }
                },
            }
        ])
        .then(answers => {
            const sql = `INSERT INTO departments (name) VALUES ('${answers.department}')`;
            db.query(sql, function (err, results) {
                if (err) throw err;
            });
            return landingQuestions();
        })
};

function viewDepartments() {
    db.query("SELECT * FROM departments", function (err, result, fields) {
        if (err) throw err;
        console.table(result)
    });
    inquirer.prompt([
        {
            type: 'list',
            name: 'return',
            message: 'Would you like to do something else?',
            choices: ['Yes', 'No']
        }
    ])
        .then(function (answer) {
            if (answer.return === 'Yes') {
                landingQuestions();
            } else {
                exitTracker();
            }
        })
};

function landingQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Which option would you like to do?',
            choices: ['View-Departments', 'View-Roles', 'View-Employees', 'Add-Department', 'Add-Employee', 'Add-Role', 'Update-Employee'],
        }])
        .then(function (answer) {

            switch (answer.choice) {
                case 'View-Departments':
                    result = viewDepartments();
                    break;
                case 'View-Roles':
                    result = viewRoles();
                    break;
                case 'View-Employees':
                    result = viewEmployees();
                    break;
                case 'Add-Department':
                    result = addDepartment();
                    break;
                case 'Add-Employee':
                    result = addEmployee();
                    break;
                case 'Add-Role':
                    result = addRole();
                    break;
                case 'Update-Employee':
                    result = updateEmployee();
                    break;
            }
        })

}



// };
// function viewRoles() {

// };
// function viewEmployees() {

// };

// function addEmployee() {

// };
// function addRole() {

// };
// function updateEmployee() {

// };

landingQuestions();