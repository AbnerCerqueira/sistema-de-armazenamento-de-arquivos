create database projetotsreact;

use projetotsreact;

create table pessoas(
    id int  primary key AUTO_INCREMENT,
    username varchar(50),
    senha varchar(500)
);

select * from pessoas WHERE username = 'fodase';