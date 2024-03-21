import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthUser = ({children}) => {
  const user=useSelector((state)=>state.user.userState)
  switch (user.role){
    case 'Planta':
      return children ? children : <Outlet/>
    case 'Talleres':
      return children ? children : <Outlet/>
    case 'Editor':
      return children ? children : <Outlet/>
    default:
      return <Navigate to={'/login'}/>
  }

}