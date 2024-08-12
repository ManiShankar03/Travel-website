DROP DATABASE LAB6;
create database lab6;
use lab6;
-- Create employee table
CREATE TABLE employee (
    person_name VARCHAR(50),
    street VARCHAR(50),
    city VARCHAR(50),
    PRIMARY KEY (person_name)
);

-- Create company table
CREATE TABLE company (
    company_name VARCHAR(50),
    city VARCHAR(50),
    PRIMARY KEY (company_name),
    UNIQUE KEY (city)
);

-- Create position table
CREATE TABLE position (
    person_name VARCHAR(50),
    company_name VARCHAR(50),
    salary INT,
    PRIMARY KEY (person_name, company_name),
    FOREIGN KEY (person_name) REFERENCES employee(person_name),
    FOREIGN KEY (company_name) REFERENCES company(company_name)
);

-- Create branch table
CREATE TABLE branch (
    branch_name VARCHAR(50),
    branch_city VARCHAR(50),
    assets INT,
    PRIMARY KEY (branch_name),
    FOREIGN KEY (branch_city) REFERENCES company(city)
);

-- Create customer table
CREATE TABLE customer (
    customer_name VARCHAR(50),
    customer_street VARCHAR(50),
    customer_city VARCHAR(50),
    PRIMARY KEY (customer_name)
);

-- Create loan table
CREATE TABLE loan (
    loan_number INT,
    branch_name VARCHAR(50),
    amount INT,
    PRIMARY KEY (loan_number),
    FOREIGN KEY (branch_name) REFERENCES branch(branch_name)
);

-- Create borrower table
CREATE TABLE borrower (
    borrower_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(50),
    loan_number INT,
    FOREIGN KEY (customer_name) REFERENCES customer(customer_name),
    FOREIGN KEY (loan_number) REFERENCES loan(loan_number)
);

-- Create account table
CREATE TABLE account (
    account_number INT,
    branch_name VARCHAR(50),
    balance INT,
    PRIMARY KEY (account_number),
    FOREIGN KEY (branch_name) REFERENCES branch(branch_name)
);

-- Create depositor table
CREATE TABLE depositor (
    depositor_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(50),
    account_number INT,
    FOREIGN KEY (customer_name) REFERENCES customer(customer_name),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
);

-- Insert data into employee table
INSERT INTO employee VALUES
('John Doe', '123 Main St', 'New York'),
('Alice Smith', '456 Oak St', 'Los Angeles'),
('Bob Johnson', '789 Pine St', 'Chicago'),
('Eva Davis', '101 Elm St', 'New York'),
('Michael White', '202 Maple St', 'Los Angeles'),
('Sarah Brown', '303 Cedar St', 'Chicago'),
('David Wilson', '404 Birch St', 'New York'),
('Emily Miller', '505 Walnut St', 'Los Angeles'),
('Tom Anderson', '606 Cherry St', 'Chicago'),
('Olivia Garcia', '707 Pineapple St', 'New York');

-- Insert data into company table
INSERT INTO company VALUES
('ABC Corp', 'New York'),
('XYZ Ltd', 'Los Angeles'),
('123 Inc', 'Chicago'),
('Tech Solutions', 'San Francisco'),
('Global Innovations', 'Seattle'),
('City Services', 'Austin'),
('Data Systems', 'Boston'),
('Infinite Networks', 'Denver'),
('Power Solutions', 'Atlanta'),
('Future Enterprises', 'Miami');

-- Insert data into position table
INSERT INTO position VALUES
('John Doe', 'ABC Corp', 60000),
('Alice Smith', 'XYZ Ltd', 75000),
('Bob Johnson', '123 Inc', 50000),
('Eva Davis', 'Tech Solutions', 65000),
('Michael White', 'Global Innovations', 80000),
('Sarah Brown', 'City Services', 55000),
('David Wilson', 'Data Systems', 70000),
('Emily Miller', 'Infinite Networks', 90000),
('Tom Anderson', 'Power Solutions', 60000),
('Olivia Garcia', 'Future Enterprises', 75000);

-- Insert data into branch table
INSERT INTO branch VALUES
('Main Branch', 'New York', 1000000),
('West Branch', 'Los Angeles', 800000),
('North Branch', 'Chicago', 600000),
('East Branch', 'New York', 1200000),
('South Branch', 'Los Angeles', 900000),
('Central Branch', 'Chicago', 700000),
('Downtown Branch', 'New York', 1100000),
('Uptown Branch', 'Los Angeles', '850000'),
('Midtown Branch', 'Chicago', 650000),
('Suburban Branch', 'New York', 1000000);

-- Insert data into customer table
INSERT INTO customer VALUES
('Customer1', '101 First St', 'New York'),
('Customer2', '202 Second St', 'Los Angeles'),
('Customer3', '303 Third St', 'Chicago'),
('Customer4', '404 Fourth St', 'New York'),
('Customer5', '505 Fifth St', 'Los Angeles'),
('Customer6', '606 Sixth St', 'Chicago'),
('Customer7', '707 Seventh St', 'New York'),
('Customer8', '808 Eighth St', 'Los Angeles'),
('Customer9', '909 Ninth St', 'Chicago'),
('Customer10', '1010 Tenth St', 'New York');

-- Insert data into loan table
INSERT INTO loan VALUES
(101, 'Main Branch', 5000),
(102, 'West Branch', 10000),
(103, 'North Branch', 7500),
(104, 'East Branch', 12000),
(105, 'South Branch', 9000),
(106, 'Central Branch', 6000),
(107, 'Downtown Branch', 11000),
(108, 'Uptown Branch', 8500),
(109, 'Midtown Branch', 7000),
(110, 'Suburban Branch', 9500);

-- Insert data into borrower table
INSERT INTO borrower (customer_name, loan_number) VALUES
('Customer1', 101),
('Customer2', 102),
('Customer3', 103),
('Customer4', 104),
('Customer5', 105),
('Customer6', 106),
('Customer7', 107),
('Customer8', 108),
('Customer9', 109),users
('Customer10', 110);

-- Insert data into account table
INSERT INTO account VALUES
(201, 'Main Branch', 15000),
(202, 'West Branch', 20000),
(203, 'North Branch', 10000),
(204, 'East Branch', 25000),
(205, 'South Branch', 18000),
(206, 'Central Branch', 12000),
(207, 'Downtown Branch', 22000),
(208, 'Uptown Branch', 17000),
(209, 'Midtown Branch', 14000),
(210, 'Suburban Branch', 19000);

-- Insert data into depositor table
INSERT INTO depositor (customer_name, account_number) VALUES
('Customer1', 201),
('Customer2', 202),
('Customer3', 203),
('Customer4', 204),
('Customer5', 205),
('Customer6', 206),
('Customer7', 207),
('Customer8', 208),
('Customer9', 209),
('Customer10', 210);

ALTER TABLE employee
MODIFY street VARCHAR(50) NOT NULL,
MODIFY city VARCHAR(50) NOT NULL;

ALTER TABLE loan
ADD CHECK (amount >0);

ALTER TABLE account
MODIFY balance INT DEFAULT 0;

ALTER TABLE loan
ADD UNIQUE KEY (loan_number);

ALTER TABLE depositor
ADD FOREIGN KEY (customer_name) REFERENCES customer(customer_name),
ADD FOREIGN KEY (account_number) REFERENCES account(account_number);
select * from depositor;
select * from position;

create table table1(id varchar(10));

select * from DEPOSITOR;
DESC account;
create table users (usern varchar(
select * from users;
select * from destination;
drop table countries;
create table countries(country_id varchar(10) ,country_name varchar(30), primary key(country_id,country_name));
insert into countries values('C01','India'),('C02','France'),('C03','United States'),('C04','United Kingdom'),('C05','China');




CREATE TABLE destination(
    destination_id VARCHAR(10) PRIMARY KEY,
    Departure_country_id VARCHAR(10),
    Departure_country_name VARCHAR(30),
    Arrival_country_id VARCHAR(10),
    Arrival_country_name VARCHAR(30),
    FOREIGN KEY (Departure_country_id, Departure_country_name) REFERENCES countries(country_id, country_name),
    FOREIGN KEY (Arrival_country_id, Arrival_country_name) REFERENCES countries(country_id, country_name)
);
INSERT INTO destination 

VALUES 
('D01', 'C01', 'India', 'C02', 'France'),('D02', 'C03', 'United States', 'C05', 'China'),('D03', 'C04', 'United Kingdom', 'C01', 'India'),('D04', 'C02', 'France', 'C03', 'United States'),('D05', 'C05', 'China', 'C04', 'United Kingdom');
insert into destination values('D06','C01','India','C03','United States');
select * from users;
create table hotel(hotel_id varchar(10) primary key,destination_id varchar(10),type varchar(10),base_price decimal(10,2),foreign key(destination_id) references destination(destination_id));
insert into hotel values('H01','D01','3 star',540.00),('H02','D01','4 star',810.00),('H03','D01','5 star',1350);
select * from hotel;
create table flight(flight_id varchar(10) primary key,destination_id varchar(10),type varchar(10),base_price decimal(10,2),foreign key(destination_id) references destination(destination_id));
insert into flight values('F01','D01','Economy',900),('F02','D01','Business',3000);
select * from flight;
select * from destination;
select * from extraexpense;
create table extraexpense(expense_id varchar(10) primary key,destination_id varchar(10),base_price decimal(10,2),foreign key(destination_id) references destination(destination_id));
insert into extraexpense values('E01','D01',100);
create table activities(activities_id varchar(10) primary key,destination_id varchar(10),base_price decimal(10,2),description text,foreign key(destination_id) references destination(destination_id));
insert into activities values('A01','D01',365,'Visiting the Eiffel Tower in Paris,Louvre Museum,Wine Tasting in Bordeaux,River Cruise on the Seine,Day Trip to Mont Saint-Michel');

show tables;
desc table users;
create table booking(bookingid varchar(10) primary key,email varchar(30),booked_time timestamp,Departure_point varchar(30),Arrival_point varchar(30),Date_of_journey varchar(30),total_price decimal(10,2),foreign key(email) references users(email));


