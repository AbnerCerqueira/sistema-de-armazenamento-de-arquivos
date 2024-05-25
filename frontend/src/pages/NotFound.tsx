import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <p>Pagina não encontrada</p>
            <Link to='/'>Voltar</Link>
        </>
    )
}