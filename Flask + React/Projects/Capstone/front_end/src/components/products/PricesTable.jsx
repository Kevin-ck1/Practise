import { faL } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import PriceInputRow from "./PriceInputRow"
import PriceRow from "./PriceRow"
import PriceRowEdit from "./PriceRowEdit"


const PricesTable = ({priceList, productId})=>{
    // const [products, setProducts] = useState([])
    const [prices, setPrices] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [editRow, setEditRow] = useState("")
    const [input, setInput] = useState(false)
    const [sList, setSList] = useState([])

    // let existingSuppliers = prices.map(p => p.supplier_id)

    useEffect(()=>{
        if(priceList.length > 0){
            setPrices(priceList)
        }
    }, [priceList])

    useEffect(()=>{
        const fetchSuppliers = async()=>{
            const res = await fetch(`/suppliers`)
            const res_data = await res.json()
            setSuppliers(res_data)
        }

        fetchSuppliers()
    },[])

    //To obtaine the existing suppliers
    useEffect(()=>{
        setSList(prices.map(p => p.supplier_id)) 
    },[prices])

    const closeEdit = () =>{
        //Reverting back to the non edit row
        setEditRow("")
    }

    const saveEdit = async (p, c_id)=>{
        //Updating the database
        const res = await fetch(`/prices/${c_id}`,{
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(p)
        })
        const res_data = await res.json()
        if(res.status === 200){
            //Updating the products array
            setPrices(prices.map(price => price.id === p.id ? p : price ))
            //Closing the input row
            setInput(false)
        }   
    }

    const handleSubmit = async (p, c_id)=>{
        //Updating the database
        const res = await fetch(`/prices/${c_id}`,{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({price: p, supplier_id : c_id,product_id : productId})
        })
        const res_data = await res.json()
        if(res.status === 200){
            //Adding the saved price to the prices list
            setPrices([...prices, res_data])
            //Closing the input row
            setInput(false)
        }   
    }


    const deletePrice = async(id, c_id)=>{
        const res = await fetch(`/prices/${c_id}`,{
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(id)
        })

        const res_data = await res.json()
        if(res.status === 200 && res_data === "Delete"){
            //Deleting the price item from the product list
            // Note the syntax used,  the filter returns items whose id are not equal to the stated id
            setPrices(prices.filter(p =>p.id !==id))
        } else {
            alert("Product Must have atleast one instance of price")
        }

    }
    return(
        <div className="card mt-3">
            <div className="card-header d-flex justify_content-start">
                <h5>Prices</h5>
            </div>

            <div className="table-responsive my-4">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col" style={{width:"3%"}} className="text-center">#</th>
                            <th scope="col" style={{width:"30%"}} className="text-center">Supplier</th>
                            <th scope="col" style={{width:"30%"}} className="text-center">Price</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        prices.length >= 0 && suppliers.length >=0 && prices.map((price, i)=>{
                            if(editRow !== price.id){
                                return(
                                    <PriceRow
                                        key = {i}
                                        i={i}
                                        price = {price}
                                        setEditRow = {setEditRow}
                                        deletePrice = {deletePrice}
                                        supplier = {suppliers.find(x => x.id === price.supplier_id)}
                                    />
                                )
                            } else{
                                return(
                                    <PriceRowEdit
                                        key={i}
                                        i={i}
                                        price = {price}
                                        saveEdit = {saveEdit}
                                        closeEdit = {closeEdit}
                                        supplier = {suppliers.find(x => x.id === price.supplier_id)}
                                    />
                                )
                            }
                        })
                    }
                    {
                        input && <PriceInputRow
                            handleSubmit = {handleSubmit}
                            closeInput = {setInput}
                            suppliers = {suppliers}
                            sList = {sList}
                        />
                    }
                    </tbody>
                </table>
            </div>

            <div className="d-flex flex-row-reverse m-1">
                <button className="btn btn-primary" onClick={()=>setInput(true)}>Add Supplier-Price</button>
            </div>
        </div>
    )
}

export default PricesTable