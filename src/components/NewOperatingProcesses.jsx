import React, { useState } from 'react';

export const NewOperatingProcesses = ({ garment, name }) => {
  const [numInputs, setNumInputs] = useState(0);
  const [inputValues, setInputValues] = useState(Array(numInputs).fill(''));

  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  const generateInputFields = () => {
    const inputFields = [];
    for (let i = 0; i < numInputs; i++) {
      inputFields.push(
        <input
          type="text"
          placeholder={`Input ${i + 1}`}
          value={inputValues[i] || ''}
          onChange={(e) => handleInputChange(i, e.target.value)}
        />
      );
    }
    return inputFields;
  };

  const sendData = async () => {
    const promesasArmedInfo = inputValues.map(async (value) => {
      console.log(name, value, garment);
      return handleOperatingProcess(name, value, garment);
    });
    await Promise.all(promesasArmedInfo);

    // Restablecer los valores de los inputs después de enviar los datos
    setNumInputs(0);
    setInputValues(Array(0).fill(''));
  };

  const handleOperatingProcess = async (Name, Description, GarmentId) => {
    try {
      const response = await fetch('https://arteyconfecciones.com/api/operatingprocess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: Name, description: Description, garmentId: GarmentId }),
      });
      await response.json();
    } catch (error) {
      console.error('Error en handleOperatingProcess:', error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <h3 style={{ color: "red" }}>Proceso operativo</h3>
        <input
          type="number"
          id="numInputs"
          value={numInputs}
          onChange={(e) => setNumInputs(e.target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          {generateInputFields()}
          <button onClick={sendData} style={{ cursor: "pointer" }}
                  style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Enviar Proceso operativo</button>
          <button onClick={() => setInputValues(Array(numInputs).fill(''))}
                  style={{ marginTop: '10px', padding: '8px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}
          >Borrar Valores</button>
        </div>
      </div>
    </>
  );
};
