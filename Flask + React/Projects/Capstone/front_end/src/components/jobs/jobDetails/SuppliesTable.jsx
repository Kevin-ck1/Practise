import React, { useEffect, useState } from 'react'
import NewSupplyRow from './NewSupplyRow'
import SupplyEditRow from './SupplyEditRow'
import SupplyRow from './SupplyRow'

const SuppliesTable = ({supplyList, categoryList, productList, receiveProduct, existingProducts, showInputRow, setShowInputRow, editRow, setEditRow, deleteSupply, displayActionColumn}) => {
    const [supplies, setSupplies] = useState([])
    const [products, setProducts] = useState([])
    const [productSupplys, setProductSupplys] = useState([])

    useEffect(()=>{
        setSupplies(supplyList)
    },[supplyList])



    //Importing Id list for products already added to the supply items
    useEffect(()=>{
        setProductSupplys(existingProducts)
    },[existingProducts])

    useEffect(()=>{
        setProducts(productList)
    },[productList])

  return (
    <div className="table-responsive my-4">
        <table className="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th scope="col" style={{width:"3%"}} className="text-center">#</th>
                <th scope="col" style={{width:"20%"}} className="text-center">Name</th>
                <th scope="col" style={{width:"16%"}} className="text-center">Category</th>
                <th scope="col" style={{width:"16%"}} className="text-center">QTY</th>
                <th scope="col" style={{width:"16%"}} className="text-center">Price</th>
                <th scope="col" style={{width:"16%"}} className="text-center">Total</th>
                { displayActionColumn && <th scope="col" className="text-center">Action</th>}
            </tr>
        </thead>
        <tbody>
            {supplies.length > 0 && supplies.map((supply, i)=>{
                if(editRow !== supply.product_id){
                    return (
                        <SupplyRow key={i} i={i}  supplyItem={supply} categoryList={categoryList} setEditRow={setEditRow} deleteSupply={deleteSupply} displayActionColumn={displayActionColumn}/>
                    )
                }else{
                    return(
                        <SupplyEditRow 
                            key={i} 
                            i={i}  
                            supplyItem={supply} 
                            categoryList={categoryList} 
                            setEditRow={setEditRow} 
                            receiveProduct={receiveProduct}
                        />
                    )
                }
            })}
            {
                showInputRow && (<NewSupplyRow 
                    productList={products} 
                    receiveProduct={receiveProduct} 
                    existingProducts={productSupplys}
                    setShowInputRow={setShowInputRow}
                />)
            }
        </tbody>
        </table>
    </div>
  )
}

export default SuppliesTable