import '../styles/Prenda.css'
import { BtnArrowsGarmentsLeft } from '../components/Garment/BtnArrowsGarmentsLeft.jsx'
import { BtnPhoneArrowsGarments } from '../components/Garment/BtnPhoneArrowsGarments.jsx'
import { BtnArrowsGarmentsRight } from '../components/Garment/BtnArrowsGarmentsRight.jsx'
import { ImgGarmentContainer } from '../components/Garment/ImgGarmentContainer.jsx'
import { ImgMoldesConteiner } from '../components/Garment/ImgMoldesConteiner.jsx'
import { VideoTutorialConteiner } from '../components/Garment/VideoTutorialConteiner.jsx'
import { OperativeGarmenContent } from '../components/Garment/OperativeGarmenContent.jsx'
import { DateGarmentsSpecifications } from '../components/Garment/DateGarmentsSpecifications.jsx'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ModalTutorialGarments } from '../components/Garment/ModalTutorialGarments.jsx'
import { CardGarmentMenu } from '../components/Garment/CardGarmentMenu.jsx'
import { Loader } from '../components/Garment/Loader.jsx'
import { BtnDetails } from '../components/Garment/BtnDetails.jsx'
import { ImgTrazo } from '../components/Garment/ImgTrazo.jsx'
import { ModalDetails } from '../components/Garment/ModalDetails.jsx'
import { AlertError } from '../components/Garment/AlertError.jsx'
import domain from "../api/domain.js";

export const Prenda = () => {
  const { id } = useParams()
  const modal = useSelector((state) => state.user.modal.modalgarment)
  const [garment, setGarment] = useState(null)

  const [blur, setBlur] = useState(null)
  const [popup, setPopup] = useState(null)
  const [popup_2, setPopup_2] = useState(null)
  const [popup_3, setPopup_3] = useState(null)
  const [imgGarment, setImgGarment] = useState(null)
  const [imgBtnChange, setImgBtnChange] = useState('frontal')
  const [recommendGarment, setRecommendGarment] = useState(null)
  const [numbeRamdon, setNumbeRamdon] = useState(null)
  const [category, setCategory] = useState(null)
  const [modalDetails, setModalDetails] = useState(false)
  const [idDetails, setIdDetails] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [msg, setMsg] = useState(null)
  const user=useSelector((state)=>state.user.userState)
  useEffect(() => {
    setTimeout(() => {
      if (modal !== true) {
        setPopup(true)
        setBlur(true)
      }
    }, 3000)

  }, [])
  useEffect(() => {
    fetch(domain+'garment/' + id)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setTimeout(
          () => {
            setGarment(data)
          }, 2000)
      })

  }, [])
  useEffect(() => {
    if (garment) {
      garment.imggarments.forEach((item) => {
        if (item.Name === imgBtnChange) {
          setImgGarment(item.img_route)
        }
      })
      setCategory(garment.categoryId)
    }
  }, [garment])
  useEffect(() => {
    if (category) {
      fetch(domain+'garment')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          changeRecommend(data)

        })
        .catch(error => {
          console.error('Error:', error)
        })
    }
  }, [category])
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setMsg(null)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const changeRecommend = (data) => {
    // Si hay menos de 5 elementos, retornamos todos
    if (data.length <= 5) {
      setRecommendGarment(data);
      setNumbeRamdon(data.length);
      return;
    }

    // Si hay más de 5 elementos, seleccionamos 5 aleatorios
    const elementosSeleccionados = obtenerElementosAleatorios(data, 5);
    setRecommendGarment(elementosSeleccionados);
    setNumbeRamdon(5);
  };

// Mantener la función obtenerElementosAleatorios como está
  const obtenerElementosAleatorios = (array, cantidad) => {
    const copiaArray = [...array];
    const elementosAleatorios = [];

    while (elementosAleatorios.length < cantidad && copiaArray.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * copiaArray.length);
      const elementoAleatorio = copiaArray.splice(indiceAleatorio, 1)[0];
      elementosAleatorios.push(elementoAleatorio);
    }

    return elementosAleatorios;
  };

  const changeImgGarmentsButton = () => {
    garment.imggarments.forEach((item) => {
      if (item.Name !== imgBtnChange) {
        setImgGarment(item.img_route)
        setImgBtnChange(item.Name)
      }
    })
  }
  const CloseModal = () => {
    if (popup === true) {
      setPopup(false)
      setTimeout(() => {
        setPopup_2(true)
      }, 500)
    }
    if (popup_2 === true) {
      setPopup_2(false)
      setTimeout(() => {
        setPopup_3(true)
      }, 500)
    }
    if (popup_3 === true) {

      setPopup_3(false)
      setBlur(false)

    }
    if (modalDetails === true) {
      setModalDetails(false)
      setBlur(false)
    }
  }
  const SetModalDetails = () => {
    setModalDetails(!modalDetails)
    setBlur(!blur)
  }
  const SetIdDetails = (id) => {
    setIdDetails(id)
  }

 const SetIsVisible = () => {
   setIsVisible(!isVisible)
 }
 const SetMsg = (msg) => {
   setMsg(msg)
 }

  return (
    <>
      {garment ?
        <div className="body-prenda" onClick={CloseModal}>
          <div className={`detail-container ${blur == true ? 'active' : ''}`} id="blur">
            <div className="men-top">
              <div className="all-garments-container" style={{ width: '100%' }}>
                <Link className="all-garments" to="/menu">
                  <div className="all-garments-text">
                    <img src="/img/prenda/flechaiz_white.svg" loading="lazy" alt=""/>
                    <span>Ver otras prendas</span>
                  </div>
                </Link>
                <Link className="all-garments all-garments-icons" to="/">
                  <div className="all-garments-icon">
                    <img src="/img/menu/logo.png" loading="lazy" alt=""/>
                  </div>
                </Link>
              </div>
              <div className="title-graments">
                <label id="title_general">{garment.Name}</label>
                <label id="title_reference">{garment.Reference}</label>
              </div>
            </div>
            <div>
              <div className="content-garment-img">
                <div className="img-garment-btn">
                  <BtnArrowsGarmentsLeft changeImgGarmentsButton={changeImgGarmentsButton}/>
                  <ImgGarmentContainer img={imgGarment}/>
                  <BtnArrowsGarmentsRight changeImgGarmentsButton={changeImgGarmentsButton}/>
                </div>
                <ImgMoldesConteiner molds={garment.molds}/>
              </div>
            </div>
            <div className="container-btn-phone">
              <BtnPhoneArrowsGarments changeImgGarmentsButton={changeImgGarmentsButton}/>
            </div>
            <div id="button_panel_container" className="button-panel-container">
              <h1>Detalles</h1>
              <div className="button-panel" id="button_panel">
                {garment.btndetails.map((item, index) => (
                  <BtnDetails key={index} btn={item} SetIdDetails={SetIdDetails} SetModalDetails={SetModalDetails}/>
                ))}
              </div>
            </div>
            <div className="conteiner">
              <div className="content-date">
                {user.role === 'Talleres' ? null : <ImgTrazo molds={garment.molds}/>}
                <DateGarmentsSpecifications specifications={garment.technicalinfos}/>
                <OperativeGarmenContent operative={garment.operatingprocesses}/>
                <VideoTutorialConteiner setIsVisible={SetIsVisible} isVisible={isVisible} id={id} setMsg={SetMsg} />
              </div>
            </div>
            <div className="suggestions-garment">
              <div className="suggestions-garment-title">
                <h1>Otras prendas similares</h1>
              </div>
              <div className="suggestions-garment-cards" id="suggestions_garment_cards">
                {recommendGarment ? <CardGarmentMenu garment={recommendGarment} numbeRamdon={numbeRamdon}/> : null}
              </div>
            </div>
          </div>
        </div>
        : <Loader/>
      }
      <ModalDetails setModalDetails={SetModalDetails} modalDetails={modalDetails} idDetails={idDetails}/>
      <ModalTutorialGarments popup={popup} CloseModal={CloseModal} popup_2={popup_2} popup_3={popup_3}/>
      {msg &&  <AlertError isVisible={isVisible} msg={msg} />}
    </>
  )
}
