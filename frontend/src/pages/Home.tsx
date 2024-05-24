import { useParams, Form, redirect, useActionData, useLoaderData } from "react-router-dom"
import axios from "axios"

export default function Home() {

    const { username } = useParams()
    const messages = useActionData()
    const arquivos = useLoaderData()

    return (
        <>
            Bem vindo {username}

            <Form method='post' action='username' encType="multipart/form-data">
                <label htmlFor='file'>Upar arquivo</label>
                <input type='file' id='file' name='file' />
                <button type='submit'>Enviar</button>
                {messages && <p>{messages}</p>}
            </Form>

            <ul>
                {arquivos.map(arquivo => (
                    <li key={arquivo.id}>{arquivo.nome_arquivo}</li>
                ))}
            </ul>
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

export async function filesLoader() {
    const files = await fetch('/api/files')

    return files.json()
}