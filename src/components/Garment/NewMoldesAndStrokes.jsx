import React, { useEffect, useState } from 'react';

export const NewMoldesAndStrokes = ({ name, category, garment }) => {
  const [imageMolde, setImageMolde] = useState();
  const [imageStrokes, setImageStrokes] = useState();
  const [nameMolde, setNameMolde] = useState('');
  const [nameStrokes, setNameStrokes] = useState('');

  useEffect(() => {
    setImageStrokes(`https://arteyconfecciones.com/garments/${category}/${name}/molde/${nameStrokes}`);
  }, [nameStrokes]);

  useEffect(() => {
    setImageMolde(`https://arteyconfecciones.com/garments/${category}/${name}/molde/${nameMolde}`);
  }, [nameMolde]);

  const sendMoldesAndStrokes = () => {
    console.log(imageMolde, imageStrokes, garment);
    const molde = imageMolde || '1';
    const strokes = imageStrokes || '1';
    handleImagenMoldesAndStrokes({ molde, strokes, garment });

    // Vaciar los inputs después de guardar
    setNameMolde('');
    setNameStrokes('');
  };

  const handleImagenMoldesAndStrokes = async ({ molde, strokes, garment }) => {
    console.log(molde, strokes, garment);
    try {
      const response = await fetch('https://arteyconfecciones.com/api/models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgroute: molde, imgroutetrazos: strokes, garmentid: garment }),
      });
      await response.json();
    } catch (error) {
      console.error('Error in handleImagenMoldesAndStrokes:', error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <h3 style={{ color: "red" }}>Nombre de la imagen del molde</h3>
        <input type="text" value={nameMolde} onChange={(e) => setNameMolde(e.target.value)} placeholder="Molde" />
        {imageMolde && <img src={imageMolde} alt="Molde" style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '10px' }} />}

        <h3 style={{ color: "red" }}>Nombre de la imagen de los trazos</h3>
        <input type="text" value={nameStrokes} onChange={(e) => setNameStrokes(e.target.value)} placeholder="Strokes" />
        {imageStrokes && <img src={imageStrokes} alt="Strokes" style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '10px' }} />}
        <button onClick={sendMoldesAndStrokes} style={{ cursor: "pointer" }} style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}
        >Guardar</button>
      </div>
    </>
  );
};
