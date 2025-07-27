import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import domain from "../../api/domain.js";
export const NavCategoryLeft = ({categorys}) => {
  const [category, setCategory] = useState(null)
  const SetCategorys=(id)=>{
    categorys(id)
  }
  useEffect(() => {
      fetch(domain+'category')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setCategory(data)
          SetCategorys(data[0].Id)
        })
        .catch(error => {
        //errr
        });
    }, []);

const categoryselect = (e) => {
  const indextemp = e.currentTarget.getAttribute("data-index");
  SetCategorys(indextemp)
}
  return (
    <>
      {category && category.map(({Name,Id})=>(
        <li key={Id}><a data-index={Id} onClick={(e)=>categoryselect(e)} className="ps-preview-btn-garment" >{Name}</a></li>
      ))}
    </>
  )
}