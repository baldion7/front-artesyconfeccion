import { stateModal } from '../../redux/slice/modalSlice.js'
import { useDispatch } from 'react-redux'

export const ModalTutorialPageMenu = ({popup_2,popup_3,CloseModa}) => {
  const dispatch = useDispatch()
  const SaveModal = () => {
    dispatch(stateModal({ modal: true }))
  }

  return (
    <>
      <div className={`popup popup-video ${popup_2===true ? 'active' : ''}`} id="popup_2">
        <div className="popup-scroll">
          <div className="popup-header">
            <h2 className="card-title">Menú lateral izquierdo</h2>
            <div className="popup-body-video">
              <p className="popup-body-text">En el menú izquierdo podrás encontrar las categorías de las prendas de
                vestir.</p>
              <img className="popup-body-video-text-img-medium" src="/img/menu/tutorial-menu-1.gif" loading="lazy" alt="if"/>
            </div>
          </div>
          <div className="popup-footer">
            <button className="accept" onClick={CloseModa} id="button_next">Entendido</button>
          </div>
        </div>
      </div>

      <div className="popup popup-video" id="popup_3">
        <div className="popup-scroll">
          <div className="popup-header">
            <h2 className="card-title">Barra de búsqueda</h2>
            <div className="popup-body-video">
              <p className="popup-body-text">En la barra de búsqueda podrás buscar prendas por su nombre, referencia o
                categoría.</p>
              <img className="popup-body-video-text-img-medium" src="/img/menu/tutorial-menu-2.gif" loading="lazy" alt="if"/>
            </div>
          </div>
          <div className="popup-footer">
            <button className="accept" id="button_next_2">Entendido</button>
          </div>
        </div>
      </div>

      <div className={`popup popup-video ${popup_3===true ? 'active' : ''}`} id="popup_4">
        <div className="popup-scroll">
          <div className="popup-header">
            <h2 className="card-title">Menú</h2>
            <div className="popup-body-video">
              <p className="popup-body-text">En el menú, puedes encontrar todas las prendas por categoría o aquellas que
                coincidan con tu búsqueda. </p>
              <img className="popup-body-video-text-img-medium" src="/img/menu/tutorial-menu-2.gif" loading="lazy" alt="if"/>
            </div>
          </div>
          <div className="popup-footer">
            <button className="accept" onClick={()=>{CloseModa(), SaveModal() }} id="button_exit">Entendido</button>
          </div>
        </div>
      </div>
    </>
  )
}