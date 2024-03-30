CREATE DATABASE softjobs;
\c softjobs;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE inventario (id SERIAL, nombre VARCHAR(50), categoria
VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);

CREATE TABLE usuarios ( 
    id SERIAL PRIMARY KEY, 
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(60) NOT NULL, 
    rol VARCHAR(25), 
    lenguage VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
     );

