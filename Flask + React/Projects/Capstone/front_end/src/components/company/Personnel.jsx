import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Personnel = ({c_id}) => {
    const [persons, setPersons] = useState([])
    const [show, setShow] = useState(false)
    const [showIR, setShowIR] = useState(false)
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

    const addRow =() =>{

    }

  return (
    <div className="card mt-3" id="personnelSection">
        <div className="card-header d-flex justify-content-between">
            <h5>Personnel Details</h5>
            <Link to={"#"} onClick={()=>setShow(!show)}>Show Personnel</Link>
            {/* <a className="showPersonnel">Show Personnel</a> */}
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
                            return(
                                <tr key={i}>
                                    <th scope='row'>{i+1}</th>
                                    <td>{person.name}</td>
                                    <td>{person.contact}</td>
                                    <td>{person.email}</td>
                                    <td>
                                        <button className="pr-1 btn btn-lg text-dark">
                                            <FontAwesomeIcon icon={faPenToSquare}/>
                                        </button>
                                        <button className="pr-0 btn btn-lg text-dark">
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>

        <div className="d-flex flex-row-reverse m-1">
            <button className="btn btn-secondary" id="addPerson" onClick={addRow}>Add Personnel</button>
        </div>

        </div>
  )
}


export default Personnel