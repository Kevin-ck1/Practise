import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


const ProductRow = ({i, product, setEditRow, deletePrice}) => {
  return (
    <tr>
        <th scope='row'>{i+1}</th>
        <td>{product.name}: {product.brand}</td>
        <td>{product.category}</td>
        <td>{product.price}</td>
        <td>
            <button className="pr-1 btn btn-lg text-dark" onClick={()=>setEditRow(product.id)}>
                <FontAwesomeIcon icon={faPenToSquare}/>
            </button>
            <button className="pr-0 btn btn-lg text-dark" onClick={()=>deletePrice(product.id)}>
                <FontAwesomeIcon icon={faTrashCan}/>
            </button>
        </td>
    </tr>
  )
}

export default ProductRow