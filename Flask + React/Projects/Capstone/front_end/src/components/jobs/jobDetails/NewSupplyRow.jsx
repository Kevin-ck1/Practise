import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Searchtry from "./Searchtry"


const NewSupplyRow = ({productList, receiveProduct, existingProducts, setShowInputRow}) => {
    const [products, setProducts] = useState([])
    const [productSupplys, setProductSupplys] = useState([])

    useEffect(()=>{
        setProducts(productList)
    },[productList])

    //Importing Id list for products already added to the supply items
    useEffect(()=>{
        setProductSupplys(existingProducts)
    },[existingProducts])

    return (
    <tr>
        <th></th>
        <td className="text-center">
            <Searchtry productList={products} receiveProduct={receiveProduct} existingProducts={productSupplys}/>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <button className="pr-0 btn btn-lg text-dark" onClick={()=>setShowInputRow(false)}>
                <FontAwesomeIcon icon={faBan}/>
            </button>
        </td>
    </tr>
  )
}

export default NewSupplyRow