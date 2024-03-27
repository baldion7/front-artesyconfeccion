import '../styles/Prenda.css'
import { BtnArrowsGarmentsLeft } from '../components/BtnArrowsGarmentsLeft.jsx'
import { BtnPhoneArrowsGarments } from '../components/BtnPhoneArrowsGarments.jsx'
import { BtnArrowsGarmentsRight } from '../components/BtnArrowsGarmentsRight.jsx'
import { ImgGarmentContainer } from '../components/ImgGarmentContainer.jsx'
import { ImgMoldesConteiner } from '../components/ImgMoldesConteiner.jsx'
import { VideoTutorialConteiner } from '../components/VideoTutorialConteiner.jsx'
import { OperativeGarmenContent } from '../components/OperativeGarmenContent.jsx'
import { DateGarmentsSpecifications } from '../components/DateGarmentsSpecifications.jsx'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ModalTutorialGarments } from '../components/ModalTutorialGarments.jsx'
import { CardGarmentMenu } from '../components/CardGarmentMenu.jsx'
import { Loader } from '../components/Loader.jsx'
import { BtnDetails } from '../components/BtnDetails.jsx'
import { ImgTrazo } from '../components/ImgTrazo.jsx'
import { ModalDetails } from '../components/ModalDetails.jsx'
import { AlertError } from '../components/AlertError.jsx'

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
    fetch('https://arteyconfecciones.com/api/garment/' + id)
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
      fetch('https://arteyconfecciones.com/api/garment')
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
    let numeros = []
    let numerosAleatorios = []
    let ruta = data
    setRecommendGarment(obtenerElementosAleatorios(data, 5))
    setNumbeRamdon(5)
    /*if (data.length < 5) {
      setRecommendGarment(data)

    } else {
      ruta.forEach((item) => {
        numeros.push(item.Id)
        while (numeros.length > 0) {
          for (var i = 0; i <= 5; i++) {
            var indiceAleatorio = Math.floor(Math.random() * numeros.length)
            var numeroAleatorio = numeros[indiceAleatorio]
            numerosAleatorios.push(numeroAleatorio)
            numeros.splice(indiceAleatorio, 1)
            setNumbeRamdon(numerosAleatorios)
          }
        }
      })
      setRecommendGarment(numerosAleatorios)
      }
      */

  }

  const obtenerElementosAleatorios = (array, cantidad) => {
    const copiaArray = [...array]; // Crear una copia del array para no modificar el original
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
