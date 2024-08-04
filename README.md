# Clone
```
git clone https://github.com/AbnerCerqueira/sistema-de-armazenamento-de-arquivos.git
cd sistema-de-armazenamento-de-arquivos/
```

# Environment

## Mysql
```
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
```
## ENVs
```
MYSQL_HOST = "root"
MYSQL_PASSWORD = ""
MYSQL_DATABASE = "sistemaarmazenamento"
SECRET_JWT = "segredinho"
```

# Setup backend
```
cd backend/
npm i
npm run dev
```
![alt text](image-1.png)

# Setup frontend
```
cd frontend/
npm i
npm run dev
```
![alt text](image-2.png)

```
http://localhost:5173/login
```
![alt text](image-3.png)
![alt text](image-6.png)