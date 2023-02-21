import { useEffect, useState } from "react"


const ChequeInput = ({jobItem}) => {
    const [job, setJob] = useState({})
    useEffect(()=>{
        setJob(jobItem)
    },[jobItem])

    //Bootstrap class name for the buttons to convert them to links
    const buttonLinkClass = "btn btn-link d-flex justify-content-start"

  return (
    <div className="cheque">
        {
            job.cheque ? (
                <>
                {/* Display the cheque No. */}
                <div className="displayCheque">
                    <div className="mt-2 mx-2 d-flex justify-content-start">
                        <h5 className="text-primary">
                            Cheque No: {job?.cheque || "Empty"}
                        </h5>
                    </div>

                    <div className="mt-2 mx-2 d-flex justify-content-start">
                        <button type="button" className={`text-danger ${buttonLinkClass}`} style={{padding: "0px"}}>Click to change Cheque No.</button>
                    </div>
                </div>
                </>
            ) :(
                <>
                {/* Displaying the Cheque Input Field */}
                <div className="LpoInput">
                    <div className="mt-2 mx-2 d-flex">
                        <p className="text-info">Feed in the Cheque No. Below</p> 
                    </div>
                    <div className="d-flex  m-2 mt-0">
                        <div className="col-sm-6">
                            <input className="col-12 form-control" type="text" placeholder="Input Cheque"/>
                        </div>
                    </div>
                </div>
                </>
            )
        }
    </div>
  )
}

export default ChequeInput