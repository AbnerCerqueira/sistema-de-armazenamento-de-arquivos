import axios from 'axios'
import { FormEvent, useState } from 'react'

export default function Login() {

    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [cadastrado, setCadastrado] = useState(false)
    const [erros, setErros] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) { // Mandar dados
        e.preventDefault()
        if (senha !== confSenha){
            setSenha('')
            setConfSenha('')
            setErros(true)
            return
        }
        if (nome == '' || senha == '') {
            setErros(true)
            return
        }
        const dados = { nome, senha }
        console.log(dados)
        try {
            await axios.post('/api/cadastro', dados)
            setCadastrado(true)
            setNome('')
            setSenha('')
            setConfSenha('')
            setErros(false)
        }
        catch (error) {
            setErros(true)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Nome</label>
                <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
                <label>Senha</label>
                <input type='text' value={senha} onChange={(e) => setSenha(e.target.value)} />
                <label>Confirmar senha</label>
                <input type='text' value={confSenha} onChange={(e) => setConfSenha(e.target.value)} />
                <button type='submit'> Cadastrar</button>
            </form>

            {erros ? (
                <p>Erro ao cadastrar</p>
            ) : (
                <></>
            )}

            {cadastrado ? (
                <p><a>Ir para login</a></p>
            ) : (
                <></>
            )}
        </>
    )
}