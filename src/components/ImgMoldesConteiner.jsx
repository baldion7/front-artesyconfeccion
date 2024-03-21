export const ImgMoldesConteiner = ({molds}) => {
  return (
    <>
      <div className="img-molds-btn">
        <h1>DESPIECE</h1>
        <div className="prueba" id="moldes">

          {molds && molds.length > 0 ? (
            <img src={molds[0].img_route} alt="" loading="lazy" />
          ) : null}
        </div>
      </div>
    </>
  )
}