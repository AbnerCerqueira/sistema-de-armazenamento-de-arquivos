import { NavLink, Outlet } from 'react-router-dom'

export default function Form() {
    return (
        <>
            <div id='titulo'>
                <NavLink to='/'>Login</NavLink>
                <NavLink to='/cadastro'>Cadastro</NavLink>
            </div>

            <Outlet />
        </>
    )
}