import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


const Suppliers = () => {
    const [users, setUsers] = useState()

    const fetchSuppliers = async()=>{
        const res = await fetch('/suppliers')
        const res_data = await res.json()
        setUsers(res_data)
    }

    useEffect(() => {
        fetchSuppliers()
    }, [])

  return (
    <div className='container'>
        <div className="d-flex justify-content-between mr-2">
            <h1>Suppliers</h1>
            <h4 className="align-self-center" >
                <Link  to="/companyform" state={{from: {"mode":"Supplier", "data":users}}} >+ Supplier</Link>
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
                    users?.length && (
                        users.map((user, i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{user.nameC}</td>
                                <td>{user.address}</td>
                                <td>{user.location}</td>
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