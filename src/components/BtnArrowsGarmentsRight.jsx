import React from 'react'

export const BtnArrowsGarmentsRight = ({changeImgGarmentsButton}) => {
  return (
    <>
      <button className="btn-arrows-garments btn-arrows-garments-right" onClick={changeImgGarmentsButton}>
        <img src="/img/prenda/flechader.svg" loading="lazy" alt="" className="img-arrows-garments" />
      </button></>
  )
}