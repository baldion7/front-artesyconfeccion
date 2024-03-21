import { useEffect, useRef, useState } from 'react'
import '../styles/drift-basic.css'
export const ModalDetails = ({modalDetails,setModalDetails,idDetails}) => {
  const unmountRef = useRef();
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const clearDetails = () => {
      setDetails(null);
    };

    // Asigna la función de limpieza a la referencia
    unmountRef.current = clearDetails;
      fetch('https://arteyconfecciones.com/api/btndetails/' + idDetails)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          setDetails(data)


        })
        .catch(error => {
          //errr
        })
    return () => {
      unmountRef.current();
    };

  }, [idDetails])
  const closeModal = () => {
    setModalDetails();
    unmountRef.current(); // Limpia los detalles al cerrar el modal
  };


  useEffect(() => {
    setTimeout(() => {
      new Drift(document.querySelector(".zoom-modal"), {
        // Configuración de Drift
        paneContainer: document.querySelector("#container_content_modal_indications"),
        inlinePane: 375,
        inlineOffsetY: -85,
        containInline: true,
        hoverBoundingBox: true,
        hoverDelay: 0,
      })
    },3000);
  }, [setDetails]);


  return (
    <>
      <div className={`popup popup-video ${modalDetails===true ? 'active' : ''}`} id="detailsgarments">
        <div className="popup-scroll">
          <div className="popup-header">
            <h2 className="card-title" id="modal_title"></h2>
            <div className="popup-body-video-container">
              <div className="popup-body-video popup-body-video-img" id="container_content_modal_img">
                <img src={details && details.imgdetails[0].img_route} data-zoom={details && details.imgdetails[0].img_route}
                     className="zoom-modal" alt="" loading="lazy"/>
              </div>
              <div className="container-content-modal-indications container-content-modal-indications-text">
                <div className="popup-body-text" id="container_content_modal_indications" style={{color:'black'}}>
                  {details && details.allowArmedInfos.map((item, index) => (
                    <label key={index} htmlFor="" style={{    display: 'inline-block'}}>
                      <i className="fa-solid fa-circle"></i> {item.armedInfo.Description}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="popup-footer">
            <button onClick={closeModal} className="accept" id="button_exit_2">Regresar</button>
          </div>
        </div>
      </div>
    </>
  )
}