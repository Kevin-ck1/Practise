import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const SupplyRow = ({supplyItem, i, categoryList, setEditRow, deleteSupply, displayActionColumn }) => {
    const [supply, setSupply] = useState({})
    const [categories, setCategories] = useState([])

    useEffect(()=>{
      setCategories(categoryList)
    },[categoryList])

    useEffect(() => {
      setSupply(supplyItem)
    }, [supplyItem])
    

  return (
    <tr>
        <th>{i+1}</th>
        <td>{supply?.name}</td>
        <td>{categories[supply?.category - 1]}</td>
        <td>{supply?.qty}</td>
        <td>{supply?.price}</td>
        <td>{supply?.total}</td>
        { displayActionColumn  && 
          <td>
            <button className="pr-1 btn btn-lg text-dark" onClick={()=>setEditRow(supply.product_id)}>
                <FontAwesomeIcon icon={faPenToSquare}/>
            </button>
            <button className="pr-0 btn btn-lg text-dark" onClick={()=>deleteSupply(supply.id)}>
                <FontAwesomeIcon icon={faTrashCan}/>
            </button>
          </td>
        }
    </tr>
  )
}

export default SupplyRow