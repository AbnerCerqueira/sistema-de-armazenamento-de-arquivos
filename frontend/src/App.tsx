import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'

// layout
import Form from './layouts/Form'

// pages
import Login, { logar } from './pages/Login'
import Cadastro, { cadastrar } from './pages/Cadastro'
import Home, { upload } from './pages/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* rota das coisas relacionadas à index */}
      <Route path='/' element={<Form />}>
        <Route path='/' element={<Login />} action={logar} />
        <Route path='cadastro' element={<Cadastro />} action={cadastrar} />
      </Route>
      {/* /rota da index */}

      {/* rota user */}
      <Route path='/user/:username' element={<Home />} action={upload}/>
      {/* /rota user */}
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App