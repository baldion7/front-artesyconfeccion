import React from 'react'

export const ViewImgGarment = ({ image, setInputFrontal, inputFrontal, setType, type }) => {

  const handleInputImgFrontal = (event) => {
    setInputFrontal(event.target.value);
    setType(type);
  };

  return (
    <>
      <h3 style={{color:"red"}}>Nombre de la imagen {type=="front"?"Frontal":"Trasera"}</h3>
      <input
        type="text"
        value={inputFrontal}
        onChange={(e) => handleInputImgFrontal(e)}
        placeholder="Enter image URL"
        style={{ padding: '10px', marginRight: '10px' }}
      />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {image && <img src={image} alt="Imagen" style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '10px' }} />}
      </div>
    </>
  )
}