import { useDispatch } from 'react-redux'
import { stateModalGarment } from '../redux/slice/modalSlice.js'
import { FaMagnifyingGlassPlus } from 'react-icons/fa6'

export const ModalTutorialGarments = ({popup,popup_2,popup_3,CloseModal}) => {
  const dispatch = useDispatch()
  const SaveModal = () => {
    dispatch(stateModalGarment({ modalgarment: true }))
  }
  return (
    <>
      <div className={`popup  ${popup===true ? 'active' : ''}`} id="popup">
        <div className="popup-scroll">
          <div className="popup-header">
            <h2 className="card-title">Prendas interactivas</h2>
            <div className="popup-body-video">
              <p className="popup-body-text">Dando click en los botones rojos podrás ver los detalles de la confección
                de
                la prenda.</p>
                <img className="popup-body-video-text-img-medium" src="/img/prenda/botones-detalles.png" loading="lazy" alt="Botones detalles"/>
            </div>
          </div>
          <div className="popup-footer">
            <button className="accept" onClick={CloseModal} id="btn_next">Entendido</button>
          </div>
        </div>
      </div>

      <div className={`popup popup-video ${popup_2===true ? 'active' : ''}`} id="popup_2">
        <div className="popup-scroll">
          <div className="popup-header">
            <h2 className="card-title">Herramienta de zoom</h2>
            <div className="popup-body-video">
              <p className="popup-body-text">Al pasar el mouse sobre la imagen dentro del detalle de la prenda podrás hacer zoom.</p>
              <img className="popup-body-video-text-img-medium" src="/img/menu/zoom.gif" loading="lazy" alt="Gif"/>
            </div>
          </div>
          <div className="popup-footer">
            <button className="accept" onClick={CloseModal} id="button_next_2">Entendido</button>
          </div>
        </div>
      </div>

      <div className={`popup popup-video ${popup_3===true ? 'active' : ''}`} id="popup_3">
        <div className="popup-scroll">
          <div className="popup-header">
            <h2 className="card-title">Video tutorial</h2>
            <div className="popup-body-video">
              <p className="popup-body-text">Al hacer click sobre la imagen del video podrás ver los videos tutoriales
                sobre
                la confección de la prenda.</p>
              <img className="popup-body-video-text-img-medium" src="/img/prenda/Frame 5.png" loading="lazy" alt="Gif"/>
            </div>
          </div>
          <div className="popup-footer">
            <button className="accept" onClick={()=>{CloseModal(), SaveModal()}} id="button_exit">Entendido</button>
          </div>
        </div>
      </div>
    </>
  )
}