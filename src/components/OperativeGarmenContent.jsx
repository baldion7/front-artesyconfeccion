import React, { useState } from 'react';
import { BtnOperationSpaciEditor } from "./BtnOperationSpaciEditor.jsx";
import { useSelector } from "react-redux";
import { ModalOperation } from "./ModalOperation.jsx";

export const OperativeGarmenContent = ({ operative }) => {
    const user = useSelector((state) => state.user.userState);
    const [NewOperation, setNewOperation] = useState(false);

    const SetNewOperation = () => {
        setNewOperation(!NewOperation);
    };

    // Ordena el array 'operative' por Id en orden ascendente
    const sortedOperative = operative ? [...operative].sort((a, b) => a.Id - b.Id) : [];

    return (
        <>
            <div className="contenet-trazo-info">
                <div className="instructions-garment" style={{ width: '100%' }} id="instructions_garment">
                    <div className="instructions-garment-content" id="proceso_operativo">
                        <h1>Proceso operacional</h1>
                        {user.role === 'Editor' ?
                            <BtnOperationSpaciEditor message={"Agregar otro punto"} SetNewOperation={SetNewOperation} />
                            : null}
                        <ul>
                            {sortedOperative.map((item, index) => (
                                <li className={'punts-instructions-garment'} key={index}>
                                    {item.Description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <ModalOperation NewOperation={NewOperation} SetNewOperation={SetNewOperation} />
        </>
    );
};
