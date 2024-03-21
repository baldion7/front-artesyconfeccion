import './App.css'
import { Login } from './views/Login.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Prenda } from './views/Prenda.jsx'
import { AuthUser } from './middleware/AuthUser.jsx'
import { Menu } from './views/Menu.jsx'
import { useEffect } from 'react'
import { Editor } from './views/Editor.jsx'
import { AuthEdit } from './middleware/AuthEdit.jsx'
import { NewGarment } from './views/NewGarment.jsx'

function App () {
  useEffect(() => {
    // Importa el script
    const script = document.createElement('script')
    script.src = '/lib/Drift.js' // Ruta relativa al archivo en public
    script.async = true

    document.body.appendChild(script)

    // Limpia el script cuando el componente se desmonta
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route element={<AuthUser/>}>
            <Route path={'/prenda/:id'} element={<Prenda/>}/>
            <Route path={'/Menu'} element={<Menu/>}/>
            <Route path={'/Editor'} element={<Editor/>}/>
            <Route path={'*'} element={<Navigate to={'/Menu'}/>}/>
            <Route element={<AuthEdit/>}>
              <Route path={'/NewGarment'} element={<NewGarment/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
