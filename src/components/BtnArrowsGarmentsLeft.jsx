import React from 'react'

export const BtnArrowsGarmentsLeft = ({changeImgGarmentsButton}) => {
  return (
    <>
      <button className="btn-arrows-garments btn-arrows-garments-left" onClick={changeImgGarmentsButton}>
        <img src="/img/prenda/flechaiz.svg" loading="lazy" alt="" className="img-arrows-garments" />
      </button>
    </>
  )
}