import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Forms from "./layouts/Forms"
import Cadastro from "./pages/Cadastro"
import Home from "./pages/Home"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Forms />,
      children: [
        {
          path: "",
          element: <Login />
        },
        {
          path: "/cadastro",
          element: <Cadastro />
        }
      ]
    },
    {
      path: "/user/nome",
      element: <Home />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
