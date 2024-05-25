import con from './database'

type Files = {
    nome_arquivo: string | undefined,
    diretorio: string | undefined,
    id_pessoa: number | undefined
}

export async function addFile(dados: Files) {
    const sql = 'INSERT INTO arquivos SET ?'
    const [rows] = await con.query(sql, dados)

    return rows
}

export async function getFiles(id_pessoa: number) {
    const sql = 'SELECT * FROM arquivos WHERE id_pessoa = ?'
    const [rows] = await con.query(sql, id_pessoa)

    return rows
}
export async function deleteFile(id_arquivo: number) {
    const sql = 'DELETE FROM arquivos WHERE id_arquivo = ?'
    await con.query(sql, id_arquivo)
}