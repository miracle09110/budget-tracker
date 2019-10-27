
CREATE DATABASE budget;

\c budget

BEGIN;

CREATE TABLE expense (
   id SERIAL,
   priority varchar(255),
   name varchar(255),
   description varchar(255),
   amount_per_month INT,
   valid_from DATE,
   valid_till DATE,
   last_updated timestamp,
   PRIMARY KEY (id)
);

CREATE TABLE wallet (
   id SERIAL,
   name varchar(255),
   type varchar(255),
   last_updated TIMESTAMP,
   PRIMARY KEY (id)
);

CREATE TABLE influx (
   id SERIAL,
   amount INT,
   budgeted BOOL,
   description varchar(255),
   wallet_id INT,
   last_updated TIMESTAMP,
   PRIMARY KEY (id),
   FOREIGN KEY (wallet_id) REFERENCES wallet (id) ON UPDATE CASCADE

);

CREATE TABLE transaction (
   id SERIAL,
   expense_id INT,
   amount INT,
   type varchar(255),
   wallet_id INT,
   transaction_date DATE,
   updated TIMESTAMP,
   PRIMARY KEY (id),
   FOREIGN KEY (expense_id) REFERENCES expense (id) ON UPDATE CASCADE,
   FOREIGN KEY (wallet_id) REFERENCES wallet (id) ON UPDATE CASCADE
);

COMMIT;
