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
![image-1](https://github.com/user-attachments/assets/3900b51e-66b1-43b8-8b14-c1df9b6dd7ef)

# Setup frontend
```
cd frontend/
npm i
npm run dev
```
![image-2](https://github.com/user-attachments/assets/5d24c05b-2091-4fa3-a0cb-b9be17e301ee)

```
http://localhost:5173/login

```
![image-3](https://github.com/user-attachments/assets/9055ede2-2203-40c8-a528-df9e9ab1d49f)
![image-6](https://github.com/user-attachments/assets/6e6678b4-7234-4dfa-a664-f8fc00733326)
