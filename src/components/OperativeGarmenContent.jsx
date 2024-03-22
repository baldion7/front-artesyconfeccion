import React, {useState} from 'react'
import {BtnOperationSpaciEditor} from "./BtnOperationSpaciEditor.jsx";
import {useSelector} from "react-redux";
import {ModalOperation} from "./ModalOperation.jsx";

export const OperativeGarmenContent = ({operative}) => {
    const user=useSelector((state)=>state.user.userState)
    const [NewOperation, setNewOperation] = useState(false)
    const SetNewOperation = () => {
        setNewOperation(!NewOperation);
    };
  return (
    <>
      <div className="contenet-trazo-info">
        <div className="instructions-garment" style={{width: 'auto'}} id="instructions_garment">
      <div className="instructions-garment-content" id="proceso_operativo">
        <h1>Proceso operativo</h1>
          {user.role === 'Editor' ?  <BtnOperationSpaciEditor message={"Agregar otro punto"} SetNewOperation={SetNewOperation}/>:null}
        <ul>
          {operative &&
            operative.map((item, index) => {
              return <li className={'punts-instructions-garment'} key={index}>{item.Description}</li>;
            })}
        </ul>
      </div>
        </div>
    </div>
        <ModalOperation NewOperation={NewOperation} SetNewOperation={SetNewOperation}/>
    </>
  )
}