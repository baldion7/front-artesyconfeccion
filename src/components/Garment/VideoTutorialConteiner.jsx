import React, { useEffect, useState } from 'react'
import { PrintVideosTurorial } from './PrintVideosTurorial.jsx'
import {domain} from "../../api/domain.js";

export const VideoTutorialConteiner = ({ isVisible, setIsVisible, id, setMsg }) => {
  const [video, setVideo] = useState(null)
  const [displayImg, setDisplayImg] = useState(false)
  useEffect(() => {
    fetch(domain + 'armaditutorials/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
            setVideo(data)

      })
      .catch(error => {
        //errr
      })
  }, [])
  const toggleVideo = () => {
    if (video.length > 0) {
      setDisplayImg(true)
    } else {
      setIsVisible()
      setMsg('No hay videos disponible')
    }

  }

  return (
    <>
      <div className="video-tutorial" onClick={toggleVideo}>
        <div className="video-tutorial-contenido" id="video_tutorial_contenido">
          {displayImg === false ? <img src="/img/prenda/Frame%205.png" loading="lazy" alt=""/> :
            <div className="videos-tutoriasl"><h1>Videos tutoriales</h1>
              <PrintVideosTurorial response={video}/>
            </div>
          }
        </div>
      </div>
    </>
  )
}