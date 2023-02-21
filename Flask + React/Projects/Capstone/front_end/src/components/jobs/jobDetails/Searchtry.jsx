import { useEffect, useState } from "react"

const Searchtry = ({productList, receiveProduct, existingProducts}) => {
    const [products, setProducts] = useState([])
    const [productSupplys, setProductSupplys] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(()=>{
        setProducts(productList)
    },[productList])

    //Importing Id list for products already added to the supply items
    useEffect(()=>{
        setProductSupplys(existingProducts)
    },[existingProducts])

    //Function to check the Searched Input against the products
    const filterProducts = (product)=>{
        const result = (
            (!productSupplys.includes(product.product_id)) &&
            product.name.toUpperCase().indexOf(searchInput.toUpperCase()) > -1 &&
            searchInput !== ""
        )
        return result
    }
    
    const handleClick = (e, product)=>{
        receiveProduct(product, "inputRow") 
        e.target.value = ""
        setSearchInput("")
    }

  return (
    <>
    <input className="col-12 form-control" type="text" placeholder="Search Product" onChange={(e)=>setSearchInput(e.target.value)}/>
    <ul className="list-group list-group-flush " id="searchList">
        {products.length > 0 && products.map((product, i)=>{
            return(
                <li 
                    key={i} 
                    className="list-group-item"
                    style={{display: filterProducts(product) ? "flex" : "none"}}
                    onClick={(e)=>handleClick(e, product)}
                >
                    {product.name}
                </li> 
            )
        })}
    </ul>
    </>
  )
}

export default Searchtry