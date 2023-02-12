import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Suppliers = () => {
    const [suppliers, setSuppliers] = useState()
    const navigate = useNavigate()

    const fetchSuppliers = async()=>{
        const res = await fetch('/suppliers')
        const res_data = await res.json()
        setSuppliers(res_data)
    }

    useEffect(() => {
        fetchSuppliers()
    }, [])

    const openDetails = (supplier) => {
        navigate(`/suppliers/${supplier.id}`, { state: { from:supplier }})
    }

  return (
    <div className='container'>
        <div className="d-flex justify-content-between mr-2">
            <h1>Suppliers</h1>
            <h4 className="align-self-center" >
                <Link  to="/companyform" state={{from: {"mode":"Supplier", "data":suppliers}}} >+ Supplier</Link>
            </h4>
        </div>

        <div className="rounded mt-2 pt-2">
            <table className="table table-stripped table-hover table-bordered border-primary pt-2">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Supplier</th>
                <th scope="col">Contact</th>
                <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
                {
                    suppliers?.length && (
                        suppliers.map((supplier, i)=>(
                            <tr key={i} onClick={()=> openDetails(supplier)} >
                                <td>{i+1}</td>
                                <td>{supplier.nameC}</td>
                                <td>{supplier.address}</td>
                                <td>{supplier.location}</td>
                            </tr> 
                        ))
                    ) 
                }
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default Suppliers