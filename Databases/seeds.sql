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
    ('Larry', 'Stove', 1, NULL),
    ('Bob', 'Burger', 2, 1),
    ('Ashley', 'Sanitizer', 3, NULL),
    ('Elon', 'Musk', 4, 3),
    ('Kuna', 'Light', 5, NULL),
    ('Malia', 'Pole', 6, 5),
    ('Nigel', 'Thornberry', 7, NULL),
    ('Tim', 'Allen', 8, 7);
    
   
