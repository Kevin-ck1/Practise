import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import Intro from './Intro';
import ProductsTable from './ProductsTable';


const SupplierDetails = () => {
    const {id} = useParams();
    const location = useLocation()
    let data = location.state?.from
    const [supplier, setSupplier] = useState({})
    const [products, setProducts] = useState([])

    const fetchProducts = async(id)=>{
        const res = await fetch(`/prices/${id}`)
        const res_data = await res.json()

        setProducts(res_data)

        return
    }
    
    useEffect(()=>{   
        if(data){
            setSupplier(data)  
            fetchProducts(data.id)
        }else{
            const fetchSupplier = async()=>{
                const res = await fetch(`/suppliers/${id}`)
                const res_data = await res.json()
                
                setSupplier(res_data)
                fetchProducts(res_data.id)
                return res_data
            }
            fetchSupplier()
        }
         
    },[id, data])

  return (
    <div className='container'>
        {supplier && products ? 
            <>
                <Intro mode="Supplier" details={supplier}/>
                <ProductsTable c_id={supplier.id} productPrices={products}/>
            </>: 
            <p>Sorry Supplier does not exist</p>
        }
    </div>
    
  )
}

export default SupplierDetails