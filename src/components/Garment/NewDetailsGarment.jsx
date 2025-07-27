import React, { useEffect, useState } from 'react';
import {domain, domain2} from "../../api/domain.js";

export const NewDetailsGarment = ({ category, name, garment }) => {
  const [inputDetails, setInputDetails] = useState('');
  const [image, setImage] = useState();
  const [numInputs, setNumInputs] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [details, setDetails] = useState('');
  const armedInfo = [];

  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  const handleBtnDetails = async (Name, GarmentId) => {
    try {
      const response = await fetch(domain+'btndetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: Name, garmentId: GarmentId }),
      });
      const data = await response.json();
      return data.Id;
    } catch (error) {
      console.error('Error en handleBtnDetails:', error);
    }
  };

  const handleDetailGarment = async (Name, Image, BtndetailId) => {
    try {
      const response = await fetch(domain+'imggarment/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: Name, imgroute: Image, btndetailId: BtndetailId }),
      });
      await response.json();
    } catch (error) {
      console.error('Error en handleDetailGarment:', error);
    }
  };

  const handleArmedInfo = async (Name, Description, GarmentId) => {
    try {
      const response = await fetch(domain+'armedinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: Name, description: Description, garmentid: GarmentId }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.Id) {
          armedInfo.push(data.Id);
        }
      }
    } catch (error) {
      console.error('Error en handleArmedInfo:', error);
    }
  };

  const handleAllowArmedInfo = async (ArmedInfoId, BtndetailId) => {
    try {
      const response = await fetch(domain+'allowarmedInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ armedInfoId: ArmedInfoId, btndetailId: BtndetailId }),
      });
      await response.json();
    } catch (error) {
      console.error('Error en handleAllowArmedInfo:', error);
    }
  };

  const loadImage = () => {
    try {
      setImage(
          domain2+`${category.description}/${name}/detalles/${inputDetails}`
      );
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

  const prueba = async () => {
    try {
      const idDetails = await handleBtnDetails(details, garment);
      await handleDetailGarment(details, image, idDetails);

      const promesasArmedInfo = inputValues.map(async (value) => {
        return handleArmedInfo(details, value, garment);
      });
      await Promise.all(promesasArmedInfo);

      const promesasAllowArmedInfo = armedInfo.map(async (armedInfoId) => {
        console.log("Llegue primero", armedInfoId, idDetails);
        return handleAllowArmedInfo(armedInfoId, idDetails);
      });
      await Promise.all(promesasAllowArmedInfo);

      // Restablecer los estados a sus valores iniciales
      setDetails('');
      setInputDetails('');
      setInputValues([]);

    } catch (error) {
      console.error('Error en prueba:', error);
    }
  };

  useEffect(() => {
    loadImage();
  }, [inputDetails]);

  const handleInputDetails = (event) => {
    setInputDetails(event.target.value);
  };

  const generateInputFields = () => {
    const inputFields = [];
    for (let i = 0; i < numInputs; i++) {
      inputFields.push(
        <input
          key={i}
          type="text"
          placeholder={`Input ${i + 1}`}
          value={inputValues[i] || ''}
          onChange={(e) => handleInputChange(i, e.target.value)}
        />
      );
    }
    return inputFields;
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <h3 style={{ color: "red" }}>Titulo del detalle</h3>
        <input
          type="text"
          value={details}
          placeholder={'Nombre'}
          onChange={(e) => setDetails(e.target.value)}
        />
        <h3 style={{ color: "red" }}>Nombre de la imagen</h3>
        <input
          type="text"
          value={inputDetails}
          onChange={(e) => handleInputDetails(e)}
          placeholder={'Enter image URL'}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {image && <img src={image} alt="Imagen" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <h3 style={{ color: "red" }}> Detalles</h3>

        <label htmlFor="numInputs">Número de Inputs: </label>
        <input
          type="number"
          id="numInputs"
          value={numInputs}
          onChange={(e) => setNumInputs(e.target.value)}
        />

        {generateInputFields()}
        <button onClick={prueba} style={{ cursor: "pointer" }} style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Enviar detalles</button>
        <button onClick={() => setInputValues([])} style={{ marginTop: '10px', padding: '8px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>Borrar Valores</button>
      </div>

    </>
  );
};
