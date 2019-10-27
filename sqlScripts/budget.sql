
CREATE DATABASE budget;

\c budget

BEGIN;

CREATE TABLE recurring_expense (
   id SERIAL,
   priority varchar(255),
   name varchar(255),
   description varchar(255),
   amount_per_month INT,
   in_use BOOL,
   valid_till DATE,
   last_updated timestamp,
   PRIMARY KEY (id)
);

CREATE TABLE non_recurring_expense (
    id SERIAL,
    priority varchar(255),
    name varchar(255),
    valid_start_date DATE,
    valid_end_date  DATE,
    amount_per_month INT,
    last_updated TIMESTAMP,
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
   recurring_expense_id INT,
   non_recurring_expense_id INT,
   amount INT,
   type varchar(255),
   wallet_id INT,
   transaction_date DATE,
   updated TIMESTAMP,
   PRIMARY KEY (id),
   FOREIGN KEY (recurring_expense_id) REFERENCES recurring_expense (id) ON UPDATE CASCADE,
   FOREIGN KEY (non_recurring_expense_id) REFERENCES non_recurring_expense (id) ON UPDATE CASCADE,
   FOREIGN KEY (wallet_id) REFERENCES wallet (id) ON UPDATE CASCADE
);

COMMIT;
