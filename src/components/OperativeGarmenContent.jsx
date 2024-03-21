import React from 'react'

export const OperativeGarmenContent = ({operative}) => {
  return (
    <>
      <div className="contenet-trazo-info">
        <div className="instructions-garment" style={{width: 'auto'}} id="instructions_garment">
      <div className="instructions-garment-content" id="proceso_operativo">
        <h1>Proceso operativo</h1>
        <ul>
          {operative &&
            operative.map((item, index) => {
              return <li className={'punts-instructions-garment'} key={index}>{item.Description}</li>;
            })}
        </ul>
      </div>
        </div>
    </div>
    </>
  )
}