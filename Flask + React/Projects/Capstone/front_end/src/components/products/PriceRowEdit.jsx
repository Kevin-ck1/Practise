import { useState, useEffect } from 'react'
import { faCheck, faBan,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const PriceRowEdit = ({i, price, saveEdit, closeEdit,supplier}) => {
    const [p, setP] = useState({})

    useEffect(()=>{
        setP(price)
    },[])


  return (
    <tr>
        <th scope='row'>{i+1}</th>
        <td>{supplier.nameC}</td>
        <td>
            <input 
                type="text" 
                className="form-control" 
                onChange={(e)=>setP(prev=>{return{...prev, price:e.target.value}})}
                required
                defaultValue={price.price}
            />
        </td>
        
        <td>
            <button className="pr-1 btn btn-lg text-dark" onClick={()=>saveEdit(p, price.supplier_id)}>
                <FontAwesomeIcon icon={faCheck}/>
            </button>
            <button className="pr-0 btn btn-lg text-dark" onClick={()=>closeEdit()}>
                <FontAwesomeIcon icon={faBan}/>
            </button>
        </td>
    </tr>
  )
}

export default PriceRowEdit