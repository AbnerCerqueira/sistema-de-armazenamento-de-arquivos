-- Active: 1715288619464@@127.0.0.1@3306@projetotsreact
create database projetotsreact;

use projetotsreact;

create table pessoas(
    id int  primary key AUTO_INCREMENT,
    username varchar(50),
    senha varchar(500)
);

