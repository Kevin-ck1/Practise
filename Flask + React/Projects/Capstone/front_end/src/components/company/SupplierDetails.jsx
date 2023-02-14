import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Intro from './Intro';
import ProductsTable from './ProductsTable';


const SupplierDetails = () => {
    const {id} = useParams();
    const location = useLocation()
    let data = location.state?.from
    const [supplier, setSupplier] = useState({})
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

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
                console.log(res_data)
                if(res.status === 200 && Object.keys(res_data).length !== 0){
                    // const res_data = await res.json()
                    setSupplier(res_data)
                    fetchProducts(res_data.id)
                }else{
                    navigate('/suppliers')
                }
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