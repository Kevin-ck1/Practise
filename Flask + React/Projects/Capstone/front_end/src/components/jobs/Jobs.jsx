import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import JobsForm from "./JobsForm"
import JobsIntro from "./JobsInto"
import JobsTable from "./JobsTable"


const Jobs = () => {
  const [show, setShow] = useState(false)
  const [jobs, setJobs] = useState([])
  const [clients, setClients] = useState([])
  const navigate = useNavigate()

  //fetching jobs
  const fetchJobs = async()=>{
    const res = await fetch('/jobs')
    const res_data = await res.json()
    setJobs(res_data)
  }

  //fetching Clients
  const fetchClients = async()=>{
    const res = await fetch('/clients')
    const res_data = await res.json()
    setClients(res_data)
  }

  useEffect(()=>{
    fetchJobs()
    fetchClients()
  },[])

  //Adding submitted job to our jobs list
  const receiveJob = (job)=>{
    setJobs([...jobs, job])
    navigate(`/jobs/${job.id}` , {state:{jobsData:job}})
  }

  return (
    <div className="container">
      <JobsIntro setShow={setShow}/>
      {show && <JobsForm setShow={setShow} receiveJob = {receiveJob} jobList={jobs} />}
      <JobsTable jobList={jobs} clientList = {clients}/>
    </div>
  )
}

export default Jobs


