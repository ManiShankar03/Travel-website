use  company;
#1ST QUESTION
#to find no of employees in each department
SELECT dept_id, COUNT(*) AS employee_count FROM employee GROUP BY dept_id;
#to find average salary in each department
SELECT e.dept_id, AVG(e.salary_in_rs) AS avg_salary
FROM employee e
JOIN project p ON e.dept_id = p.department_controlled
GROUP BY e.dept_id;
#no of managers in each department
SELECT m.department_id, COUNT(*) AS manager_count
FROM manager m
GROUP BY m.department_id;
#no of dependents of employees with respect to the relationship of employee
SELECT relationship, COUNT(*) AS dependent_count
FROM dependent
GROUP BY relationship;
#to find maximum salary of employees in each department
SELECT e.dept_id, MAX(e.salary_in_rs) AS max_salary
FROM employee e
JOIN project p ON e.dept_id = p.department_controlled
GROUP BY e.dept_id;
#2 QUESTION
#TO FIND AVERAGE SALARY OF EMPLOYEES IN EACH DEPARTMENT  WITH RESPECT TO GENDER
SELECT e.dept_id, e.sex, AVG(e.salary_in_rs) AS avg_salary
FROM employee e
JOIN department d ON e.dept_id = d.dept_id
GROUP BY e.dept_id, e.sex;
#NO OF DEPENDENTS OF EMPLOYEES IN EACH DEPARTMENT
SELECT e.dept_id, COUNT(DISTINCT e.SSN) AS employees_with_dependents
FROM employee e
LEFT JOIN dependent d ON e.SSN = d.dependent_of_employee
GROUP BY e.dept_id;
#TOTAL AMOUNT SPENT AS SALARY FOR EMPLOYESS WITH RESPECT TO PROJECT
SELECT p.project_id, SUM(e.salary_in_rs) AS total_salary
FROM employee e
JOIN project p ON e.dept_id = p.department_controlled
GROUP BY p.project_id;
#NO OF DEPENDENTS OF EACH EMPLOYEES IN DEPARTMENT 3
SELECT e.SSN, e.dept_id, COUNT(d.dependent_name) AS num_dependents
FROM employee e
LEFT JOIN dependent d ON e.SSN = d.dependent_of_employee
WHERE e.dept_id = 'D003'
GROUP BY e.SSN, e.dept_id;
#DISPLAYING THE managers in the order of joining date to the company
SELECT m.manager_id, m.start_date  AS earliest_start_date
FROM manager m
GROUP BY m.manager_id ORDER BY m.start_date;
#3rd question
# to Show the average salary and the count of employees for each department:
SELECT d.dept_id, d.dept_name, AVG(e.salary_in_rs) AS avg_salary, COUNT(e.SSN) AS employee_count
FROM department d
JOIN employee e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name;

use fullstack;drop table users;
create table users(username varchar(30),password varchar(20));

insert into users values('name','password');
select * from users;
alter table users add column email varchar(30);
drop table users;
alter table users modify column email  varchar(30) primary key;

create table users(username varchar(30),email varchar(30) primary key,password varchar(30));
select * from users;
alter table destination modify column destination_id  varchar(20) primary key;

select * from users;
delete from users where email="mani2shankar2@gmail.com";

create table destination(destination_id varchar(20),Departure_point varchar(30),Arrival_point varchar(30));
INSERT INTO destination (destination_id, Departure_point, Arrival_point) VALUES
('D1', 'India', 'China'),
('D2', 'India', 'United States'),
('D3', 'India', 'United Kingdom'),
('D4', 'India', 'France'),
('D5', 'China', 'India'),
('D6', 'China', 'United States'),
('D7', 'China', 'United Kingdom'),
('D8', 'China', 'France'),
('D9', 'United States', 'India'),
('D10', 'United States', 'China'),
('D11', 'United States', 'United Kingdom'),
('D12', 'United States', 'France'),
('D13', 'United Kingdom', 'India'),
('D14', 'United Kingdom', 'China'),
('D15', 'United Kingdom', 'United States'),
('D16', 'United Kingdom', 'France'),
('D17', 'France', 'India'),
('D18', 'France', 'China'),
('D19', 'France', 'United States'),
('D20', 'France', 'United Kingdom');

create table booking(bookingid varchar(10) primary key,time timestamp,Departure_point varchar(30),Arrival_point varchar(30),Date_of_journey varchar(30),total_price decimal(10,2),FOREIGN KEY(Departure_point) references destination(Departue_point);

