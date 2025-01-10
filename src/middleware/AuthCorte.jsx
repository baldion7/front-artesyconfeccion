import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthCorte = ({children}) => {
  const user=useSelector((state)=>state.user.userState)
  switch (user.role){
    case 'Corte':
      return children ? children : <Outlet/>
    case 'Administrador':
      return children ? children : <Outlet/>
    default:
      return <Navigate to={'/orden/corde'}/>
  }

}