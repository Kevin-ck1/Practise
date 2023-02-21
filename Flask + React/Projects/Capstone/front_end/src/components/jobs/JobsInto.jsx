import { useState } from "react"

const JobsIntro = ({setShow}) => {
    
    const [isHover, setIsHover] = useState(false)

    const addButton = {
        color: isHover ? "aqua" : "rgb(124, 222, 252)",
        textDecoration: isHover ? "underline" : "none",
        cursor: "pointer"
      }
      const buttonStyle = () =>{
        setIsHover(!isHover)
      }

    return (
        <div className="d-flex justify-content-between mr-2">
        <h1>Jobs</h1>
        <h4 
          className="align-self-center" 
          style={addButton} 
          onMouseEnter={buttonStyle} 
          onMouseLeave={buttonStyle}
          onClick={()=>setShow(true)}
          >+ Job
        </h4>
        
      </div>
    )
  }
  
  export default JobsIntro