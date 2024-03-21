import { useDispatch } from 'react-redux'
import { addUser } from '../redux/slice/userSlice.js'

export const ModalLogout = ({open,setOpen}) => {
  const dispatch = useDispatch()
  const Logout=()=>{
    dispatch(addUser({name:" ",role:" "}))
  }
  return (
    <>
      <div className={`popup ${open==true ? 'active' : ''}`} id="popup"  >
        <div className="popup-scroll">
          <div className="popup-body">
            <h2 className="card-title">Cerrar sesión</h2>
            <p className="popup-body-text">¿Estás seguro que deseas cerrar la sesión?</p>
          </div>
          <div className="popup-footer">
            <button className="cancel" onClick={setOpen} id="btn_cancel">Cancelar</button>
            <button onClick={Logout} className="accept" id="btn_close">Sí, cerrar sesión</button>
          </div>
        </div>
      </div>
    </>
  )
}