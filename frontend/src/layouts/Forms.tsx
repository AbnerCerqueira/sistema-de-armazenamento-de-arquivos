import { NavLink, Outlet } from "react-router-dom"

export default function () {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-custom-black">
            <div className="flex flex-col justify-center items-center space-y-4 font-bold">
                <div className="inline-flex items-center space-x-4 text-xl font-medium text-white">
                    <NavLink to='/login' className={({ isActive }) => isActive ? "p-2 text-custom-purple font-bold rounded" : "duration-200"}>Login</NavLink>
                    <NavLink to='/cadastro' className={({ isActive }) => isActive ? "p-2 text-custom-purple font-bold rounded" : "duration-300"}>Cadastro</NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
       