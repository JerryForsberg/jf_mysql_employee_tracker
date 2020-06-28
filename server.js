const mysql = require("mysql");
const inquirer = require("inquirer");

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
                //call addRole function
                break;

            case "Add an employee":
                //call addEmployee function
                break;

            case "View departments":
                //call viewDept function
                break;

            case "View roles":
                //call viewRoles function
                break;

            case "View employees":
                //call viewEmployees function
                break;

            case "Update employee role":
                //call updateRole function
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
                "INSERT INTO departments SET ?",
                {
                    dept_name: answer.dept
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created succesfully!");
                    runDb();
                }
            );
        });
}
