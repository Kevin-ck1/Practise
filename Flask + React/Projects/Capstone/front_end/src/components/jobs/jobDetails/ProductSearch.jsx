import { useEffect, useState } from "react"
import Searchtry from "./Searchtry"

const ProductSearch = ({productList, receiveProduct, existingProducts}) => {
    const [products, setProducts] = useState([])
    const [productSupplys, setProductSupplys] = useState([])
    // const [searchInput, setSearchInput] = useState("")

    useEffect(()=>{
        setProducts(productList)
    },[productList])

    //Importing Id list for products already added to the supply items
    useEffect(()=>{
        setProductSupplys(existingProducts)
    },[existingProducts])

    // //Function to check the Searched Input against the products
    // const filterProducts = (product)=>{
    //     const result = (
    //         (!productSupplys.includes(product.product_id)) &&
    //         product.name.toUpperCase().indexOf(searchInput.toUpperCase()) > -1 &&
    //         searchInput !== ""
    //     )
    //     return result
    // }
    
  return (
    <div className="RFQ">
        <div className="mt-2 mx-2 d-flex">
            <p className="text-info">Click Searched Item to Place the Item into the Product List</p> 
        </div>
        <div className="d-flex justify-content-between  m-2">
            <div className="col-sm-6">
                <Searchtry productList={products} receiveProduct={receiveProduct} existingProducts={productSupplys}/>
                {/* <input className="col-12 form-control" type="text" placeholder="Search Product" onChange={(e)=>setSearchInput(e.target.value)}/>
                <ul className="list-group list-group-flush " id="searchList">
                    {products.length > 0 && products.map((product, i)=>{
                        return(
                            <li 
                                key={i} 
                                className="list-group-item"
                                style={{display: filterProducts(product) ? "flex" : "none"}}
                                onClick={()=>receiveProduct(product)}
                            >
                                {product.name}
                            </li> 
                        )
                    })}
                </ul> */}
            </div>
        </div>
    </div>
  )
}

export default ProductSearch