import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Forms from "./layouts/Forms"
import Cadastro from "./pages/Cadastro"

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
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
