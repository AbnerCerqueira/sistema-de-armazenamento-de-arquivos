# Tutorial
- Abra o terminal e use os comandos:
- `git clone https://github.com/AbnerCerqueira/sistema-de-armazenamento-de-arquivos.git`
- `cd sistema-de-armazenamento-de-arquivos/`
## Setup Backend
- `cd backend/`
- `npm i` para instalar as dependências necessárias
- Inicie o servidor MySQL na sua máquina
- Execute o script a seguir no seu baco de dados MySQL
```
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
```

- No arquivo database.ts no diretódio backend, tem as configurações para se conectar com o banco![image](https://github.com/AbnerCerqueira/sistema-de-armazenamento-de-arquivos/assets/102826252/b35b67ea-b552-4918-a85d-de6022b57323)
- Se seu usário ou senha for diferente, altere diretamente no arquivo database.ts ou crie um arquivo .env no diretório backend e atribua ás variáveis suas configurações, exemplo:
- ![image](https://github.com/AbnerCerqueira/sistema-de-armazenamento-de-arquivos/assets/102826252/331ef5a5-4878-40c4-8a9c-df0b6ff4882b)
- Inicie o servidor com `npm run dev`
- ![image](https://github.com/AbnerCerqueira/sistema-de-armazenamento-de-arquivos/assets/102826252/41fe6788-36f9-4b4b-8b90-c2da21b36c04)

- Se alguma coisa diferente disse tiver aparecido, algum passo não foi seguido corretamente


## Setup Frontend
- Abra um novo terminal e acesse o diretório frontend
- `cd ..`
- ![image](https://github.com/AbnerCerqueira/sistema-de-armazenamento-de-arquivos/assets/102826252/c50fa702-4637-4669-87d4-9d3896b5be8d)

- `cd frontend/`
- `npm i`
- `npm run dev`
- Coloque na url do seu navegador o endereço que foi mostrado no terminal
- ![image](https://github.com/AbnerCerqueira/sistema-de-armazenamento-de-arquivos/assets/102826252/71607188-f2cb-4d01-aaec-036580a0f7f9)

![image](https://github.com/AbnerCerqueira/sistema-de-armazenamento-de-arquivos/assets/102826252/89c6f768-05f9-4b1e-9b70-b327b93a97b1)



