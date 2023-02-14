import { useEffect, useState } from "react"
import ProductRow from "./ProductRow"
import ProductRowEdit from "./ProductRowEdit"

const ProductsTable = ({c_id, productPrices}) => {
    
    const [products, setProducts] = useState([])
    const [editRow, setEditRow] = useState("")
    const [categories, setCategories] = useState([])

    const fetchVariables = async()=>{
        const res = await fetch('/get_variables')
        const res_data = await res.json()
        setCategories(res_data["Categories"])
    }

    useEffect(()=>{
        if(productPrices.length > 0){
            setProducts(productPrices)
        }

        fetchVariables()
    },[productPrices])

    const closeEdit = () =>{
        //Reverting back to the non edit row
        setEditRow("")
    }

    const saveEdit = async (p)=>{
        //Updating the database
        const res = await fetch(`/prices/${c_id}`,{
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(p)
        })
        const res_data = await res.json()
        console.log(res_data)
        if(res.status === 200){
            //Updating the products array
            setProducts(products.map(product => product.id === p.id ? p : product ))
            //Reverting back to the non edit row
            setEditRow("")
        }   
    }

    const deletePrice = async(id)=>{
        const res = await fetch(`/prices/${c_id}`,{
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(id)
        })

        const res_data = await res.json()
        console.log(res_data)
        if(res.status === 200 && res_data === "Delete"){
            //Deleting the price item from the product list
            // Note the syntax used,  the filter returns items whose id are not equal to the stated id
            setProducts(products.filter(p =>p.id !==id))
        }

    }

  return (
    <div className="card mt-3">
        <div className="card-header d-flex justify_content-start">
            <h5>Supplier's Products</h5>
        </div>

        <div className="table-responsive my-4">
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col" style={{width:"3%"}} className="text-center">#</th>
                        <th scope="col" style={{width:"30%"}} className="text-center">Product</th>
                        <th scope="col" style={{width:"30%"}} className="text-center">Category</th>
                        <th scope="col" style={{width:"20%"}} className="text-center">Price</th>
                        <th scope="col" style={{width:"17%"}} className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i)=>{
                            if(editRow !== product.id){
                                return(
                                    <ProductRow 
                                        key={i} 
                                        i={i}
                                        product = {product}
                                        setEditRow = {setEditRow}
                                        deletePrice = {deletePrice}
                                        categories = {categories}
                                    />   
                                )
                            }else{
                                return(
                                    <ProductRowEdit 
                                        key={i} 
                                        i={i}
                                        product = {product}
                                        saveEdit = {saveEdit}
                                        closeEdit = {closeEdit}
                                        categories = {categories}
                                    />
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductsTable