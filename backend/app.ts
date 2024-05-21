import express, { Request, Response } from 'express'
import { addUser } from './models/user'
const app = express()

app.use(express.json())

app.post('/api/cadastro', async (req: Request, res: Response) => {
    const dados = req.body
    await addUser(dados)
    res.end()
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Iniciando o servidor na porta ${port}`)
})
