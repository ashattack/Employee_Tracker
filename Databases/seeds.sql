use employees; 

INSERT INTO department
    (name)

VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 1000, 1),
    ('Salesperson', 900, 1),
    ('Lead Engineer', 22900, 2),
    ('Software Engineer', 110000, 2),
    ('Account Manager', 260000, 3),
    ('Accountant', 600, 3),
    ('Legal Team Lead', 12000, 4),
    ('Lawyer', 19000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Poe', 3, NULL),
    ('Kevin', 'Gengir', 4, 3),
    ('Kuna', 'Lit', 5, NULL),
    ('Malia', 'White', 6, 5),
    ('Sarah', 'Loud', 7, NULL),
    ('Tim', 'Allen', 8, 7);
   
