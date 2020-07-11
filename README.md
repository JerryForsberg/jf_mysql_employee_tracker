# jf_employee_tracker

This employee tracker app is a node command line interface that uses mysql to store the users data and make calls to retrieve that data.

The technologies used for this app include the following:
  - Mysql
  - node
    - npm packages for mysql, and inquirer
  - Javascript
  
The functionality of the app comes from the employee.js file. This file contains the connection to the database as well as the following functions:
    - The connection.connect, first checks if there is an error in the connection, if there is         not, then we run the runDb() function.
    
    - The runDb function uses inquirer.prompt with a raw list, so that the suer may select from a list of options which action they would like to take. Depending on the action the user selects, a certain function will run. For each option, there is an inquirer prompt, and then a query to the employee database depending on that answer.
      - addDept lets the user create a department, by inserting the department name into the             database.
      - addRole then will let the user add a role, select the department that the role belongs           to, and add a salary to that role. 
      - addEmployee lets the user add the first name, last name, and role and then inserts this           information into the employee table
      - viewDept lets the user view all department names
      - viewRoles does the same for available roles
      - viewEmployees lets the user see all employees
      - updateRole allows the user to update a single employees role by prompting first which             employee the user would like to update, and then set a new role for that employee
      
