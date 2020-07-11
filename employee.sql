
DROP DATABASE IF EXISTS employee_tracker;

CREATE database employee_tracker;

use employee_tracker;

CREATE TABLE department (
    id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
    );

CREATE TABLE role (
    id INT(11) AUTO_INCREMENT PRIMARY KEY  NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT(11),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT(11) AUTO_INCREMENT PRIMARY KEY  NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(11),
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    manager_id INT(11)
    );