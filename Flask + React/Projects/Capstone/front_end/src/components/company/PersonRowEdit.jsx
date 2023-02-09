import React, { useState } from 'react'
import { faCheck, faBan,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'

const PersonRowEdit = ({i, p, person, setPerson, onInputChange, handleEdit, cancelSave, Formatter}) => {
    const [phone, setPhone] = useState(Formatter(String(person.contact)))

    useEffect(()=>{
        setPerson(person)
    }, [])

    const onEditChange = (value)=>{
        const pN = Formatter(String(value))
        setPhone(pN)
        onInputChange(value)
    }

  return (
    <tr>
        <th scope='row'>{i+1}</th>
        <td>
            <input 
                type={"text"} 
                className="form-control" 
                onChange={(e)=> setPerson(prev=>{return{...prev, name:e.target.value}})}
                required
                defaultValue={person.name}
            />
        </td>
        <td>
            <div className="input-group">
                <span className="input-group-text" style={prefix} > +(254 ) </span>
                <input 
                    style={prefix_input} 
                    type={"text"} 
                    className="form-control" 
                    // onChange={(e)=> onInputChange(e.target.value)} 
                    onChange={(e)=> onEditChange(e.target.value)}
                    // defaultValue={Formatter(String(person.contact))}
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
                defaultValue={person.email}
            />
        </td>
        <td>
        <button className="pr-1 btn btn-lg text-dark" onClick={handleEdit}>
            <FontAwesomeIcon icon={faCheck}/>
        </button>
        <button className="pr-0 btn btn-lg text-dark" onClick={cancelSave}>
            <FontAwesomeIcon icon={faBan}/>
        </button>
        </td>
    </tr>
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

export default PersonRowEdit