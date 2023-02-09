import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Modal from '../Modal'
import EditForm from './EditForm'
import Personnel from './Personnel'



const Intro = (props) => {
    const mode = props.mode
    const details = props.details
    const [zones, setZones] = useState([])
    const [counties, setCounties] = useState([])
    const data = useFetch('/get_variables')
    const [show, setShow] = useState(false)
    const [company, setCompany] = useState({})
    const [orgC, setOrgC] = useState({})
    const navigate = useNavigate()

    //creating funtion to fromat the input value
    const Formatter = (number) => {
        //Removing white spaces(by use of trim) and removing the none numbers using the regex
        const phoneNumber = number.trim().replace(/[^0-9]/g, "");
        const len = phoneNumber.length
        //Formating the number
        //For the first three values
        if (len < 4){return phoneNumber}
        if (len < 7){return phoneNumber.replace(/(\d{3})(\d{1})/, "$1-$2");}
        if(len < 10){return phoneNumber.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3")}
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3")
    }

    useEffect(() => {
      //To set the zones values
      setZones(data["Zones"])

      // To set the county dropdown values
      setCounties(data["Counties"])
    }, [data])

    useEffect(()=>{
        setCompany(details)
    },[details])

    //To Display the modal
    const handleOpen = ()=>{
        setOrgC(company) // Setting up an instance of the original company details
        setShow(true)
    }

    //To close the modal
    const handleClose = (change)=>{
        if(!change){
            //Reset the company details to the original details, when edits are cancelled
            setCompany(orgC) 
        }
        setShow(false)
    }
    //Updating Company details after edit
    const updateDetails = (details)=>{
        console.log(details)
    }

    //Deleting a company
    const handleDelete = async() =>{
        const link = {"Supplier":`/suppliers/${company.id}`, "Client":`/clients/${company.id}`}
        const res = await fetch(link[`${mode}`], {method: "DELETE"})
        const res_data = await res.json()
        console.log(res_data.msg)
        navigate('/suppliers')
    }



  return (
    // <div>Intro {props.mode}</div>
    <div>
        <div className="d-flex justify-content-between mt-4 pb-3">
            <div id="name">
                <h2>
                    <span  className="cName">{company.nameC}</span>
                    {/* <span  className="cId" hidden>{{supplier.id}}</span> */}
                </h2>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <button className="btn btn-outline-primary btn-sm mx-2" onClick={handleOpen}>Edit {mode}</button>
                <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
            </div>
        </div>
        <Modal show={show} title={`Edit ${mode} Details`} onClose={handleClose}>
            <hr />
            <div>
                <EditForm company={company} setCompany={setCompany} mode={mode} details={props.details} zones={zones} counties={counties} onClose={handleClose} updateDetails={updateDetails}></EditForm>
            </div>
        </Modal>
        <div id="companyDetails" className='row '>
            <div className="border-top pt-3 border-bottom col-12 row pb-2">
                <h5 className="col-md-4 d-flex justify-content-start">
                    Address: 
                    <span className="text-info cAddress mx-1">{company.address}</span>
                </h5>
                <h5 className="col-md-4 d-flex justify-content-start">
                    Email: 
                    <span className="text-info cEmail mx-1">{company.email}</span>
                </h5>
                <h5 className="col-md-4 d-flex justify-content-start">
                    Contact: 
                    <span className="text-info cContact mx-1">+254 {Formatter(String(company.contact))}</span>
                </h5>
            </div>

            <div className="border-bottom col-12 pt-1 row">
                {
                    (mode === "Supplier" )? zones && (
                        <h5 className="col-md-4 d-flex justify-content-start">
                            {/* Zone:  */}
                            <span className="text-info cZone mx-1">{zones[`${parseInt(details.zone) -1}`]}</span> 
                        </h5>
                    ): counties && (
                        <h5 className="col-md-4 d-flex justify-content-start">
                            County: 
                            <span className="text-info cCounty mx-1">{counties[`${parseInt(details.county) -1}`]}</span> 
                        </h5> 
                    )
                }
                <h5 className="col-md-6 d-flex justify-content-start">
                    Location: 
                    <span className="text-info cLocation mx-1">{details.location}</span> 
                </h5>
            </div>  
        </div>
        <Personnel c_id={company.id} Formatter={Formatter}></Personnel>
    </div>
  )
}

export default Intro