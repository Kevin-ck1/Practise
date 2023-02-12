import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import Intro from "./Intro"

const ClientDetails = () =>{
    const {id} = useParams()
    const location = useLocation()
    let data = location.state?.from 
    const [client, setClient] = useState({})

    useEffect(()=>{
        console.log(data)
        if(data){
            setClient(data)
        }else{
            const fetchClient = async()=>{
                const res = await fetch(`/clients/${id}`)
                const res_data = await res.json()
                
                setClient(res_data)
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
        </div>
    )
}

export default ClientDetails
