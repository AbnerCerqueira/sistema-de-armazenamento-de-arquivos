import api from "../api/Api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    async function auth() {
        try {
            const result = await api.get('/api/protected')
            Cookies.set("token-sub", JSON.stringify(result.data))
            setIsAuth(true)
        } catch (err) {
            // console.log(err)
        } finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        auth()
    }, [])

    if (isLoading === false) {
        return isAuth ? <Outlet /> : <Navigate to="/login" replace />
    }
}
