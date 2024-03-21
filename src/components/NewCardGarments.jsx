import { MdLibraryAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const NewCardGarments = () => {
  const navigate = useNavigate()
  const Garment=(e)=>{
    navigate('/NewGarment')
  }

  return (
    <>
      <div onClick={(e)=>Garment(e)} className="card-container" >
        <div className="card-img">
          <div className="card-label-container">
            <p className="card-label">NUEVA PRENDA</p>
          </div>
          <MdLibraryAdd/>
        </div>
        <div className="card-info">
          <h3>Nueva Prenda</h3>
          <p>Ref: NUEVA PRENDA</p>
        </div>
      </div>
    </>
  )
}