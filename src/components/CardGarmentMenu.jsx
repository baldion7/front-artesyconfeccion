import { CardGarment } from './CardGarment.jsx'
import { NewCardGarments } from './NewCardGarments.jsx'
import { useSelector } from 'react-redux'
export const CardGarmentMenu = ({garment,numbeRamdon,search}) => {
  console.log(numbeRamdon)
  const user=useSelector((state)=>state.user.userState)
  const NewGarment=garment
  const NewSearch=search
  const renderGarments = () => {
    if (numbeRamdon){

        return NewGarment.map((opcion) => {
          const img = opcion.imggarments.find((item) => item.Name === "frontal");

          if (img) {
            return (
                <CardGarment img={img} garment={garment} opcion={opcion} key={opcion.Id}/>
            );
          } else {
            return null; // Opcional: omitir elementos sin imagen frontal
          }
        });

    }else if(NewSearch){
      return NewSearch.map((opcion) => {
        const img = opcion.imggarments.find((item) => item.Name === "frontal");

        if (img) {
          return (
            <CardGarment img={img} garment={garment} opcion={opcion} key={opcion.Id}/>
          );
        } else {
          return null; // Opcional: omitir elementos sin imagen frontal
        }
      });
    }else{
      if (NewGarment){
        return NewGarment.garments.map((opcion) => {
          const img = opcion.imggarments.find((item) => item.Name === "frontal");

          if (img) {
            return (
              <CardGarment img={img} garment={garment} opcion={opcion} key={opcion.Id}/>
            );
          } else {
            return null; // Opcional: omitir elementos sin imagen frontal
          }
        });
      }
    }

  };
  return (
    <>
      {user.role === 'Editor' && <NewCardGarments/>}
      {renderGarments()}
    </>
  )
}