import express, { Request, Response } from 'express'
import session from 'express-session'
import bcrypt from 'bcrypt'
import multer from 'multer'
import storage from './multer'

import { addUser, getUser } from './db/user'
import { addFile, getFiles, deleteFile } from './db/files'

const app = express()

app.use(express.json())
app.use(session({
    secret: 'asdfasdf',
    resave: false,
    saveUninitialized: false
}))

declare module 'express-session' {
    interface SessionData {
        userId: number
        username: string
    }
}

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
            req.session.userId = result[i].id_pessoa
            req.session.username = result[i].username
            return res.json({ username: req.session.username })
        }
    }
    // se n tiver confirmado senha ent manda isso:
    return res.json({ message: "Senha inválida" })
})

app.get('/api/login', (req: Request, res: Response) => {
    res.json({ id_pessoa: req.session.userId, username: req.session.username })
})

app.get('/api/logout', (req: Request, res: Response) => {
    req.session.destroy(() => {})
    res.end()
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
    await addFile({
        nome_arquivo: req.file?.originalname,
        diretorio: req.file?.path,
        id_pessoa: req.session.userId
    })

    res.json({ message: "Arquivo upado com sucesso" })
})

app.post('/api/files', async (req: Request, res: Response) => {
    try {
        const result = await getFiles(req.body.id_pessoa)
        res.json(result)
    } catch (err) {
        res.end()
    }

})

app.get('/api/download/:filename', (req: Request, res: Response) => {
    const { filename } = req.params

    const dir = `uploads/${filename}`

    res.download(dir)
})

app.post('/api/delete', async (req: Request, res: Response) => {
    await deleteFile(req.body.id_arquivo)
    res.end()
})


const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Iniciando o servidor na porta ${port}`)
})
