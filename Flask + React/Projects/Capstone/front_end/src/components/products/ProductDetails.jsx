import { faL } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"


const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const location = useLocation()
    const url = location.pathname
    const id = url.split('/').pop()
    let data = location.state?.productData

    const [edit, setEdit] = useState(false)

    const fetchProduct = async()=>{
        const res = await fetch(`/products/${id}`)
        const res_data = await res.json()

        setProduct(res_data)
    }

    useEffect(()=>{
        // fetchProduct() 
        if(data){
            setProduct(data)
        }else{
            fetchProduct()  
        }
    },[id, data])

    return(
        <div className="container">
            <div className="d-flex justify-content-between border-bottom mt-4 pb-3">
                <div >
                    <h2>
                        <span style={{display: !edit ? "block" : "none"}}>{product.name}</span>
                        <input 
                            className="form-control form-control-lg"  
                            style={{display: edit ? "block" : "none"}} 
                            type="text" 
                            defaultValue={product.name}
                        />
                        {/* <span className="productId" hidden>{{product.id}</span> */}
                    </h2>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="btn btn-outline-primary btn-sm mx-2">Edit Product</button>
                    <button className="btn btn-outline-danger btn-sm">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails