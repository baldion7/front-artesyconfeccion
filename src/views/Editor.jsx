import '../styles/Editor.css'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavMenuLeft } from '../components/Garment/NavMenuLeft.jsx'
import { CardGarmentMenu } from '../components/Garment/CardGarmentMenu.jsx'
import { ModalLogout } from '../components/Garment/ModalLogout.jsx'
import { ModalTutorialPageMenu } from '../components/Garment/ModalTutorialPageMenu.jsx'
import { AlertError } from '../components/Garment/AlertError.jsx'
export const Editor = () => {
  const [garment, setGarment] = useState(null)
  const [category, setCategory] = useState(null)
  const [open, setOpen] = useState(false)
  const [popup_2, setPopup_2] = useState(null)
  const [popup_3, setPopup_3] = useState(null)
  const cancelButtonRef = useRef(null)
  const [blur, setBlur] = useState(null)
  const [search, setSearch] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [msg, setMsg] = useState(null)
  const modal=useSelector((state)=>state.user.modal.modal)
  const [VisibleALERT, setVisibleALERT] = useState(false)
  const SetCategory=(id)=>{
    setCategory(id)
  }
  useEffect(() => {
    if(category){
      fetch('https://arteyconfecciones.com/api/category/'+category)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setGarment(data)
          setSearch(null)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [category]);
  const SetOpen=()=>{
    setOpen(!open)
    setBlur(!blur)
  }
  const CloseModal=()=>{
    if(open===true){
      setOpen(false)
      setBlur(false)
    }
    if (popup_2===true){
      setPopup_2(false)
      setTimeout(() => {
        setPopup_3(true)
      },500)
    }
    if (popup_3===true){

      setPopup_3(false)
      setBlur(false)

    }
  }
  useEffect(() => {
    if (modal!==true) {
      setPopup_2(true)
      setBlur(true)
    }
  }, [])
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setVisibleALERT(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isVisible])
  async function searchGarment(e) {
    e.preventDefault();
    const value=(e.target.value)
    console.log(value)
    if (value.length > 2){
      console.log(value)
      try {
        const response = await fetch('https://arteyconfecciones.com/api/search/garment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'search': value}),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          if (data.length!==0) {
            setSearch(data)
          } else {
            setVisibleALERT(true)
            setIsVisible(true)
            setMsg('No existe la prenda que buscas')
          }
        } else {
          console.error('Error en la respuesta de la solicitud.');
        }
      } catch (error) {
        // Manejo de errores de la solicitud
        console.error('Error al realizar la solicitud:', error);
      }
    }else {
      setSearch(null)
    }


  }
  return (
    <>
      <div className={'body-menu'} onClick={CloseModal}>
        <div className={`container ${blur==true ? 'active' : ''}`} id="blur" >
          <NavMenuLeft setSearch={search} category={SetCategory} setOpen={SetOpen}/>
          <div className="main-side">
            <div className="search-bar-container">
              <input type="text" id="search" name='search' placeholder="Buscar prenda o código de referencia..."  onBlur={searchGarment}/>
              <img id="btn_search" src="/img/menu/search-icon.svg" loading="lazy" alt="cono buscar"/>
            </div>
            <div className="cards-container" id="all_garments">
              {garment? <CardGarmentMenu garment={garment} search={search} />:null}
            </div>
          </div>
        </div>
        <ModalLogout open={open} setOpen={SetOpen} cancelButtonRef={cancelButtonRef}/>
      </div>
      <ModalTutorialPageMenu popup_2={popup_2} popup_3={popup_3} CloseModa={CloseModal}/>
      {VisibleALERT ===true ? <AlertError isVisible={isVisible} msg={msg}/> : null}
    </>
  )
}