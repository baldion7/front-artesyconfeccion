import '../styles/Login.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { addUser } from '../redux/slice/userSlice.js'
import { AlertError } from '../components/Garment/AlertError.jsx'
import {domain} from "../api/domain.js";


export const Login = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState(null)
  const user = useSelector((state) => state.user.userState)
  const [passwordType, setPasswordType] = useState('password')
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  useEffect(() => {
    switch (user.role) {
      case 'Planta':
        return navigate('/Menu')
      case 'Talleres':
        return navigate('/Menu')
      case 'Editor':
        return navigate('/Editor')
      default:
        return
    }
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(domain+'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.msg && data.msg) {
          setMsg(data.msg)
          toggleAlert()
        } else {
          dispatch(addUser(data))
        }
      }
    } catch (error) {
      // Manejo de errores
    }
  }
  const togglePasswordVisibility = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }
  const toggleAlert = () => {
    setIsVisible((prevVisible) => !prevVisible)
  }

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isVisible])
  return (
    <>
      <div className="conteiner-prin">
        <main className="container-login">
          <form className={'form-login'} onSubmit={handleLogin}>
            <h1 className={'title-login'}>Iniciar sesión</h1>
            <div className="container-input-login">
              <input type="text" name="usuario" className="input-login" placeholder="Usuario" onChange={handleChange}/>
            </div>
            <div className="container-input-login">
              <input type={passwordType} name="password" className="input-login" id="passwordField"
                     placeholder="Contraseña" onChange={handleChange}/>
              <span id="togglePassword" onClick={togglePasswordVisibility}>
              {passwordType === 'password' ? <FaEye/> : <FaEyeSlash/>}
              </span>
            </div>
            <div className="btn-submit">
              <button>Iniciar sesión</button>
            </div>
          </form>
        </main>
        <AlertError isVisible={isVisible} msg={msg}/>
      </div>
      <div className="container-vector2">
      </div>
      <div className="container-vector1">
      </div>
    </>
  )
}