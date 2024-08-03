CREATE DATABASE sistemaarmazenamento;

USE sistemaarmazenamento;

CREATE TABLE user(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username_user VARCHAR(50) UNIQUE NOT NULL,
    password_user VARCHAR(400) NOT NULL
);

CREATE TABLE file(
    id_file INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(400) NOT NULL,
    dir_file VARCHAR(400) NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id_user)
);
