import mysql2 from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const con = mysql2.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'projetotsreact'
}).promise()



async function conectar(): Promise<void>{
    try {
        await con.connect()
        console.log("Conectado ao banco de dados")
        return
    } catch (err) {
        console.log("Erro ao conectar com banco dados\n" + err)
        return
    }
}

conectar()

export default con