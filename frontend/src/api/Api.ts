import axios from "axios"
import Cookies from "js-cookie"

// CORS configurado em vite.config.ts
const api = axios.create()
api.interceptors.request.use((config) => {
    try {
        config.headers['Authorization'] = `Bearer ${Cookies.get("token")}`
    } catch (err) {
        console.log(err)
    }
    return config
})

export default api
