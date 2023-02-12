import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import useFetch from '../hooks/useFetch'

const EditForm = ({company, setCompany, mode,  zones, counties, onClose}) => {
    // const [company, setCompany] = useState({})
    const [companies, setCompanies] = useState({})
    let link = {"Supplier":`/suppliers`, "Client":`/clients`}
    let data = useFetch(link["Supplier"]) //Fetch companies in the system
    //The below is for fromatting the contact input field
    const [phone, setPhone] = useState("")

    useEffect(()=>{
        // setCompany(details)
        setPhone(Formatter(String(company.contact)))
    },[company])

    useEffect(()=>{
        setCompanies(data)
    }, [data])


    //Check Availability of Company Name
    const [show, setShow] =useState(false)
    const checkName = (name) => {
        if(companies.some(n => n.name === name)){
            setShow(true)
        }else{
            setShow(false)
        //Updating the value of the company object
        setCompany(prev=>{return{...prev, nameC:name}})
        }
    }
    

    //creating funtion to fromat the input value
    const Formatter = (number) => {
        console.log(number)
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

    //Writing the phone number onchange function
    const onInputChange = (e)=>{
        const pN = Formatter(e)
        setPhone(pN)
        const phoneNumber = pN.trim().replace(/[^0-9]/g, "");
        setCompany(prev=>{return{...prev, contact:phoneNumber}})   
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        //Setting the mode depending on the mode i.e either supplier or client
        const link = {"Supplier":`/suppliers/${company.id}`, "Client":`/clients/${company.id}`}
        //posting the company object to the server
        const res = await fetch(link[`${mode}`],{
          method: "PUT",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(company)
        })
        const res_data = await res.json() || ""

        if (res.status === 409){
            console.log("Error 409")
        } else if(res.status === 500) {
            console.log('No Server Response')
        } else {
            //Close the modal class
            onClose(true)
            //Clearing the input field
            console.log(res_data.msg)
        
            // setCompany(Company())
            // navigate(`/suppliers/${res_data["id"]}`, { state: { from: res_data }, replace: true })
        }
    }
    
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="form-group row ">
            <label htmlFor="nameC" className="col-sm-2 col-form-label">{mode}'s Name</label>
            <div className="col">
                <input 
                    type="text" 
                    className="form-control" 
                    id="nameC" 
                    value={company.nameC || ""}
                    required
                    onChange={(e)=>checkName(e.target.value)}
                />
                <p style={show ? instructions : offscreen}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {mode}'s Name already Exists
              </p>
            </div>

        </div>
        <div className="form-group row mt-3 ">
          <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
          <div className="col">
            <div className="input-group">
              <span className="input-group-text" style={prefix} >P.O Box</span>
              <input 
                type="text" 
                style={prefix_input} 
                className="form-control" 
                value={company.address || ""}
                onChange={(e)=> setCompany(prev=>{return{...prev, address:e.target.value}})}  
                id="address" 
              />
              {/* <PatternFormat
                style={prefix_input}
                className="form-control" 
                format="#####-#####" 
                allowEmptyFormatting mask="_" 
                onValueChange={(e)=> setCompany(prev=>{return{...prev, address:e.formattedValue}})}
                required  
              /> */}
            </div>
          </div>
        </div>
        <div className="form-group row mt-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col">
            <input 
              type="text"   
              className="form-control" 
              onChange={(e)=> setCompany(prev=>{return{...prev, email:e.target.value}})}  
              id="email" 
              value={company.email || ""}
              required
            />
          </div>
        </div>
        <div className="form-group row mt-3">
            <label htmlFor="contact" className="col-sm-2 col-form-label">Contact</label>
            <div className="col">
              <div className="input-group">
                <span className="input-group-text" style={prefix} > +(254 ) </span>
                <input 
                  type="text"  
                  style={prefix_input}  
                  className="form-control" 
                  onChange={(e)=> onInputChange(e.target.value)}
                  value={phone || ""} 
                  id="contact" 
                  placeholder="Contact" 
                  minLength={11} 
                  maxLength={11}
                  required
                />
              </div>
            </div>
        </div>
        {
          mode === "Supplier" ? (
            <div className="form-group row mt-3">
              <label htmlFor="zone" className="col-sm-2 col-form-label">Zone</label>
              <div className="col">
                <select onChange={(e)=> setCompany(prev=>{return{...prev, zone:parseInt(e.target.value)}})}  id="zone" className="form-control">
                    {zones && (<option value={company.zone}>{zones[`${parseInt(company.zone) -1}`]}</option>)}
                    {
                        zones && zones.map((zone, i)=>{
                            return(
                            <option key={i} value={i+1}>{zone}</option>
                            )
                        })
                    }
                </select>
              </div>
          </div>
          ):
          (
            <div className="form-group row mt-3">
              <label htmlFor="county" className="col-sm-2 col-form-label">County</label>
              <div className="col-sm-5">
                <select onChange={(e)=> setCompany(prev=>{return{...prev, county:parseInt(e.target.value)}})}  id="county" className="form-control">
                {counties && (<option value={company.county} >{counties[`${parseInt(company.county) -1}`]}</option>)}
                  {
                    counties && counties.map((county, i)=>{
                      return (<option key={i} value={i+1}>{county}</option>)
                    })
                  }
                </select>
              </div>
          </div>
          )
        }
        <div className="form-group row mt-3">
            <label htmlFor="location" className="col-sm-2 col-form-label">Location</label>
            <div className="col">
              <input 
                type="text" 
                value={company.location || ""}
                className="form-control" 
                onChange={(e)=> setCompany(prev=>{return{...prev, location:e.target.value}})}  
                id="location" 
                placeholder="Location"
                required
              />
            </div>
        </div>

        <div className="submit mt-3 d-flex flex-row-reverse">
            <button className="btn btn-primary submitButton" type="submit" value="add">Save {mode} Changes</button>
        </div>
        </form>
    </div>
  )
}
const prefix = {
    backgroundColor: "#fff",
    borderRight: "0px",
    color: "#555555"
}
  
const prefix_input = {
    borderLeft: "0px",
}
  
const instructions = {
    fontSize: '0.75rem',
    borderRadius: "0.5rem",
    background: "#888888",
    color: "#fff",
    padding: "0.25rem",
    // position: "relative",
    bottom: "-10px",
  }
  
  const offscreen =  {
    position: 'absolute',
    left: "-9999px",
  }

export default EditForm