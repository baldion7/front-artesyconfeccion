import {BtnOperationSpaciEditor} from "./BtnOperationSpaciEditor.jsx";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {ModalInstructions} from "./ModalInstructions.jsx";


export const DateGarmentsSpecifications = ({specifications}) => {
    const user=useSelector((state)=>state.user.userState)
    const [NewOperation, setNewOperation] = useState(false)
    const SetNewOperation = () => {
        setNewOperation(!NewOperation);
    };
  return (
    <>
      <div className="instructions-garment" id="instructions_garment">
        <div className="instructions-garment-content">
          <h1>Especificaciones</h1>
            {user.role === 'Editor' ?  <BtnOperationSpaciEditor message={"Agregar otro punto"} SetNewOperation={SetNewOperation}/>:null}
            <ul>
              {specifications &&
                specifications.map((item, index) => {
                  return <li className={'punts-instructions-garment'} key={index}>{item.Description}</li>;
                })}
            </ul>
        </div>
      </div>
        <ModalInstructions NewOperation={NewOperation} SetNewOperation={SetNewOperation}/>
    </>
  )
}