import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'

// layout
import Form from './layouts/Form'

// pages
import Login, { logar } from './pages/Login'
import Cadastro, { cadastrar } from './pages/Cadastro'
import Home, { upload, logOut } from './pages/Home'
import NotFound from './pages/NotFound'
import Error from './pages/Error'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* rota das coisas relacionadas à index */}
      <Route path='/' element={<Form />} errorElement={<Error />}>
        <Route path='/' element={<Login />} action={logar} />
        <Route path='cadastro' element={<Cadastro />} action={cadastrar} />
      </Route>
      {/* /rota da index */}

      {/* rota user */}
      <Route path='/user' errorElement={<Error />}>
        <Route path='logout' action={logOut} />
        <Route path=':username' element={<Home />} action={upload} />
      </Route>
      {/* /rota user */}
      <Route path='*' element={<NotFound />}/>
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