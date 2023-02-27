import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const JobsTable = () => {
    const {id} = useParams()
    const [jobs, setJobs] = useState([])
    const navigate = useNavigate()

    const fetchClient = async()=>{
        const res = await fetch(`/clients/${id}`)
        const res_data = await res.json()
        
        if(res.status === 200 && Object.keys(res_data).length !== 0){
            setJobs(res_data.jobs)
        }
        console.log(res_data.jobs)
    }

    useEffect(()=>{
        fetchClient()
    }, [id])

    //Open clicked company details
    const openDetails = (job)=>{
        navigate(`/jobs/${job.id}` , {state:{jobsData:job}})
    }
    
  return (
    <div className="card mt-3">
        <div className="card-header  d-flex">
            <h5>Client's Jobs</h5>
        </div>
        <div className="table-responsive my-4">
            <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col" style={{width:"3%"}} className="text-center">#</th>
                    <th scope="col" style={{width:"30%"}} className="text-center">Jobs</th>
                    <th scope="col" style={{width:"30%"}} className="text-center">Value</th>
                    <th scope="col" style={{width:"30%"}} className="text-center">Status</th>
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
    </div>
  )
}

export default JobsTable