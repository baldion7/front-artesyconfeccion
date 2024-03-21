import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthEdit = ({children}) => {
  const user=useSelector((state)=>state.user.userState)
  switch (user.role){
    case 'Editor':
      return children ? children : <Outlet/>
    default:
      return <Navigate to={'/Menu'}/>
  }

}