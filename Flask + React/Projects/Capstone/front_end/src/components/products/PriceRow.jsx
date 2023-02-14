import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'


const PriceRow = ({i, price, setEditRow, deletePrice, supplier}) => {
    useEffect(()=>{
        // console.log(supplier)
    },[])
  return (
    <tr>
        <th scope='row'>{i+1}</th>
        <td>{supplier.nameC}</td>
        <td>{price.price}</td>
        <td>
            <button className="pr-1 btn btn-lg text-dark" onClick={()=>setEditRow(price.id)}>
                <FontAwesomeIcon icon={faPenToSquare}/>
            </button>
            <button className="pr-0 btn btn-lg text-dark" onClick={()=>deletePrice(price.id, price.supplier_id)}>
                <FontAwesomeIcon icon={faTrashCan}/>
            </button>
        </td>
    </tr>
  )
}

export default PriceRow