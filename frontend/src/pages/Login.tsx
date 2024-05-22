import { Form, redirect, useActionData } from 'react-router-dom'
import axios from 'axios'

export default function Cadastro() {

    const messages = useActionData()

    return (
        <>
            <Form method='post' action='/'>
                <label htmlFor='user'>User</label>
                <input type='text' id='user' name='userInput' autoFocus />
                <label htmlFor='senha'>Senha</label>
                <input type='text' id='senha' name='senhaInput' />
                {messages && <p>{messages}</p>}
                <button type='submit'>Logar</button>
            </Form>
        </>
    )
}


export async function logar({ request }: { request: Request }) {

    const dados = await request.formData() // Pega o que foi mandado pelo form

    const submission = {
        username: dados.get('userInput'),
        senha: dados.get('senhaInput')
    }
    try {
        const result = await axios.post('/api/login', submission)
        const { message, id, username } = result.data
        if (message) {
            return message
        }
        return redirect('/user')
    }
    catch (error) {
        throw new Error // erro interno no servidor
    }
}