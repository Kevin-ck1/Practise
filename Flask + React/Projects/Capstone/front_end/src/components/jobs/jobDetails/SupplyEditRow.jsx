import { useState, useEffect } from 'react'
import { faCheck, faBan,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SupplyEditRow = ({supplyItem, i, categoryList, setEditRow, receiveProduct}) => {
    const [supply, setSupply] = useState({})
    const [categories, setCategories] = useState([])
    const [editItems, setEditItems] = useState({})


    useEffect(()=>{
      setCategories(categoryList)
    },[categoryList])

    useEffect(() => {
      setSupply(supplyItem)
    }, [supplyItem])

    useEffect(()=>{
        const total = supply.qty * supply.price
        setSupply(prev=> {return{...prev, total:total}})
    }, [supply.qty, supply.price])

  return (
    <tr>
        <th>{i+1 || ""}</th>
        <td>{supply?.name || ""}</td>
        <td>{categories[supply?.category - 1] || ""}</td>
        <td> 
            <input defaultValue={supply?.qty} onChange={(e)=>setSupply(prev=> {return{...prev, qty:parseInt(e.target.value) || 0}})}/>
        </td>
        <td>
            <input defaultValue={supply?.price} onChange={(e)=>setSupply(prev=> {return{...prev, price:parseInt(e.target.value)|| 0}})}/>
        </td>
        <td>{supply?.total || ""}</td>
        <td>
            <button className="pr-1 btn btn-lg text-dark" onClick={()=>receiveProduct(supply, "Edit")}>
                <FontAwesomeIcon icon={faCheck}/>
            </button>
            <button className="pr-0 btn btn-lg text-dark" onClick={()=>setEditRow("")}>
                <FontAwesomeIcon icon={faBan}/>
            </button>
        </td>
    </tr>
  )
}

export default SupplyEditRow