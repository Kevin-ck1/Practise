import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import PricesTable from "./PricesTable"


const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [prices, setPrices] = useState([])
    const [editedP, setEditedP] = useState({})
    const [categories, setCategories] = useState([])
    const location = useLocation()
    const url = location.pathname
    const id = url.split('/').pop()
    let data = location.state?.productData
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false)

    const fetchProduct = async()=>{
        const res = await fetch(`/products/${id}`)
        console.log(res.status)
        if(res.status === 200){
            const res_data = await res.json()
            setProduct(res_data.product)
            setPrices(res_data.prices) 
        }else{
            navigate(`/products`)
        }
    }

    const fetchPrice = async()=>{
        const res = await fetch(`/products/${id}`)
        const res_data = await res.json()
        setPrices(res_data.prices)
    }

    const fetchVariables = async()=>{
        const res = await fetch('/get_variables')
        const res_data = await res.json()
        setCategories(res_data["Categories"])
        
    }

    useEffect(()=>{
        // fetchProduct() 
        if(data){
            setProduct(data)
            fetchPrice()
        }else{
            fetchProduct()  
        }
        fetchVariables()
        
    },[id, data])

    const editMode = () =>{
        setEdit(true)
        setEditedP(product)
    }

    const saveProductEdit = async()=>{
        //Retrieving the required properties
        const subset = (({brand, category, description, id, name, size, weight})=>({brand, category, description, id, name, size, weight}))(editedP)
        subset.id = editedP.product_id || subset.id

        const res = await fetch(`/products/${id}`,{
            method: "PUT",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(subset)
          })
        const res_data = await res.json()
        if(res.status === 200){
            setProduct(subset)
            setEdit(false)
        }
    }

    const deleteProduct = async()=>{
        const res = await fetch(`/products/${id}`,{method: "DELETE"})
        const res_data = await res.json()
        if(res.status === 200){
            navigate('/products')
        }
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-between mt-4">
                <div >
                    <h2>
                        <span style={{display: !edit ? "block" : "none"}}>{product.name}</span>
                        <input 
                            className="form-control form-control-lg"  
                            style={{display: edit ? "block" : "none"}} 
                            type="text" 
                            defaultValue={product.name}
                            onChange={(e)=>setEditedP(prev=>{return{...prev, name:e.target.value}})}
                        />
                    </h2>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <button className={`btn ${edit ? "btn-outine-secondary" : "btn-outline-primary"} btn-sm mx-2`} onClick={editMode} disabled={edit}>Edit Product</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={deleteProduct}>Delete</button>
                </div>
            </div>
            <div className="row mt-3 border-bottom border-top">
                <div className="border-bottom col-12 row pb-2 mt-3">
                    <div className="col-md-6 d-flex justify-content-start">
                        <div className="flex-column col-12">
                            <h5 className="row">
                                <span className="d-flex justify-content-start"> 
                                    Category: &nbsp;
                                    {
                                        categories.length >= 0 && <span className="text-info" style={{display:!edit ? "block" : "none"}} >{categories[product.category - 1]}</span>
                                    }
                                </span>
                                <select 
                                className="form-control align-items-center my-2 px-2" 
                                defaultValue={product.category} 
                                style={{display:edit ? "block" : "none"}} 
                                onChange={(e)=>setEditedP(prev=>{return{...prev, category:parseInt(e.target.value)}})}>
                                    {
                                        categories.length >=0 && categories.map((category, i)=>{
                                            return(
                                            <option key={i} value={i+1}>{category}</option>
                                            )
                                        })
                                    }
                                </select>
                            </h5>

                            <h5 className="row">
                                <span className="d-flex justify-content-start">
                                    Brand: &nbsp;
                                    <span className="text-info" style={{display:!edit ? "block" : "none"}}> {product.brand}</span>
                                    </span>
                                <input 
                                    className="form-control my-2 px-2" 
                                    style={{display:edit ? "block" : "none"}} 
                                    type="text" 
                                    defaultValue={product.brand}
                                    onChange={(e)=>setEditedP(prev=>{return{...prev, brand:e.target.value}})}
                                /> 
                            </h5>
                        </div>
                    </div>

                    <div className="col-md-6 d-flex justify-content-start">
                        <div className="flex-column col-12">
                            <h5 className="row">
                                <span className="d-flex justify-content-start">
                                    Size: &nbsp;
                                    <span className="text-info" style={{display:!edit ? "block" : "none"}}>{product.size}</span>
                                </span>
                                <input 
                                    className="form-control m-2" 
                                    style={{display:edit ? "block" : "none"}} 
                                    type="text" 
                                    defaultValue={product.size}
                                    onChange={(e)=>setEditedP(prev=>{return{...prev, size:e.target.value}})}
                                /> 
                            </h5>

                            <h5 className="row">
                                <span className="d-flex justify-content-start">
                                    Weight: &nbsp; 
                                    <span className="text-info" style={{display:!edit ? "block" : "none"}}>{product.weight}</span>
                                </span>
                                <input 
                                    className="form-control m-2" 
                                    style={{display:edit ? "block" : "none"}} 
                                    type="text" 
                                    defaultValue={product.weight}
                                    onChange={(e)=>setEditedP(prev=>{return{...prev, weight:e.target.value}})}
                                /> 
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-12 pt-1 d-flex justify-content-start">
                    <div className="col-12 flex-column">
                        <h4 className="d-flex justify-content-start">Description:</h4>
                        <p className="d-flex justify-content-start" >
                            <span style={{display: !edit? "block" : "none"}}>{product.description}</span>
                        </p>
                        <input 
                            className="form-control" 
                            style={{display: edit? "block" : "none"}} 
                            type="text" 
                            defaultValue={product.description}
                            onChange={(e)=>setEditedP(prev=>{return{...prev, description:e.target.value}})}
                        /> 
                    </div>
                </div>  
                
                <div className=" d-flex justify-content-between col-12 my-2">
                    <input className="btn btn-primary" style={{display:edit ? "block" : "none"}} onClick={saveProductEdit} type="submit" value="Update product"/>

                    <input className="btn btn-info" style={{display:edit ? "block" : "none"}}  type="button" value="Cancel Edit" onClick={()=>setEdit(false)} />
                </div>
            </div>
            <PricesTable priceList={prices} productId={product.id}/>
        </div>
    )
}

export default ProductDetails