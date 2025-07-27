import React from 'react'
import {domain2} from "../../api/domain.js";

export const ImgGarmentContainer = ({img}) => {
  return (
    <>
      <div id="container_img_garments">
        <div>
        <img src={domain2+""+img} loading="lazy" className={'imgprenda'}/>
        </div>
      </div>
    </>
  )
}