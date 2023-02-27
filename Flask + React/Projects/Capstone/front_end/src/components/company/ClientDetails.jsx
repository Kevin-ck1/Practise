import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Intro from "./Intro"
import JobsTable from "./JobsTable"


const ClientDetails = () =>{
    const {id} = useParams()
    const location = useLocation()
    let data = location.state?.from 
    const [client, setClient] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        if(data){
            setClient(data)
        }else{
            const fetchClient = async()=>{
                const res = await fetch(`/clients/${id}`)
                const res_data = await res.json()
                
                if(res.status === 200 && Object.keys(res_data).length !== 0){
                    setClient(res_data.client)
                }else{
                    navigate('/clients')
                }
            }

            fetchClient()
        }
    }, [id, data])

    return(
        <div className="container">
            {/* {
                client && Object.keys(client).length === 0 ?
                <>
                    <Intro mode="Client" details={client} />
                </> :

                <Intro mode="Client" details={client} />
            } */}
            <Intro mode="Client" details={client} />
            <JobsTable/>
        </div>
    )
}

export default ClientDetails
