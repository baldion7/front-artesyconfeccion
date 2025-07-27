import {domain2} from "../../api/domain.js";

export const ImgMoldesConteiner = ({molds}) => {
  return (
    <>
      <div className="img-molds-btn">
        <h1>DESPIECE</h1>
        <div className="prueba" id="moldes">

          {molds && molds.length > 0 ? (
            <img src={domain2+""+molds[0].img_route} alt="" loading="lazy" />
          ) : null}
        </div>
      </div>
    </>
  )
}