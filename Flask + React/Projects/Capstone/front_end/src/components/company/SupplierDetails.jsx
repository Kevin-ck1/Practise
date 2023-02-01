import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import Intro from './Intro';

const SupplierDetails = () => {
    const {id} = useParams();
    const location = useLocation()
    let data = location.state?.from
    const [supplier, setSupplier] = useState({})

    
    useEffect(()=>{   
        if(data){
            setSupplier(data)
        }else{
            const fetchSupplier = async()=>{
                const res = await fetch(`/suppliers/${id}`)
                const res_data = await res.json()
                
                setSupplier(res_data)
                return res_data
            }
    
            fetchSupplier()
        }
        
    },[id, data])
    // console.log(supplier)
    

  return (
    <div>
        <Intro mode="Supplier" details={supplier} ></Intro>
    </div>
    
  )
}

export default SupplierDetails