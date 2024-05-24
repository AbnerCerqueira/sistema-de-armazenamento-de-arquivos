import con from './database'

type Files = {
    nome_arquivo: string | undefined,
    diretorio: string | undefined
}

export async function addFile(dados: Files) {
    let sql = 'INSERT INTO arquivos SET ?'
    const [rows] = await con.query(sql, dados)

    return rows
}

export async function getFiles() {
    let sql = 'SELECT * FROM arquivos'
    const [rows] = await con.query(sql)

    return rows
}