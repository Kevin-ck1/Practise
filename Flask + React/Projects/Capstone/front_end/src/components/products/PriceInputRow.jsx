import { useState, useEffect } from 'react'
import { faCheck, faBan,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const PriceInputRow = ({closeInput, suppliers, handleSubmit, sList}) => {
    
    const [price, setPrice] = useState()
    const [supplier, setSupplier] = useState()
    const [displayList, setDislayList] = useState()

    const checkSList = (id) =>{
        return (sList.includes(id))
    }

  return (
    <tr>
        <th scope='row'>!</th>
        <td>
            <select className="form-control" onChange={(e)=>setSupplier(e.target.value)} defaultValue={"Default"}>
                <option style={{color:"grey"}} value={"Default"} disabled>Select Supplier</option>
                {
                    suppliers.length >= 1 && suppliers.map((supplier, i)=>{
                        return(
                        <option key={i} value={supplier.id} style={{display: checkSList(supplier.id) ? "none" : "block"}}>{supplier.nameC}</option>
                        )
                    })
                }
            </select>
        </td>
        <td>
            <input 
                type="text" 
                className="form-control" 
                onChange={(e)=>setPrice(e.target.value)}
                required
            />
        </td>
        
        <td>
            <button className="pr-1 btn btn-lg text-dark" onClick={()=>handleSubmit(price, supplier)}>
                <FontAwesomeIcon icon={faCheck}/>
            </button>
            <button className="pr-0 btn btn-lg text-dark" onClick={()=>closeInput(false)}>
                <FontAwesomeIcon icon={faBan}/>
            </button>
        </td>
    </tr>
  )
}

export default PriceInputRow