import {useParams} from "react-router-dom";
import {useState} from "react";
import {domain} from "../../api/domain.js";

export const ModalInstructions = ({SetNewOperation,NewOperation}) => {
    let { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        garmentid: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async () => {


        // Agrega el ID de la prenda al objeto de datos
        formData['garmentid'] = id;
        console.log(formData)
        // Realiza la solicitud a la API
        try {
            const response = await fetch(domain+'technicalinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
                },
                body: JSON.stringify(formData),
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
            <div className={`popup popup-video ${NewOperation === true ? 'active' : ''}`} id="detailsgarments">
                <div className="popup-scroll">
                    <div className="popup-header">
                        <h2 className="card-title" id="modal_title">
                            NUEVO PROCESO OPERATIVO
                        </h2>
                        <div>
                            <div
                                className="form-category"
                            >
                                <div className="conteiner-form-new-category">
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nombre del proceso"/>
                                    <input type="text" name="description" value={formData.description} onChange={handleChange} required
                                           placeholder="Descripción del procesos"/>
                                    <input type="hidden" name="garmentid" value={id}/>
                                </div>
                                <div className="div-submit">
                                    <button type="submit" className="submit" onClick={handleSubmit}>
                                        AGREGAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="popup-footer">
                        <button onClick={SetNewOperation} className="accept" id="button_exit_2">
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}