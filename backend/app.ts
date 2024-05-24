import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import multer from 'multer'
import storage from './multer'

import { addUser, getUser } from './db/user'
import { addFile, getFiles } from './db/files'

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

    for (let i = 0; i < result.length; i++) { // loop caso tenha usuario com o msm username

        const confirmaSenha = await bcrypt.compare(dadosFornecidos.senha, result[i].senha)

        if (confirmaSenha) {
            // caso tudo de certo, retorna id e ususername
            return res.json({ id: result[i].id, username: result[i].username })
        }
    }
    // se n tiver confirmado senha ent manda isso:
    return res.json({ message: "Senha inválida" })
})


const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
    await addFile({
        nome_arquivo: req.file?.originalname,
        diretorio: req.file?.path
    })

    res.json({ message: "Arquivo upado com sucesso" })
})

app.get('/api/files', async (req: Request, res: Response) => {
    const result = await getFiles()

    res.json(result)
})


const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Iniciando o servidor na porta ${port}`)
})

type UserSession = {
    id: number,
    username: string
}