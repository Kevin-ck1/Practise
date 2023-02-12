import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Companies = ({mode}) => {
    const [companies, setCompanies] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const url = location.pathname
    // const pathname = link.replace(/[^a-z]/g, "") ---- Regex to obtain only letters
    const pathname = url.split('/').pop()

    const fetchCompanies = async()=>{
        const res = await fetch(url)
        const res_data = await res.json()

        setCompanies(res_data)
    }

    useEffect(()=>{
        fetchCompanies()
    }, [])

    const openDetails = (company) =>{
        navigate(`${url}/${company.id}`, {state:{from:company}})
    }
  return (
    <div className='container'>
        <div className="d-flex justify-content-between mr-2">
            <h1>{mode}s</h1>
            <h4 className="align-self-center" >
                <Link  to="/companyform" state={{from: {"mode":mode, "data":companies}}} >+ {mode}</Link>
            </h4>
        </div>

        <div className="rounded mt-2 pt-2">
            <table className="table table-stripped table-hover table-bordered border-primary pt-2">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">{mode}</th>
                <th scope="col">Contact</th>
                <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
                {
                    companies?.length && (
                        companies.map((company, i)=>(
                            <tr key={i} onClick={()=> openDetails(company)} >
                                <td>{i+1}</td>
                                <td>{company.nameC}</td>
                                <td>{company.address}</td>
                                <td>{company.location}</td>
                            </tr> 
                        ))
                    ) 
                }
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default Companies