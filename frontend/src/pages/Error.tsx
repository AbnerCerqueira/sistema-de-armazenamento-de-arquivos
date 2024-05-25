import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <p>Erro interno no servidor</p>
            <Link to='/'>Voltar</Link>
        </>
    )
}