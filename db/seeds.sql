USE employeeTrack_db;

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
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Don', 'Loe', 1, NULL),
    ('Emily', 'Tiany', 2, 1),
    ('Beryl', 'Rono', 3, NULL),
    ('Kevin', 'Dylan', 4, 3),
    ('Model', 'Ngure', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Atieno', 7, NULL),
    ('Timothy', 'Allen', 8, 7);