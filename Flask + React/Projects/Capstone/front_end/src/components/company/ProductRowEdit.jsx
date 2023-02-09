import { useState, useEffect } from 'react'
import { faCheck, faBan,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ProductRowEdit = ({i, product, saveEdit, closeEdit}) => {
    const [p, setP] = useState({})

    useEffect(()=>{
        setP(product)
    },[])


  return (
    <tr>
        <th scope='row'>{i+1}</th>
        <td>{product.name}: {product.brand}</td>
        <td>{product.category}</td>
        <td>
            <input 
                type="text" 
                className="form-control" 
                onChange={(e)=>setP(prev=>{return{...prev, price:e.target.value}})}
                required
                defaultValue={product.price}
            />
        </td>
        
        <td>
            <button className="pr-1 btn btn-lg text-dark" onClick={()=>saveEdit(p)}>
                <FontAwesomeIcon icon={faCheck}/>
            </button>
            <button className="pr-0 btn btn-lg text-dark" onClick={()=>closeEdit()}>
                <FontAwesomeIcon icon={faBan}/>
            </button>
        </td>
    </tr>
  )
}

export default ProductRowEdit