import { faPenToSquare, faTrashCan, faCheck, faBan, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Person } from '../hooks/PersonObject'
import PersonRowEdit from './PersonRowEdit'




const Personnel = ({c_id, Formatter}) => {
    const [person, setPerson] = useState(Person())
    const [persons, setPersons] = useState([])
    const [show, setShow] = useState(false)
    const [showIR, setShowIR] = useState(false)
    const [phone, setPhone] = useState("")
    const [submitP, setSubmitP] = useState(false)
    const [showError, setShowError] = useState(false)
    const [editRow, setEditRow] = useState("")

    // const p = useFetch(`/personnel/${c_id}`)
    const getPersons = async() => {
        if(c_id !== undefined){
            const res = await fetch(`/personnel/${c_id}`)
            const res_data = await res.json()
            setPersons(res_data)
        }
        return persons
    }

    useEffect(()=>{
        getPersons()
    },[c_id])

    useEffect(()=>{
        const checkPerson = () =>{
            //Check if all the key in the person object are filled
            const state = Object.values(person).every(el => el !== undefined && el !== "")  
            setSubmitP(state)
        }
        checkPerson()
    },[person])

    //Writing the phone number onchange function
    const onInputChange = (e)=>{
        const pN = Formatter(e)
        setPhone(pN)
        const phoneNumber = pN.trim().replace(/[^0-9]/g, "");
        if(phoneNumber.length === 9){
            setPerson(prev=>{return{...prev, contact:phoneNumber}})   
        }else{
            setPerson(prev=>{return{...prev, contact:undefined}})
        }
    }

    const handleSubmit = async() =>{
        if(!submitP){
            setShowError(true)
        } else {
            //Updating the Persons list with the new person object created
            setPersons([...persons, person])
            // setPersons(persons => [...persons, person])

            //Emptying the input field
            setPerson(Person())
            setPhone("")

            //Hiding input row from the display
            setShowIR(false)

            //Resetting the show Error to its default value
            setShowError(false)

            //Updating the database
            const res = await fetch(`/personnel/${c_id}`,{
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(person)
            })

            const res_data = await res.json()

            console.log(res_data.msg)
        }
    }

    const cancelSave = ()=>{
        //Emptying the input field
        setPerson(Person())
        setPhone("")

        //Hiding input row from the display
        setShowIR(false)

        //Resetting the show Error to its default value
        setShowError(false)

        //Close Edit field
        setEditRow("")
    }

    const handleEdit = async()=>{
        //Updating the database
        const res = await fetch(`/personnel/${c_id}`,{
            method: "PUT",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(person)
        })

        const res_data = await res.json()
        console.log(res_data.msg)

        if(res.status === 200){
            //Updating the Persons array
            setPersons(persons.map(p => p.id === person.id ? person : p))
            //Close Edit Field
            setEditRow(false)
        }
    }

    const handleDelete = async(id)=>{
        const res = await fetch(`/personnel/${c_id}`, {
            method: "DELETE",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(id)
    })
        const res_data = await res.json()
        console.log(res_data.msg)
        if(res.status === 200){
            // Deleting the person from the persons array
            setPersons(persons.filter(p=>p.id !== id)) //Note the notation this returns items whose id is not equal to the one provided
        }

        
        
    }
    

  return (
    <div className="card mt-3" id="personnelSection">
        <div className="card-header d-flex justify-content-between">
            <h5>Personnel Details</h5>
            <Link to={"#"} onClick={()=>setShow(!show)}>
                {show ? "Hide Personnel" : "Show Personnel"}
            </Link>
        </div>
        <div style={{display: `${show ? "block" :"none"}`}} className="table-responsive my-4" id="personnel">
        {/* <div style={pStyle} className="table-responsive my-4" id="personnel"> */}
            <table className="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th scope="col" style={{width:"3%"}} className="text-center">#</th>
                    <th scope="col" style={{width:"30%"}} className="text-center">Name</th>
                    <th scope="col" style={{width:"30%"}} className="text-center">Phone</th>
                    <th scope="col" style={{width:"20%"}} className="text-center">Email</th>
                    <th scope="col" style={{width:"17%"}} className="text-center">Action</th>
                </tr>
                </thead>
                <tbody id="personnelTable">
                    {
                        persons && persons.map((person, i)=>{
                            if(editRow !== person.id){
                                return (
                                    <tr key={i}>
                                        <th scope='row'>{i+1}</th>
                                        <td>{person.name}</td>
                                        <td>0{Formatter(String(person.contact))}</td>
                                        <td>{person.email}</td>
                                        <td>
                                            <button className="pr-1 btn btn-lg text-dark" onClick={()=>setEditRow(person.id)}>
                                                <FontAwesomeIcon icon={faPenToSquare}/>
                                            </button>
                                            <button className="pr-0 btn btn-lg text-dark" onClick={()=>handleDelete(person.id)}>
                                                <FontAwesomeIcon icon={faTrashCan}/>
                                            </button>
                                        </td>
                                    </tr>  
                                )
                            }else{
                                return (
                                    <PersonRowEdit 
                                        key={i} 
                                        i={i}
                                        setPerson={setPerson} 
                                        onInputChange={onInputChange} 
                                        p={phone} 
                                        handleEdit={handleEdit} 
                                        cancelSave={cancelSave}
                                        person={person}
                                        Formatter={Formatter}
                                        
                                    />
                                    
                                )
                            }
                        })
                    }
                    {
                        showIR && (
                            <tr>
                                <th></th>
                                <td>
                                    <input 
                                        type={"text"} 
                                        className="form-control" 
                                        onChange={(e)=> setPerson(prev=>{return{...prev, name:e.target.value}})}
                                        required
                                    />
                                </td>
                                <td>
                                    <div className="input-group">
                                        <span className="input-group-text" style={prefix} > +(254 ) </span>
                                        <input 
                                            style={prefix_input} 
                                            type={"text"} 
                                            className="form-control" 
                                            onChange={(e)=> onInputChange(e.target.value)} 
                                            value={phone}
                                            minLength={11} 
                                            maxLength={11}
                                            required
                                        />
                                    </div>
                                </td>
                                <td>
                                    <input 
                                        type={"text"} 
                                        className="form-control" 
                                        onChange={(e)=> setPerson(prev=>{return{...prev, email:e.target.value}})}
                                        required
                                    />
                                </td>
                                <td>
                                <button className="pr-1 btn btn-lg text-dark" onClick={handleSubmit}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </button>
                                <button className="pr-0 btn btn-lg text-dark" onClick={cancelSave}>
                                    <FontAwesomeIcon icon={faBan}/>
                                </button>
                                </td>
                            </tr>
                            
                        )
                    }
                    {showError && (<tr>
                        <td style={{borderStyle: "none"}}/>
                        <td style={{borderStyle: "none"}}/>
                        <td style={{borderStyle: "none"}}/>
                        <td style={{borderStyle: "none"}}/>
                        <td  style={instructions}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Ensure that all the fields are filled properly
                        </td>          
                    </tr>)
                    }
                </tbody>
                
            </table>
        </div>

        <div className="d-flex flex-row-reverse m-1">
            <button className={`btn ${!showIR && show ? "btn-primary" : "btn-secondary"}`} id="addPerson" onClick={()=>setShowIR(true)}>Add Personnel</button>
        </div>

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
  
// const offscreen =  {
//     position: 'absolute',
//     left: "-9999px",
// }


export default Personnel