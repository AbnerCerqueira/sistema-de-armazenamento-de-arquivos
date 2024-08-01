export default function Cadastro() {
    return (
        <>
            <input id="username" name="username" type="text" placeholder="Username" className="border-2 h-10 focus:border-custom-green rounded focus:outline-none" />
            <input id="password" name="password" type="password" placeholder="Senha" className="border-2 h-10 focus:border-custom-green rounded focus:outline-none" />
            <input id="password-confirm" name="password-confirm" type="passowrd" placeholder="Confirmar senha" className="border-2 h-10 focus:border-custom-green rounded focus:outline-none" />
            <button className="w-full h-10 text-white bg-custom-purple border border-custom-purple rounded duration-200 hover:border-custom-green">Cadastrar</button>
        </>
    )
}