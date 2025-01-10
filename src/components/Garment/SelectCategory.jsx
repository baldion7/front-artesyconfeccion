import React, { useEffect, useState } from 'react';

export const SelectCategory = ({ setCategory }) => {
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState({ id: '', description: '' }); // Inicializar con valores vacíos

  const fetchData = async () => {
    const response = await fetch("https://arteyconfecciones.com/api/category/");
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const [id, description] = selectedValue.split('|'); // Suponiendo que el valor tiene el formato "id|name"
    setSelectedOption({ id, description });
    console.log("Opción seleccionada:", { id, description });
    setCategory(id, description); // Corregir la llamada a setCategory
    console.log(data)
  };

  return (
    <>
     <div style={{padding: '10px'}}>
      <select value={`${selectedOption.id}|${selectedOption.description}`} onChange={handleSelectChange}>
        <option value="">Select a category</option>
        {data && data.map(({ Name, Id, Description }) => (
          <option key={Id} value={`${Id}|${Description}`}>{Name}</option>
        ))}
      </select>
     </div>
    </>
  );
};
