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

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?',
                validate: (titleInput) => {
                    if (titleInput) {
                        return true
                    } else {
                        return console.log(`Please enter a role title`)
                    }
                },
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
                validate: (salaryInput) => {
                    if (salaryInput) {
                        return true
                    } else {
                        return console.log(`Please enter a salary`)
                    }
                },
            },
            // figure out how to link this to the department.id
            {
                type: 'input',
                name: 'department',
                message: 'What is the department of the role?',
                validate: (departmentInput) => {
                    if (departmentInput) {
                        return true
                    } else {
                        return console.log(`Please enter a department`)
                    }
                },
            }
        ])
        .then(answers => {
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', '${answers.department})`;
            db.query(sql, function (err, results) {
                if (err) throw err;
            });
            return landingQuestions();
        })
};

function viewRoles() {
    db.query("SELECT * FROM roles", function (err, result, fields) {
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

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
                validate: (firstNameInput) => {
                    if (firstNameInput) {
                        return true
                    } else {
                        return console.log('Please enter first name')
                    }
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's first name?",
                validate: (lastNameInput) => {
                    if (lastNameInput) {
                        return true
                    } else {
                        return console.log('Please enter last name')
                    }
                }
            },
            {
                type: 'number',
                name: 'roleId',
                message: "What is the employee's role id?",
                validate: (roleIdInput) => {
                    if (roleIdInput) {
                        return true
                    } else {
                        return console.log("Please enter the employee's role id")
                    }
                }
            },
            {
                type: 'number',
                name: 'managerId',
                message: "If the employee is manager, what is the manager Id?",
            }
        ])
        // Figure out how to input the roleID and managerId from a JOIN table stand point
        .then(function (answer) {
            const sql = `INSERT INTO roles (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleId}', '${answer.managerId}')`;
            db.query(sql, function (err, results) {
                if (err) throw err;
            });
            return landingQuestions();
        })
};

function viewEmployees() {
    db.query("SELECT * FROM employees", function (err, result, fields) {
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

function updateEmployee() {
    db.query("SELECT * FROM employees", function (err, result, fields) {
        if (err) throw err;
        console.table(result)
    });
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'update',
                message: 'Please select the employee you would like to update by Id',
                validate: (updateInput) => {
                    if (updateInput) {
                        return true
                    } else {
                        console.log('Please enter the Id')
                    }
                }
            },
            {
                type: 'input',
                name: 'newRole',
                message: "What is the employee's new role?",
                validate: (newRoleInput) => {
                    if (newRoleInput) {
                        return true
                    } else {
                        return console.log("Please enter the employee's new role.")
                    }
                }
            },
            {
                type: 'list',
                name: 'return',
                message: 'Would you like to do something else?',
                choices: ['Yes', 'No']
            }
        ])
        .then( function (answer) {
            const sql = `UPDATE employees`
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

};









landingQuestions();