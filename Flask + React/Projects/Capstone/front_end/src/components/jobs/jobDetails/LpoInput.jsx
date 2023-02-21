import { useEffect, useState } from "react"

const LpoInput = ({jobItem}) => {
    const [job, setJob] = useState({})
    useEffect(()=>{
        setJob(jobItem)
    },[jobItem])

    //Bootstrap class name for the buttons to convert them to links
    const buttonLinkClass = "btn btn-link d-flex justify-content-start"


  return (
    <div className="LPO">
        {
            job.lpo ? (
                <>
                {/* To Display the lpo if present */}
                <div className="displayLPO">
                    <div className="mt-2 mx-2 d-flex justify-content-start">
                        <h5 className="text-primary">
                            LPO No: {job?.lpo || "Empty"}
                        </h5>
                    </div>
                    {/* Restrict changing the lpo once paid */}
                    {
                        !job.cheque && (
                            <div className="mt-2 mx-2 d-flex justify-content-start">
                                <button type="button" className={`text-danger ${buttonLinkClass}`} style={{padding: "0px"}}>Click to change LPO No.</button>
                            </div>
                        )
                    }
                </div>
                </>
            ) :(
                <>
                {/* To Display the LPO Input field */}
                <div className="LpoInput">
                    <div className="mt-2 mx-2 d-flex">
                        <p className="text-info">Feed in the LPO No. Below</p> 
                    </div>
                    <div className="d-flex  m-2 mt-0">
                        <div className="col-sm-6">
                            <input className="col-12 form-control" type="text" placeholder="Input LPO"/>
                        </div>
                    </div>
                </div>
                </>
            )
        }
        

        
    </div>
  )
}

export default LpoInput