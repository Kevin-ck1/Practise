import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const JobsForm = ({setShow, jobList, receiveJob}) => {
    const [code, setCode] = useState("")
    const [clients, setClients] = useState([])
    const [client, setClient] = useState("")
    const [error, setError] = useState(false)
    const [submitJ, setSubmitJ] = useState(false)
    const [jobs, setJobs] = useState([])
    const [similarJob, setSimilarJob] = useState({})

    const fetchClients = async()=>{
        const res = await fetch('/clients')
        const res_data = await res.json()
        setClients(res_data)
    }
    useEffect(()=>{
        fetchClients()
        
        if(jobList !== undefined){
            setJobs(jobList)
        }
    }, [jobList])

    //Checking for a similar object
    useEffect(()=>{
        jobs.length > 0 && jobs.forEach((job)=>{
            if(job.code === code && job.client_id === client){
                setError(true)
                setSubmitJ(false)
                setSimilarJob(job)
            }else{
                setError(false)
                setSimilarJob({}) 
            }
        })

        if(code !== "" && client !== ""){
            setSubmitJ(true)
        }else{
            jobs.length > 0 && jobs.forEach((job)=>{
                if(job.code === code && job.client_id === client){
                    setError(true)
                    setSubmitJ(false)
                    setSimilarJob(job)
                    return
                }else{
                    setError(false)
                    setSimilarJob({}) 
                    setSubmitJ(true)
                }
            })
        }
    }, [code, client, jobs])

    //Submit
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(submitJ){
            const res = await fetch('/jobs',{
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({code: code, client_id: client})
            })
            const res_data = await res.json() || "" 
            
            if(res.status === 200){
                setError(false)
                //Clean the input values
                e.target.closest("form").reset()
                setClient("")
                setCode("")
                setShow(false)
                receiveJob(res_data)

            }else{
                console.log("Job Item was not saved")
            }
        }
    }

    const errorBlock = {
        display: error ? "block" : "none" ,
        borderRadius: "0.5rem",
        background: "#888888",
        color: "#fff",
        padding: "0.25rem",
        bottom: "-10px",
      }

    return (
      <div className="card p-3">
        <form>
            <div className="form-group col">
                <label className="justify-content-start">Job Code</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Job Code"
                    required
                    onChange={(e)=>setCode(e.target.value)}
                />
            </div>

            <div className="form-group col">
                <label className="justify-content-start">Client</label>
                
                <select className="form-control" defaultValue={"Default"} onChange={(e)=>setClient(e.target.value)} required>
                    <option value="Default" disabled>Select Client</option>
                {
                    clients.map((client, i)=>{
                        return(
                            <option key={i} value={client.id}>{client.nameC}</option>
                        )
                    })
                }
                </select>
            </div>

            {
                error &&(
                <div style={{errorBlock}}>
                    <hr />
                    <p>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Job Already Exist, Check  <Link to={`/jobs/${similarJob?.id}`}>{similarJob?.code}</Link> to edit the job
                    </p>
                </div>)
            }

            <hr />
            <div className="pt-2 d-flex justify-content-between">
                <button type="submit" className={`btn ${submitJ ? "btn-primary" : "btn-secondary"}`} disabled={!submitJ} onClick={(e)=>handleSubmit(e)} >Add Job</button>
                <p className="buttonClose" onClick={()=>setShow(false)}>[x Close]</p>
            </div>
        </form>
      </div>
    )
  }
  
  export default JobsForm