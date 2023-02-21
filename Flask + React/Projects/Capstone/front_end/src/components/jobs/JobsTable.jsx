import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const JobsTable = ({jobList,clientList}) => {
  const [jobs, setjobs] = useState([])
  const [clients, setClients] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    setjobs(jobList)
  },[jobList])

  useEffect(()=>{
    setClients(clientList)
  }, [clientList])

  //Function for displaying the Client Name
  const displayClient = (id)=>{
    let client = clients.find(c => c.id === id) || {}
    return client.nameC
  }

  //Open clicked company details
  const openDetails = (job)=>{
    navigate(`/jobs/${job.id}` , {state:{jobsData:job}})
  }

    return (
      <div className="rounded mt-2 pt-2">
        <table className="table table-striped table-hover table-bordered border-primary pt-2">
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Job</th>
              <th scope="col">Client</th>
              <th scope="col">Value</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              jobs.length > 0 && (
                jobs.map((job, i)=>{
                  return(
                    <tr key={i} onClick={()=>openDetails(job)}>
                      <td>{i+1}</td>
                      <td>{job.code}</td>
                      <td>{displayClient(job.client_id)}</td>
                      <td>{job.value || 0}</td>
                      <td>{job.status}</td>
                    </tr>
                  )
                })
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
  
  export default JobsTable