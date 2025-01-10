import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthAdmin = ({children}) => {
  const user=useSelector((state)=>state.user.userState)
  switch (user.role){
    case 'Administrador':
      return children ? children : <Outlet/>
    default:
      return <Navigate to={'/orden/corte'}/>
  }

}