import { useState } from "react"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Company } from "../hooks/CompanyObject"
import GetVar from "../hooks/GetVar"
import "../../index.css"
import { PatternFormat } from 'react-number-format';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"


const FormC = () => {
  let locationB = useLocation()
  let mode = locationB.state?.from["mode"] || "Client"
  let companies = locationB.state?.from["data"] || {}
  const navigate = useNavigate()
  const var_data = GetVar()
  const [zones, setZones] = useState([])
  const [counties, setCounties] = useState([])
  
  //const [company, setCompany] = useState(CompanyObject())// Initializing the company object with long code
  const [company, setCompany] = useState(Company())

  //The below is for fromatting the contact input field
  const [phone, setPhone] = useState("")

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

  //Writing the onchange function
  const onInputChange = (e)=>{
    const fN = Formatter(e)
    setPhone(fN)
    const phoneNumber = fN.trim().replace(/[^0-9]/g, "");
    setCompany(prev=>{return{...prev, contact:phoneNumber}})   
  }

  //Check Availability of Company Name
  const [show, setShow] =useState(false)
  const checkName = (name) => {
    if(companies.some(n => n.nameC === name.trim())){
      setShow(true)
    }else{
      setShow(false)
      //Updating the value of the company object
      setCompany(prev=>{return{...prev, nameC:name}})
    }

  }
  
  useEffect(() => { 
    const fetchData = async() => {
      const data = await var_data()
      //To set the zones values
      setZones(data["Zones"])

      // To set the county dropdown values
      setCounties(data["Counties"])
    }
    
    fetchData()
  }, [var_data])

  useEffect(()=>{
    // console.log(company)
  }, [company])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    //Setting the mode depending on the mode i.e either supplier or client
    const link = {"Supplier":"/add_supplier", "Client":"/add_client"}
    //posting the company object to the server
    const res = await fetch(link[`${mode}`],{
      method: "POST",
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
      //Clearing the input field
      console.log(res_data)
      setCompany(Company())
      navigate(`/suppliers/${res_data["id"]}`, { state: { from: res_data }, replace: true })
    }
  }

  
  return (
    <div className='m-3'>
        <form onSubmit={handleSubmit}>
        <div className="form-group row">
            <label htmlFor="nameC" className="col-sm-2 col-form-label">{mode}'s Name</label>
            <div className="col-sm-5">
              <input 
                type="text" 
                className="form-control" 
                onChange={(e)=> checkName(e.target.value)} 
                id="nameC" placeholder={`${mode}'s Name`} 
                // autoComplete="off"
                required
              />
              <p id="uidnote" style={show ? instructions : offscreen}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {mode}'s Name already Exists
              </p>
            </div>
            
        </div>

        <div className="form-group row mt-3 ">
            <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
            <div className="col-sm-5">
              <div className="input-group">
                {/* <span style={prefix}>P.O Box</span> */}
                <span className="input-group-text" style={prefix} >P.O Box</span>
                {/* <input type="number" style={prefix_input} className="form-control" onChange={(e)=> setCompany(prev=>{return{...prev, address:e.target.value}})}  id="address" placeholder="Address"/> */}
                <PatternFormat
                  style={prefix_input}
                  className="form-control" 
                  format="#####-#####" 
                  allowEmptyFormatting mask="_" 
                  onValueChange={(e)=> setCompany(prev=>{return{...prev, address:e.formattedValue}})}
                  required  
                />
              </div>
            </div>
        </div>

        <div className="form-group row mt-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-5">
            <input 
              type="text"   
              className="form-control" 
              onChange={(e)=> setCompany(prev=>{return{...prev, email:e.target.value}})}  
              id="email" 
              placeholder={`Email@${mode}.com`}
              required
            />
          </div>
        </div>

        <div className="form-group row mt-3">
            <label htmlFor="contact" className="col-sm-2 col-form-label">Contact</label>
            <div className="col-sm-5">
              <div className="input-group">
                <span className="input-group-text" style={prefix} > +(254 ) </span>
                <input 
                  type="text"  
                  style={prefix_input}  
                  className="form-control" 
                  onChange={(e)=> onInputChange(e.target.value)} 
                  value={phone} 
                  id="contact" 
                  placeholder="Contact" 
                  minLength={11} 
                  maxLength={11}
                  required
                />
                {/* <PatternFormat
                  style={prefix_input}
                  className="form-control" 
                  format="### ### ###" 
                  allowEmptyFormatting mask="_" 
                  onValueChange={(e)=> setCompany(prev=>{return{...prev, contact:e.formattedValue}})}
                /> */}
              </div>
            </div>
        </div>
        {
          mode === "Supplier" ? (
            <div className="form-group row mt-3">
              <label htmlFor="zone" className="col-sm-2 col-form-label">Zone</label>
              <div className="col-sm-5">
                <select onChange={(e)=> setCompany(prev=>{return{...prev, zone:parseInt(e.target.value)}})}  id="zone" className="form-control">
                    {
                      zones.map((zone, i)=>{
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
                  {
                    counties.map((county, i)=>{
                      return (<option key={i} value={i}>{{county}}</option>)
                    })
                  }
                </select>
              </div>
          </div>
          )
        }
        <div className="form-group row mt-3">
            <label htmlFor="location" className="col-sm-2 col-form-label">Location</label>
            <div className="col-sm-5">
              <input 
                type="text" 
                className="form-control" 
                onChange={(e)=> setCompany(prev=>{return{...prev, location:e.target.value}})}  
                id="location" 
                placeholder="Location"
                required
              />
            </div>
        </div>

        <div className="submit mt-3">
              <button className="btn btn-primary col-sm-7 submitButton" type="submit" value="add">Add {mode}</button>
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

export default FormC