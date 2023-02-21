import { useEffect, useState } from "react"

const LpoChequeDiv = ({jobItem, conditionInput, updateLpoCheque, currentStatus}) => {
    const [job, setJob] = useState({})
    const [condition, setCondition] = useState("")
    const [displayInfo, setDisplayInfo] = useState(false)

    const conditions = {"lpo":"LPO", "cheque": "Cheque"}

    useEffect(()=>{
        if(Object.keys(jobItem).length > 0){setJob(jobItem)}
    },[jobItem])

    useEffect(()=>{
        if(conditionInput !== undefined){setCondition(conditionInput)}
    }, [conditionInput,job])

    //Setting What to display
    useEffect(()=>{
        setDisplayInfo(condition !== undefined && job[`${condition}`] )
    }, [job, condition])
    
    const handleKeyPress = (e) =>{
        if( e.key === "Enter"){
            updateLpoCheque(e.target.value, conditionInput)
            e.target.value = ""
            setDisplayInfo(true)
        }
    }


    //Bootstrap class name for the buttons to convert them to links
    const buttonLinkClass = "btn btn-link d-flex justify-content-start"

  return (
    <div>
        {
            (Object.keys(jobItem).length > 0) &&(   
            displayInfo ? (
                <>
                {/* To Display the lpo if present */}
                <div className="displayLPO">
                    <div className="mt-2 mx-2 d-flex justify-content-start">
                        <h5 className="text-primary">
                            {conditions[condition] } No: {job[`${condition}`] || "Empty"}
                        </h5>
                    </div>
                    {/* Changing the lpo/cheque once paid */}
                    <div className="mt-2 mx-2 d-flex justify-content-start">
                        {
                        job.status === "LPO" && !job.cheque && currentStatus === "LPO" && (
                            <button 
                                type="button" 
                                className={`text-danger ${buttonLinkClass}`} 
                                style={{padding: "0px"}}
                                onClick={()=>setDisplayInfo(false)}
                            >
                                Click to change LPO No.
                            </button>
                        )
                        }

                        {
                        job.status === "Paid" && job.cheque && currentStatus === "Supplied" && condition === "cheque" && (
                            <button 
                                type="button"
                                className={`text-danger ${buttonLinkClass}`} 
                                style={{padding: "0px"}}
                                onClick={()=>setDisplayInfo(false)}
                            >
                                Click to change the Cheque No
                            </button>
                        )
                        }
                        
                    </div>
                    
                </div>
                </>
            ) :(
                <>
                {/* To Display the LPO Input field */}
                <div className="LpoInput">
                    <div className="mt-2 mx-2 d-flex">
                        <p className="text-info">Feed in the {conditions[condition] } No. Below</p> 
                    </div>
                    <div className="d-flex  m-2 mt-0">
                        <div className="col-sm-6">
                            <input 
                                className="col-12 form-control" 
                                type="text" 
                                placeholder={`Input ${conditions[condition] }`}
                                defaultValue={job.condition}
                                onChange={(e)=>console.log(e.target.value)}
                                onKeyUp={(e)=>handleKeyPress(e)}
                            />
                        </div>
                    </div>
                </div>
                </>
            ))
        }
    </div>
  )
}

export default LpoChequeDiv