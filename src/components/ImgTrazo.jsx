export const ImgTrazo = ({molds}) => {
  return (
    <>

      <div className="img-trazo" id="img-trazo">
        <div>
        <h1>TRAZOS</h1>
        </div>
        {molds && molds.length > 0 ? (
            <div style={{width: '100%'}}>
                <img src={molds[0].img_route} alt="" loading="lazy"/>
            </div>

        ) : null}
      </div>
    </>
  )
}