export const DateGarmentsSpecifications = ({specifications,molds}) => {
  return (
    <>
      <div className="instructions-garment" id="instructions_garment">
        <div className="instructions-garment-content">
          <h1>Especificaciones</h1>
            <ul>
              {specifications &&
                specifications.map((item, index) => {
                  return <li className={'punts-instructions-garment'} key={index}>{item.Description}</li>;
                })}
            </ul>
        </div>
      </div>
    </>
  )
}