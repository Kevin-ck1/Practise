import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Supply } from "../../hooks/SupplyObject"
import LpoChequeDiv from "./LpoChequeDiv"
import ProductSearch from "./ProductSearch"
import SuppliesTable from "./SuppliesTable"



const JobDetails =()=>{
    const [job, setJob] = useState({})
    const [clients, setClients] = useState([])
    const [products, setProducts] = useState([])
    const [productSupplys, setProductSupplys] = useState([])
    const [supplies, setSupplies] = useState([])
    const [statusList, setStatusList] = useState([])
    const [currentStatus, setCurrentStatus] = useState("RFQ")
    const [categories, setCategories] = useState([])
    // const [countyList, setCountyList] = useState([])
    const [counties, setCounties] = useState([])
    const [showInputRow, setShowInputRow] = useState(false)
    const [editRow, setEditRow] = useState("")
    const [displayActionColumn, setDisplayActionColumn] = useState(true)
    // const [edit, setEdit] = useState()
    // const [editedJob, setEditJob] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const url = location.pathname
    const jobId = url.split('/').pop()

    //Obtain job value from location state
    let jobData = location.state?.jobsData
    


    //Fetching the job data
    const fetchJob = async()=>{
        const res = await fetch(`/jobs/${jobId}`)
        const res_data = await res.json()
        console.log(res_data.msg)
        if(res.status === 200 && res_data.msg !== "Invalid"){
            setJob(res_data.job)
            setCurrentStatus(res_data.job.status)
            console.log(res_data.job)
        }else{
            navigate(`/jobs`)
        }
    }

    //fetching Clients
    const fetchClients = async()=>{
        const res = await fetch('/clients')
        const res_data = await res.json()
        setClients(res_data)
    }

    //Fetching products to be used in the search filter used in adding supplies
    const fetchProducts = async()=>{
        const res = await fetch('/products')
        const res_data = await res.json()
        setProducts(res_data)
    }

    //Function for Fetching Supplies
    const fetchSupplies = async()=>{
        const res = await fetch(`/jobs/${jobId}`)
        const res_data = await res.json()
        setSupplies(res_data.supplies)
    }

    //To obtain a list of products that are already added to supplies
    useEffect(()=>{
        setProductSupplys(supplies.map(supply => supply.product_id))
    }, [supplies])

    //Fetching variables
    const getVariables = async() =>{
        const res = await fetch('/get_variables')
        const res_data = await res.json()
        setStatusList(res_data.Status)
        // setCountyList(res_data.Counties)
        setCategories(res_data["Categories"])
    }

    const getCounties = async()=>{
        const res = await fetch('/get_counties')
        const res_data = await res.json()
        setCounties(res_data)
    }
    
    useEffect(()=>{
        fetchClients()
        fetchProducts()
        getVariables()
        getCounties()
    },[])

    //Function for displaying the Client Name
    const displayClient = (id)=>{
        let client = clients.find(c => c.id === id) || {}
        return client.nameC
    }

    //Populating the job state
    useEffect(() => {
      if(jobData){
        setJob(jobData)
        fetchSupplies()
        setCurrentStatus(jobData.status)
      }else{
        fetchJob()
        fetchSupplies()
      }
    }, [jobId, jobData])


    //Action column display
    useEffect(()=>{
        setDisplayActionColumn(job.status === "RFQ")
        console.log(job.status === "RFQ")
    },[job])

    //Deleting Job function
    const deleteJob = async() =>{
        const res = await fetch(`/jobs/${jobId}`,{method: "DELETE"})
        const res_data = await res.json()
        if(res.status === 200){
            navigate('/jobs')
        }
    }

    //Function to collect the lpo or cheque number
    const updateLpoCheque = (inputNo, condition) =>{
        const conditions = {"lpo":"LPO", "cheque": "Paid"}
        setCurrentStatus(conditions[condition])

        //Posting the changes to the server
        const postChange = async ()=>{
            const res = await fetch(`/jobs/${jobId}`,{
                method: "PUT",
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({[condition]:inputNo, "status": conditions[condition]})
            })
            const res_data = await res.json()
            // console.log(res_data)
            setJob(res_data)
        }

        postChange()
    }

    //Function for sending the supply item to the server
    const submitSupply = async(supply)=>{
        const res = await fetch(`/jobs/${jobId}`,{
            method: "POST",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(supply)
        })
        const res_data = await res.json()
        console.log(res_data)
        //Updating the job value
        if(res.status === 200 && res_data){
            setJob(prev=>{return{...prev, value:parseInt(res_data)}})
        }
    }

    //Receiving search Product
    const receiveProduct = (product, from) => {
        if(!(from==="Edit")){
            creatingSupply(product)
            setShowInputRow(false)
            // if(from === "inputRow"){setShowInputRow(false)}
        }else{
            setEditRow("")
            saveEdits(product)
        }
    }

    //Creating a supply object
    const creatingSupply = (product)=>{
        const supplyObject = Supply()
        // let supply = {...supplyObject, ...addProduct }
        let supply = {...supplyObject, ...product }
        let client = clients.find(c => c.id === job.client_id) || {}
        let clientCounty = counties[client.county - 1]
        let distance = clientCounty["Distance(km)"]
        let weight = (parseInt(product.weight)/1000)
        let priceFactor = 1+(parseInt(distance)/806) + 0.26 + weight

        //Populating the Supply Object
        supply.qty = 1
        supply.maxBuying = product.id
        supply.price = (Math.ceil((parseInt(product.price)*priceFactor)/5))*5
        supply.total = supply?.price * supply?.qty
        supply.job_id = jobId

        //Updating the supplys array
        setSupplies([...supplies, supply])
        //Sending the supply item to the server
        submitSupply(supply)
        
        return supply 

        //Note the below deletes keys not in the supply objec
        // let supply = Object.assign(
        //     {},
        //     supplyObject, 
        //     ...Object.keys(supplyObject)
        //     .map(s => s in addProduct && {[s]: addProduct[s]})
        // )
    }

    //Updating and saving the changes to a supply item
    const saveEdits = async(edited) =>{
        //Updating the supply array
        setSupplies(supplies.map(supply => supply.product_id === edited.product_id ? edited : supply))

        const res = await fetch(`/supplies/${edited.id}`,{
            method: "PUT",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                "price": edited.price, 
                "qty":edited.qty, 
                "total":edited.total
            })
        })
        const res_data = await res.json()
        //Updating the job value
        if(res.status === 200 && res_data){
            setJob(prev=>{return{...prev, value:res_data.value}})
        }
    }

    const deleteSupply = async(id)=>{
        const res = await fetch(`/supplies/${id}`,{method: "DELETE"})
        const res_data = await res.json()
        console.log(res_data)
        if (res.status === 200 && res_data.msg === "Delete"){
            setSupplies(supplies.filter(s=>s.id !==id))
            setJob(prev=>{return{...prev, value:res_data.value}})
        } else {
            alert("Supply Did not Delete Properly")
        }
    }


    const disableOption = (option)=>{
        let optionIndex = statusList.indexOf(option)
        let jobStatusIndex = statusList.indexOf(job.status)
        // if(jobStatusIndex + 1 >= optionIndex){
        //     if(optionIndex === 1 && supplies.length === 0){
        //         return true
        //     }else {
        //         return false
        //     }
        // } else{
        //     return true
        // }

        if (jobStatusIndex + 1 < optionIndex) {
            return true;
        }
        if (optionIndex === 1 && supplies.length === 0) {
        return true;
        }
        return false;
    }

    const generateDocs = async(type)=>{
        if(type === "di"){
            setJob(prev=>{return{...prev, status:"Supplied"}})
            setCurrentStatus("Supplied")
        }
        const res = await fetch(`/generate_docs/${jobId}/${type}`)
        const res_data = await res.blob()
        // console.log(res)
        const filename = res.headers.get("content-disposition").split('=')[1];
        const link = document.createElement('a')
        const url = URL.createObjectURL(res_data)
        link.href = url
        // link.download
        link.setAttribute('download', filename);
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url);
    }

    const sendMail = async(type)=>{
        const res = await fetch(`/generate_docs/${jobId}/${type}`)
        const res_data = await res.json()
        alert(res_data)
    }

    //Bootstrap class name for the buttons to convert them to links
    const buttonLinkClass = "btn btn-link d-flex justify-content-start"

    //Function to put the job into edit mode
    // const editMode = () =>{
    //     setEdit(true)
    //     setEditJob(job)
    // }
    return(
        <div className="container">
            <div className="d-flex justify-content-between mt-4">
                <div>
                    <h2>
                        <span>{job.code}</span>
                    </h2>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="btn btn-outline-danger btn-sm" onClick={deleteJob}>Delete</button>
                </div>
            </div>
            <div className="row mt-3 border-bottom border-top">
                <div className="border-bottom  col-12 row pb-2 mt-3">
                    <div className="flex-column col-md-4">
                        <h5 className="d-flex justify-content-start">
                            Client:&nbsp;  
                            <span className="text-info">{displayClient(job.client_id)}</span>
                        </h5>
                        <h5 className="d-flex justify-content-start">
                            Value:&nbsp;   
                            <span className="text-info">{job.value || 0}</span>
                        </h5>
                    </div>
                    <div className="col-md-5">
                        <h2 className="d-flex">
                            <label className="col-2 m-2">Status</label>
                            <div className="col-md-3 d-flex">
                            <select className="form-control pl-3" value={currentStatus || "RFQ"} onChange={(e)=>setCurrentStatus(e.target.value)}>
                                {
                                    statusList.length > 0 && statusList.map((sta, i)=>{
                                        return(
                                            <option key={i} value={sta} disabled={disableOption(sta)}>{sta}</option>
                                        )
                                    })
                                }
                            </select>
                            </div>
                            <div className="col"></div>
                        </h2>
                    </div>

                    <div className="d-flex flex-column col-md">
                        <button type="button" className={buttonLinkClass} style={{padding: "0px 10px"}} onClick={()=>generateDocs("csv")}>Check Analysis(CSV)</button>
                        <button type="button" className={buttonLinkClass} style={{padding: "0px 10px"}} onClick={()=>generateDocs("xlsx")}>Check Analysis(Excel)</button>
                        {job.status === "RFQ" && (<button type="button" className={buttonLinkClass} style={{padding: "0px 10px"}} onClick={()=>sendMail("mail")}>Invoice Request</button>)}
                        {currentStatus === "RFQ" &&(<button type="button" className={buttonLinkClass} style={{padding: "0px 10px"}} onClick={()=>generateDocs("rfq")}>Print RFQ(pdf) </button>)}
                        {(currentStatus === "LPO" || currentStatus === "Supplied") && (<button type="button" className={buttonLinkClass} style={{padding: "0px 10px"}} onClick={()=>generateDocs("di")}>Print Delivery & Invoice</button>)}
                        {currentStatus === "Paid" &&(<button type="button" className={buttonLinkClass} style={{padding: "0px 10px"}} onClick={()=>generateDocs("receipt")}>Print Receipt</button>)}
                    </div>
                </div>
            </div>

            {/* Jobs Section */}
            <div className="card mt-3">
                <div className="card-header d-flex justify_content-start">
                    <h5>Jobs</h5>
                </div>

                {/* Card Body */}
                <div>
                {/* {
                    job.status === "RFQ" && !job.lpo ? (<ProductSearch productList={products} receiveProduct={receiveProduct} existingProducts={productSupplys} />) :
                    (
                        <>
                            <LpoChequeDiv jobItem={job} conditionInput={"lpo"}/>
                            <LpoChequeDiv jobItem={job} conditionInput={"cheque"}/>
                        </>
                    )
                }     */}

                {
                    currentStatus == "RFQ"  && !job.lpo  ? (<ProductSearch productList={products} receiveProduct={receiveProduct} existingProducts={productSupplys} />) :
                    (
                        <>
                            <LpoChequeDiv jobItem={job} conditionInput={"lpo"} updateLpoCheque={updateLpoCheque} currentStatus={currentStatus}/>
                            {
                                (currentStatus === "Supplied" || currentStatus === "Paid" || job.cheque ) && 
                                <LpoChequeDiv jobItem={job} conditionInput={"cheque"} updateLpoCheque={updateLpoCheque} currentStatus={currentStatus}/>
                            }
                        </>
                    )
                
                }

                </div>
                <SuppliesTable 
                    supplyList={supplies} 
                    categoryList={categories} 
                    existingProducts={productSupplys} 
                    productList={products} 
                    receiveProduct={receiveProduct} 
                    showInputRow={showInputRow} 
                    setShowInputRow={setShowInputRow} 
                    editRow={editRow} 
                    setEditRow={setEditRow} 
                    deleteSupply={deleteSupply}
                    displayActionColumn={displayActionColumn}
                />
                {
                    displayActionColumn && (
                        <div className="d-flex flex-row-reverse m-2">
                            <button type="button" className={`btn ${showInputRow ? "btn-secondary" : "btn-primary"}`} disabled={showInputRow} onClick={()=>setShowInputRow(true)} >Add Product</button>
                        </div>
                    )
                    
                }
                
            </div>
        </div>
    )
}

export default JobDetails
