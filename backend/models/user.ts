import con from './database'

export async function addUser(dados: string) {
    let sql = 'INSERT INTO pessoas SET ?'
    const [result] = await con.query(sql, dados)
    return result
}

export async function getUser() {
    let sql = 'SELECT * FROM pessoas'
    const [result] = await con.query(sql)
    return result
}