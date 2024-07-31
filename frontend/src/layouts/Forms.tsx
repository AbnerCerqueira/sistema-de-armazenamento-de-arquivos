import { NavLink, Outlet } from "react-router-dom";

export default function () {
    return (
        <div className="h-screen flex flex-col justify-center items-center ">
            <div className="flex flex-col justify-center items-center p-20 space-y-4 font-bold border bg-sky-950 rounded">
                <div className="inline-flex items-center space-x-4 text-xl font-medium text-white">
                    <NavLink to='/' className={({ isActive }) => isActive ? "p-2 text-sky-400 font-bold rounded" : "duration-300"}>Login</NavLink>
                    <NavLink to='/cadastro' className={({ isActive }) => isActive ? "p-2 text-sky-400 font-bold rounded" : "duration-300"}>Cadastro</NavLink>
                </div>
                <Outlet />
            </div>
        </div>
    )
}