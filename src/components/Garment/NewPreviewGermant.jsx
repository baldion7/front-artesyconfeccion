import React, { useEffect, useState } from 'react'
import { SelectCategory } from './SelectCategory.jsx'
import { ViewImgGarment } from './ViewImgGarment.jsx'
import { NewDetailsGarment } from './NewDetailsGarment.jsx'
import { NewOperatingProcesses } from './NewOperatingProcesses.jsx'
import * as PropTypes from 'prop-types'
import { NewTechnicalInfo } from './NewTechnicalInfo.jsx'
import { NewMoldesAndStrokes } from './NewMoldesAndStrokes.jsx'

function NewTechnicalInformation (props) {
  return null
}

NewTechnicalInformation.propTypes = {
  garment: PropTypes.func,
  name: PropTypes.string
}
export const NewPreviewGermant = () => {
  const [image, setImage] = useState(null);
  const [imageBack, setImageBack] = useState(null);
  const [inputFrontal, setInputFrontal] = useState('');
  const [inputBack, setInputBack] = useState()
  const [category, setCategory] = useState({ id: '', description: '' });
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [garment, setGarment] = useState()
  const handleGarment = async (Name,Reference,Categoryid ) => {
    try {
      const response = await fetch('https://arteyconfecciones.com/api/garment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, reference: Reference, categoryid:Categoryid}),
      })
      if (response.ok) {
        const data = await response.json()
        if (data && data) {
          setGarment(data.respuesta.Id)
          handleGarmentImg("frontal", image, data.respuesta.Id)
          handleGarmentImg("trasera", imageBack, data.respuesta.Id)
        }
      }
alert("SE GUARDO CORRECTAMENTE")
    } catch (error) {
      // Manejo de errores
    }
  }
const sendGarment= () =>{
  handleGarment( name,category.description,category.id )
}

  const handleGarmentImg = async (Name, Image,Garment ) => {
    try {
        const response = await fetch('https://arteyconfecciones.com/api/imggarment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: Name, imgroute: Image, garmentid: Garment}),
      })
         await response.json()
    } catch (error) {
      // Manejo de errores
    }
  }

  const loadImage = async () => {
    if (type === "front") {
      try {
        setImage("https://arteyconfecciones.com/garments/" + category.description + '/' + name + '/general/' + inputFrontal);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    } else {
      try {
        setImageBack("https://arteyconfecciones.com/garments/" + category.description + '/' + name + '/general/' + inputBack);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }
  };

  useEffect(() => {
    loadImage();
  }, [inputFrontal,inputBack]);

  const handleInputname = (event) => {
      setName(event.target.value);
  };

  const handleCategoryChange = (id, description) => {
    setCategory({ id, description });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <h3 style={{color:"red"}}>Categoria de la prenda</h3>
        <SelectCategory setCategory={handleCategoryChange} />
        <h3 style={{color:"red"}}>Nombre de la prenda</h3>
        <input type="text"
          value={name}
          onChange={(e) => handleInputname(e, 1)}
          placeholder="Enter image URL"
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <ViewImgGarment image={image} setInputFrontal={setInputFrontal} inputFrontal={inputFrontal} setType={setType} type={"front"} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <ViewImgGarment image={imageBack} setInputFrontal={setInputBack} inputFrontal={inputBack} setType={setType} type={"back"} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <button onClick={sendGarment} style={{cursor:"pointer"}}
       style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Enviar prenda</button>
      </div>
      <NewDetailsGarment category={category} name={name} garment={garment} />
      <NewOperatingProcesses garment={garment} name={name}/>
      <NewTechnicalInfo garment={garment} name={name}/>
      <NewMoldesAndStrokes name={name} category={category.description} garment={garment}/>
    </>
  )
}