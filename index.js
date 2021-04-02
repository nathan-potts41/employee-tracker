const { prompts } = require('inquirer');
var inquirer = require('inquirer');
const db = require('./db/database');

require('dotenv').config();

function exitTracker() {
    return console.log("Thank you for using Employee Tracker, Please press ctrl + c");
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
            {
                type: 'input',
                name: 'department',
                message: 'What is the department ID of the role?',
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
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', '${answers.department}')`;
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
                message: "What is the employee's last name?",
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
                type: 'confirm',
                name: 'manager',
                message: 'Is there a manager for this this employee?',
                when: (managerInput) => {
                    if (managerInput === false) {
                        return false
                    } else {
                        return {
                            type: 'number',
                            name: 'managerId',
                            message: "What is the manager's role id?",
                            validate: (roleIdInput) => {
                                if (roleIdInput) {
                                    return true
                                } else {
                                    return console.log("Please enter the manager's id")
                                }
                            }
                        }
                    }
                }
            },
        ])
        // Figure out how to input the roleID and managerId from a JOIN table stand point
        .then(function (answer) {
            if (answer.managerId) {
                const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleId}', '${answer.managerId}')`;
                db.query(sql, function (err, results) {
                    if (err) throw err;
                });
            } else {
                const sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleId}')`;
                db.query(sql, function (err, results) {
                    if (err) throw err;
                });
            }

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
    inquirer
        .prompt([
            {
                type: 'number',
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
                type: 'number',
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
        .then(function (answer) {
            db.query(`UPDATE employees SET role_id = '${answer.newRole}' WHERE role_id = '${answer.update}'`, function (err, result, fields) {
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