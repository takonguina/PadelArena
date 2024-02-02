CREATE DATABASE mydb;

\c mydb

CREATE TABLE IF NOT EXISTS users(
    id_user SERIAL PRIMARY KEY,
    first_name VARCHAR(320) NOT NULL,
    last_name VARCHAR(320) NOT NULL,
    birthday TIMESTAMP NOT NULL,
    email VARCHAR(320) NOT NULL,
    password VARCHAR(64) NOT NULL,
    email_validated BOOLEAN NOT NULL DEFAULT FALSE,
    date_insert TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courts(
    id_court SERIAL PRIMARY KEY
);

-- Insert 4 courts
INSERT INTO courts DEFAULT VALUES;
INSERT INTO courts DEFAULT VALUES;
INSERT INTO courts DEFAULT VALUES;
INSERT INTO courts DEFAULT VALUES;

CREATE TABLE IF NOT EXISTS reservations(
    id_reservation SERIAL PRIMARY KEY,
    id_court INT NOT NULL,
    id_user INT NOT NULL,
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration_minutes INT NOT NULL,
    CONSTRAINT fk_court FOREIGN KEY(id_court) REFERENCES courts(id_court),
    CONSTRAINT fk_user FOREIGN KEY(id_user) REFERENCES users(id_user)
);