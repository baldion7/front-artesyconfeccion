import React from 'react'

export const ImgGarmentContainer = ({img}) => {
  return (
    <>
      <div id="container_img_garments">
        <div>
        <img src={img} loading="lazy" className={'imgprenda'}/>
        </div>
      </div>
    </>
  )
}