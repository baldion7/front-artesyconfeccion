import { NavCategoryLeft } from './NavCategoryLeft.jsx'
import { FaRightFromBracket } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export const NavMenuLeft = ({category,setOpen,SetNewCategory}) => {
  const user=useSelector((state)=>state.user.userState)
  const [IsSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!IsSideMenuOpen)
  }
  useEffect(() => {
    const userAgent = navigator.userAgent
    if (
      userAgent.match(/Android/i) ||
      userAgent.match(/webOS/i) ||
      userAgent.match(/iPhone/i) ||
      userAgent.match(/iPad/i) ||
      userAgent.match(/iPod/i) ||
      userAgent.match(/BlackBerry/i) ||
      userAgent.match(/Windows Phone/i)
    ) {
      // Si el agente de usuario coincide con los dispositivos móviles, cerrar el menú
      setIsSideMenuOpen(true)
    }
  }, [])


  return (
    <>
      <nav id="side_menu" className={`side-menu ${IsSideMenuOpen ? 'close' : ''}`}>
        <header className="header" id="header">
          <img src="/img/menu/logo.png" loading="lazy" alt="Logo de la empresa"/>
        </header>
        <div id="toggle_container" className="toggle-container" onClick={toggleSideMenu}>
          <img src="/img/menu/arrow.svg" loading="lazy" alt=""/>
        </div>
        <div className="menu-list">
          <p>CATEGORÍAS</p>
          <ul id="category_garments">
            <NavCategoryLeft categorys={category}/>
          </ul>
        </div>
        {user.role === 'Editor' && <div className="container-new-category">
          <button id="btn-new-category" onClick={SetNewCategory}>
            Nueva Categoría
          </button>
        </div>}
        <div className="container-logout">
          <button id="btn-logout" onClick={setOpen}>
            <FaRightFromBracket/> Cerrar Sesión
          </button>
        </div>
      </nav>
    </>
  )
}