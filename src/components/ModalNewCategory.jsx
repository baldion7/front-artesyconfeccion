export const ModalNewCategory = ({ SetNewCategory, NewCategory }) => {
  const setNewCategory = () => {
    SetNewCategory();
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita la redirección predeterminada del formulario

    // Obtén los datos del formulario
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Realiza la solicitud a la API
    try {
      const response = await fetch('https://arteyconfecciones.com/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
        // La solicitud fue exitosa, puedes manejar la respuesta aquí si es necesario
        console.log('Solicitud exitosa');
      } else {
        // La solicitud falló, puedes manejar el error aquí si es necesario
        console.error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  return (
    <>
      <div className={`popup popup-video ${NewCategory === true ? 'active' : ''}`} id="detailsgarments">
        <div className="popup-scroll">
          <div className="popup-header">
            <h2 className="card-title" id="modal_title">
              NUEVA CATEGORIA
            </h2>
            <div>
              <div
                className="form-category"
                action="https://arteyconfecciones.com/api/category"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="conteiner-form-new-category">
                  <input type="text" name="name" required placeholder="Nombre de la categoría" />
                  <input type="text" name="description" required placeholder="Descripción de la categoría" />
                </div>
                <div className="div-submit">
                  <button type="submit" className="submit">
                    AGREGAR
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="popup-footer">
            <button onClick={setNewCategory} className="accept" id="button_exit_2">
              Regresar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
