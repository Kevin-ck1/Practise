import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Product } from "../hooks/ProductObject"
import useFetch from "../hooks/useFetch"

const Products = () => {
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const data = useFetch('/get_variables') || []
  const fetchSuppliers = useFetch('/suppliers')
  const fetchProducts = useFetch('/products')
  const [isHover, setIsHover] = useState(false)
  const [show, setShow] = useState(false)
  const [product, setProduct] = useState(Product())
  const [submitP, setSubmitP] = useState(false)
  const [error, setError] = useState(false)
  const [error1, setError1] = useState(false)
  const [similarProduct, setSimilarProduct] = useState(Product())
  const [searchName, setSearchedName] = useState("")
  const navigate = useNavigate()

  const fetchVariables = async() => {
    const res = await fetch('/get_variables')
    const res_data = await res.json()

    setCategories(res_data.Categories)
  }

  useEffect(()=>{
    //To set the categories value
    fetchVariables()
  },[])

  useEffect(()=>{
    //To set the suppliers dropdown values
    setSuppliers(fetchSuppliers)
  },[fetchSuppliers])

  useEffect(()=>{
    //Setting up the products
    setProducts(fetchProducts)
  },[fetchProducts])

  //Check if all the values for the product object are field
  const checkProduct = () =>{
    const state = Object.values(product).every(el => el !== undefined && el !== "")
    setSubmitP(state)
  }

  useEffect(()=>{
    //Checking if a similar Product exists
    products.forEach((p)=>{
      if(p.name === product.name && p.brand === product.brand){
        setError1(true)
        setSubmitP(false)
        setSimilarProduct(p)
      } else{
        setError1(false)
        setSimilarProduct(Product())
      }
    })
    //To check that the values for the product object are filled
    checkProduct()

  },[product])

  const filterProducts = (name)=>{
    return(name.toUpperCase().indexOf(searchName.toUpperCase()) > -1 && searchName !== "")
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(submitP){
      const res = await fetch('/products',{
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(product)
      })
      const res_data = await res.json() || ""

      if(res.status === 200){
        setProducts([...products, product])
        setError(false)
        console.log(res_data)
        setProduct(Product())
        setShow(false)
        e.currentTarget.closest("form").reset()
      }else{
        console.log("Product Did Not Submit")
      }
      
    }else{
      console.log("Fill in all fields")
      setError(true)
    }
  }

  //Open clicked company details
  const openDetails = (product)=>{
    navigate(`/products/${product.product_id}` , {state:{productData:product}})
  }

  const addButton = {
    color: isHover ? "aqua" : "rgb(124, 222, 252)",
    textDecoration: isHover ? "underline" : "none",
    cursor: "pointer"
  }
  const buttonStyle = () =>{
    setIsHover(!isHover)
  }
  const errorBlock = {
    display: error ? "block" : "none" ,
    // fontSize: '0.75rem',
    borderRadius: "0.5rem",
    background: "#888888",
    color: "#fff",
    padding: "0.25rem",
    // position: "relative",
    bottom: "-10px",
  }

 

  return (
    <div className="container">
      {/* intro */}
      <div className="d-flex justify-content-between mr-2">
        <h1>Products</h1>
        <h4 
          className="align-self-center" 
          style={addButton} 
          onMouseEnter={buttonStyle} 
          onMouseLeave={buttonStyle}
          onClick={()=>setShow(true)}
          >+ Product
        </h4>
        
      </div>
      {/* Input Form */}
      <div className="p-3 card" style={{display: show ? "block" : "none" }}>
        <form>
          <div className="row">
            <div className="from-group col-md-4">
              <label htmlFor="" className="justify-content-start">Product</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Product's Name" 
                required
                onChange={(e)=>setProduct(prev=>{return{...prev, name:e.target.value}})}
              />
            </div>
            <div className="from-group col-md-4">
              <label htmlFor="">Brand</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Product's Brand" 
                required
                onChange={(e)=>setProduct(prev=>{return{...prev, brand:e.target.value}})}
              />
            </div>
            <div className="from-group col-md-4">
              <label htmlFor="">Category</label>
              <select className="form-control" defaultValue={"Default"} onChange={(e)=>setProduct(prev=>{return{...prev, category:parseInt(e.target.value)}})}>
              <option disabled value={"Default"}>Select Category</option>
                {
                  categories.length > 0 && categories.map((category, i)=>{
                    return(
                      <option key={i} value={i+1}>{category}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>

          <div className="pt-2" >
            <p style={{...errorBlock, ...{display : error1 ? "block" : "none"}}}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Product Already Exist, Check <Link to={`/products/${similarProduct.id}`}>{similarProduct.name}</Link> to edit the product
            </p>
          </div>
          
          <div className="row">
            <div className="from-group col-md-4">
              <label htmlFor="" className="justify-content-start">Price</label>
              <input 
                type="text" 
                className="form-control" 
                required
                onChange={(e)=>setProduct(prev=>{return{...prev, price:e.target.value}})}
              />
            </div>
            <div className="from-group col-md-4">
              <label htmlFor="" className="justify-content-start">Supplier</label>
              <select className="form-control" defaultValue={"Default"} onChange={(e)=>setProduct(prev=>{return{...prev, supplier:parseInt(e.target.value)}})}>
                <option style={{color:"grey"}} disabled value={"Default"}>Select Supplier</option>
              {
                suppliers.length >= 1 && suppliers.map((supplier, i)=>{
                  return(
                    <option key={i} value={supplier.id}>{supplier.nameC}</option>
                  )
                })
              }
              </select>
            </div>
            <div className="from-group col-md-2">
              <label htmlFor="" className="justify-content-start">Size</label>
              <input 
              type="text" 
              className="form-control" 
              required
              onChange={(e)=>setProduct(prev=>{return{...prev, size:e.target.value}})}
              />
            </div>
            <div className="from-group col-md-2">
              <label htmlFor="" className="justify-content-start">Weight</label>
              <input 
              type="text" 
              className="form-control" 
              required
              onChange={(e)=>setProduct(prev=>{return{...prev, weight:e.target.value}})}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input 
                type="text" 
                className="form-control" 
                id="description"
                placeholder="Product Description"
                required
                onChange={(e)=>setProduct(prev=>{return{...prev, description:e.target.value}})}
              />
          </div>
          <div className="pt-2">
            <p style={errorBlock}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Make sure all the fields are filled
            </p>
          </div>
          <div className="pt-2 d-flex justify-content-between ">
            <button type="submit" className={`btn ${submitP ? "btn-primary" : "btn-secondary"}`} id="submitButton" onClick={(e)=>handleSubmit(e)}>Add Product</button>
            <p className="buttonClose" onClick={()=>setShow(false)}>[x Close]</p>
          </div>
        </form>
      </div>

      {/* Search Filter */}
      <div className="row form-group mx-1 mb-4 pt-2 col-md-6">
        <input 
          className="form-control border-primary" 
          type="text" 
          placeholder="Search Products"
          onChange={(e)=>setSearchedName(e.target.value)}
        />
        
        <table className="table table-striped table-hover table-bordered border-primary" >
          <tbody>
            {
              products.length >= 1 && products.map((product, i)=>{
                return(
                  <tr 
                    key={i} 
                    style={{display: filterProducts(product.name) ? "" : "none"}} 
                    onClick={()=> openDetails(product)}
                  ><td>{product.name}</td></tr>
                  )
  
              })
            }
          </tbody>
        </table>
      </div>

      {/* Products Table */}
      <div className="rounded mt-2 pt-2">
        <table className="table table-striped table-hover table-bordered border-primary pt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Supplier</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
          {
            products.length >= 1 && (
              products.map((product, i)=>{
                return(
                  <tr key={i} onClick={()=> openDetails(product)}>
                    <td>{i+1}</td>
                    <td>{product.name} : {product.brand}</td>
                    <td>{product.name}</td>
                    <td>{categories[product.category - 1]}</td>
                    <td>{product.price}</td>
                  </tr>
                )
              })
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products