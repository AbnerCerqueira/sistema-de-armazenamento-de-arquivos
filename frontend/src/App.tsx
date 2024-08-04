import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login, { login } from "./pages/Login"
import Forms from "./layouts/Forms"
import Cadastro, { cadastro } from "./pages/Cadastro"
import Home, { fetchFiles, upload } from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Forms />,
      children: [
        {
          path: "login",
          element: <Login />,
          action: login
        },
        {
          path: "cadastro",
          element: <Cadastro />,
          action: cadastro
        }
      ]
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/user/:username",
          element: <Home />,
          loader: fetchFiles
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
