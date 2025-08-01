import { useNavigate } from 'react-router-dom'
import {domain2} from "../../api/domain.js";

export const CardGarment = ({opcion,garment,img}) => {
  const navigate = useNavigate()
  const Garment=(e)=>{
    const indextemp = e.currentTarget.getAttribute("data-index");
    navigate('/prenda/'+indextemp)
    //Se recarga la página para solucionar el problema de navegación en prendas similares, buscar otra opción 
    window.location.reload()
  }
  return (
    <>
      <div onClick={(e)=>Garment(e)} className="card-container"  data-index={opcion.Id}>
      <div className="card-img">
        <div className="card-label-container">
        <p className="card-label">{garment.Name ? garment.Name : opcion.category.Name}</p>
        </div>
        <img src={domain2+img.img_route} loading="lazy" alt="Imagen frontal" />
      </div>
      <div className="card-info">
        <h3>{opcion.Name}</h3>
        <p>Ref: {opcion.Reference}</p>
      </div>
    </div></>
  )
}