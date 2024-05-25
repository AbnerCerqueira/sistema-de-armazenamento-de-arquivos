import { RowDataPacket } from 'mysql2'
import con from './database'

export async function addUser(dados: string) {
    let sql = 'INSERT INTO pessoas SET ?'
    const [rows] = await con.query(sql, dados)

    return rows
}

export async function getUser(user: string): Promise<RowDataPacket[]> {
    let sql = 'SELECT id_pessoa, username, senha FROM pessoas WHERE username = ?'
    const [rows] = await con.query<RowDataPacket[]>(sql, user)
    
    return rows
}