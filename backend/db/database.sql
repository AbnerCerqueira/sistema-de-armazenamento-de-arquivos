create database projetotsreact;

use projetotsreact;

create table pessoas(
    id_pessoa int  primary key AUTO_INCREMENT,
    username varchar(50),
    senha varchar(500)
);

create table arquivos(
    id_arquivo int PRIMARY KEY AUTO_INCREMENT,
    nome_arquivo varchar(200),
    diretorio varchar(200),
    id_pessoa int,
    CONSTRAINT fk_ArquivoPessoa FOREIGN KEY(id_pessoa)
    REFERENCES pessoas(id_pessoa)
);