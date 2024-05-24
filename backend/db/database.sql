create database projetotsreact;

use projetotsreact;

create table pessoas(
    id int  primary key AUTO_INCREMENT,
    username varchar(50),
    senha varchar(500)
);

create table arquivos(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome_arquivo varchar(200),
    diretorio varchar(200)
);
