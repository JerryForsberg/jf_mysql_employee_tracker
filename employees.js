const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker"
});

connection.connect(function (err) {
    if (err) throw err;
    //place what you want the connection to do if there is no error. Create a function and call it here
    runDb();
});

function runDb() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add a department",
            "Add a role",
            "Add an employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee role"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "Add a department":
                addDept();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add an employee":
                addEmployee();
                break;

            case "View departments":
                viewDept();
                break;

            case "View roles":
                viewRoles();
                break;

            case "View employees":
                viewEmployees();
                break;

            case "Update employee role":
                updateRole();
                break;
        }
    });

}

function addDept() {
    inquirer
        .prompt({
            name: "dept",
            type: "input",
            message: "What is the name of the department that you would like to add?"
        })
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.dept
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created succesfully!");
                    runDb();
                }
            );
        });
}

function addRole() {
    // get list of all departments

    var departmentArray = [];
    var departmentNames = [];

    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        departmentArray = res;
        console.log("departments are", res);
        console.log("departmentsArray are", departmentArray);
        for (var i = 0; i < departmentArray.length; i++) {
            departmentNames.push(departmentArray[i].name)
        }


        console.log("departmentNames are", departmentNames);
        inquirer
            .prompt([
                {
                    name: "role",
                    type: "input",
                    message: "What role would you like to create?"
                },
                {
                    name: "dept",
                    type: "rawlist",
                    message: "Which department is this role a part of?",
                    choices: departmentNames
                },
                {
                    name: "salary",
                    type: "input",
                    message: "please enter the salary for this role"
                }
            ])
            .then(function (answer) {
                // turn deparment name back into deparment id.
                var departmentId;
                console.log("we think dept is ", answer.dept);
                for (var i = 0; i < departmentArray.length; i++) {
                    if (departmentArray[i].name === answer.dept)
                        departmentId = departmentArray[i].id;
                }
                console.log("departmentId that we found is: ", departmentId);
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.role,
                        department_id: departmentId,
                        salary: answer.salary,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your role was created succesfully!");
                        console.log(answer);
                        runDb();
                    }
                );
            });
    });


}

function addEmployee() {

    var roleArray = [];
    var roleNames = [];

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        roleArray = res;
        console.log("roles are", res);
        console.log("rolesArray are", roleArray);
        for (var i = 0; i < roleArray.length; i++) {
            roleNames.push(roleArray[i].title)
        }

        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What is the employees first name?"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is the employees last name?"
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "Which role does this employee have?",
                    choices: roleNames
                }
            ])
            .then(function (answer) {
                var roleId;
                console.log("we think role is ", answer.role);
                for (var i = 0; i < roleArray.length; i++) {
                    if (roleArray[i].title === answer.role)
                        roleId = roleArray[i].id;
                }
                console.log("roleId that we found is: ", roleId);
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: roleId
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your employee was created succesfully!");
                        runDb();
                    }
                );
            });
    });
}

function viewDept() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].name);
        }
        runDb();
    });
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].title);
        }
        runDb();
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].first_name} ${res[i].last_name}`);
        }
        runDb();
    });
}

function updateRole() {

    var employeeArray = [];
    var employeeNames = [];

    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;

        employeeArray = res;
        console.log("employees are", res);
        console.log("employeeeArray are", employeeArray);
        for (var i = 0; i < employeeArray.length; i++) {
            employeeNames.push(`${employeeArray[i].first_name} ${employeeArray[i].last_name}`);
        }

        var roleArray = [];
        var roleNames = [];

        connection.query("SELECT * FROM role", function (err, res) {
            if (err) throw err;

            roleArray = res;
            console.log("roles are", res);
            console.log("rolesArray are", roleArray);
            for (var i = 0; i < roleArray.length; i++) {
                roleNames.push(roleArray[i].title)
            }

            inquirer
                .prompt([
                    {
                        name: "employee",
                        type: "rawlist",
                        message: "Which employees role would you like to update?",
                        choices: employeeNames
                    },
                    {
                        name: "role",
                        type: "rawlist",
                        message: "What is this employees new role?",
                        choices: roleNames
                    },
                ])
                .then(function (answer) {
                    var roleId;
                    console.log("we think role is ", answer.role);
                    for (var i = 0; i < roleArray.length; i++) {
                        if (roleArray[i].title === answer.role)
                            roleId = roleArray[i].id;
                    }

                    var employeeId;
                    console.log("we think employee is ", answer.employee);
                    for (var i = 0; i < employeeArray.length; i++) {
                        if (employeeArray[i].first_name + " " + employeeArray[i].last_name === answer.employee)
                            employeeId = employeeArray[i].id;
                    }
                    console.log("roleId that we found is: ", roleId);
                    console.log("employee that we found is: ", employeeId);

                    connection.query(
                        "UPDATE employee set ? WHERE ?",
                        [
                            {
                                role_id: roleId
                            },
                            {
                                id: employeeId
                            }
                        ],
                        function (err) {
                            if (err) throw err;
                            console.log("Your role was updated succesfully!");
                            runDb();
                        }
                    );
                });

        });
    });

}



