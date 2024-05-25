import { useEffect, useState } from "react"
import { Form, useActionData } from "react-router-dom"
import axios from "axios"


type Files = {
    id_arquivo: number
    nome_arquivo: string
    diretorio: string
}

export default function Home() {

    const messages = useActionData() as string
    const [username, setUsername] = useState<string | null>(null)
    const [files, setFiles] = useState<Files[]>([])

    async function autentica() {
        const result = await axios.get('/api/login') // veriicar se tem uma sessao criada
        const storedFiles = await axios.post('/api/files', { id_pessoa: result.data.id_pessoa })

        setUsername(result.data.username)
        setFiles(storedFiles.data.reverse())
    }

    async function handleDownload(nome_arquivo: string) {
        const result = await axios({
            url: `/api/download/${nome_arquivo}`,
            method: 'GET',
            responseType: 'blob'
        })

        const url = window.URL.createObjectURL(new Blob([result.data]))
        const link = document.createElement('a') // criar a tag a
        link.href = url
        link.setAttribute('download', nome_arquivo)
        document.body.appendChild(link)
        link.click() // clique automatico
        document.body.removeChild(link)
    }

    async function handleDelete(id_arquivo: number) {
        await axios.post('/api/delete', { id_arquivo: id_arquivo })
        setFiles(files.filter(file => file.id_arquivo !== id_arquivo))
    }

    useEffect(() => {
        autentica()
    }, [messages])

    return (
        <>
            {username ? (
                <>
                    <h2>Bem vindo {username}</h2>

                    <Form method='post' action={`/user/${username}`} encType="multipart/form-data">
                        <label htmlFor='file'>Upar arquivo</label>
                        <input type='file' id='file' name='file' />
                        <button type='submit'>Enviar</button>
                        {messages && <p>{messages}</p>}
                    </Form>

                    <h3>Seus arquivos:</h3>
                    <ul>
                        {files ? (
                            files.map(file => (
                                <li key={file.id_arquivo}>
                                    {file.nome_arquivo}
                                    <button onClick={() => handleDownload(file.nome_arquivo)} id="download">🠋</button>
                                    <button onClick={() => handleDelete(file.id_arquivo)} id="apagar">X</button>
                                </li>
                            ))
                        ) : (
                            <>
                            </>
                        )}
                    </ul>
                </>
            ) : (
                <p>Faça login para acessar a pagina</p>
            )}

        </>
    )
}

export async function upload({ request }: { request: Request }) {

    const dados = await request.formData() // pegar dados do arquivo enviado

    const file = dados.get('file')
    const submission = new FormData()
    submission.append('file', file) // preparar submissao

    try {
        const result = await axios.post('/api/upload', submission, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return result.data.message
    }
    catch (error) {
        throw new Error // erro interno no servidor
    }
}