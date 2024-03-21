import React from 'react'

export const BtnPhoneArrowsGarments = ({changeImgGarmentsButton}) => {
  return (
    <>
      <button className="btn-arrows-garments-2 btn-arrows-garments-left" onClick={changeImgGarmentsButton}>
        <img src="/img/prenda/flechaiz.svg" loading="lazy" alt="" className="img-arrows-garments" />
      </button>

      <button className="btn-arrows-garments-2 btn-arrows-garments-right" onClick={changeImgGarmentsButton}>
        <img src="/img/prenda/flechader.svg" loading="lazy" alt="" className="img-arrows-garments" />
      </button></>
  )
}