import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { addUser, getUser } from './db/user'
import con from './db/database'

const app = express()

app.use(express.json())

app.post('/api/cadastro', async (req: Request, res: Response) => {
    const dadosFornecidos = req.body
    const senha: string = await bcrypt.hash(dadosFornecidos.senha, 10) // deixar a senha protegida

    await addUser({
        ...dadosFornecidos,
        senha // inserir no banco a senha protegida
    })
    res.end()
})

app.post('/api/login', async (req: Request, res: Response) => {
    const dadosFornecidos = req.body

    if (dadosFornecidos.username == '' || dadosFornecidos.senha == '') {
        return res.json({ message: "Preencha os campos vazios" })
    }

    const result = await getUser(dadosFornecidos.username)
    if (!result.length) { // validar username
        return res.json({ message: "Usuário não encontrado" })
    }

    let confirmaSenha: boolean | null = null
    let user = {}
    for (let i = 0; i < result.length; i++) { // loop caso tenha usuario com o msm username

        confirmaSenha = await bcrypt.compare(dadosFornecidos.senha, result[i].senha)

        user = {
            id: result[i].id,
            username: result[i].username
        }
    }

    if (!confirmaSenha) { // validar senha
        return res.json({ message: "Senha inválida" })
    }

    // caso tudo de certo, retorna id e ususername
    return res.json( user )
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Iniciando o servidor na porta ${port}`)
})
