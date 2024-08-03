import api from "../api/Api"
import { Form, redirect, useActionData } from "react-router-dom"

export default function Cadastro() {
    const message = useActionData() as string
    return (
        <Form method="post" action="/cadastro" className="flex flex-col justify-center items-center space-y-4 font-bold">
            <input id="username" name="username" type="text" placeholder="Username" className="border-2 h-10 focus:border-custom-green rounded focus:outline-none" />
            <input id="password" name="password" type="password" placeholder="Senha" className="border-2 h-10 focus:border-custom-green rounded focus:outline-none" />
            <input id="password-confirm" name="password-confirm" type="password" placeholder="Confirmar senha" className="border-2 h-10 focus:border-custom-green rounded focus:outline-none" />
            <button className="w-full h-10 text-white bg-custom-purple border border-custom-purple rounded duration-200 hover:border-custom-green">Cadastrar</button>
            {message && <p className="text-red-500">{message}</p>}
        </Form>
    )
}

export async function cadastro({ request }: { request: Request }) {
    const data = await request.formData()
    const submission = {
        username_user: data.get("username"),
        password_user: data.get("password"),
        confpass: data.get("password-confirm")
    }
    try {
        await api.post("/api/cadastro", submission)
        return redirect("/login")
    } catch (err: any) {
        return err.response.data.message
    }
}
