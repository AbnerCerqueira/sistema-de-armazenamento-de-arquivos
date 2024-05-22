import { Form, redirect, useActionData } from 'react-router-dom'
import axios from 'axios'

export default function Cadastro() {

    const messages = useActionData()

    return (
        <>
            <Form method='post' action='/cadastro'>
                <label htmlFor='user'>User</label>
                <input type='text' id='user' name='userInput' />
                <label htmlFor='senha'>Senha</label>
                <input type='text' id='senha' name='senhaInput' />
                <label htmlFor='confSenha'>Confirmar senha</label>
                <input type='text' id='confSenha' name='confSenhaInput' />
                {messages && <p>{messages}</p>}
                <button type='submit'> Cadastrar</button>
            </Form>
        </>
    )
}


export async function cadastrar({ request }: { request: Request }) {

    const dados = await request.formData() // Pega o que foi mandado pelo form

    const submission = {
        username: dados.get('userInput'),
        senha: dados.get('senhaInput'),
        senha2: dados.get('confSenhaInput')
    }

    if (submission.senha !== submission.senha2) {
        return "Senhas não conincidem"
    }

    if (submission.username == '' || submission.senha == '') {
        return "Preencha os campos vazios"
    }

    try {
        const result = await axios.post('/api/cadastro', { username: submission.username, senha: submission.senha })
        console.log(result)
        return redirect('/')
    }
    catch (error) {
        throw new Error
    }
}