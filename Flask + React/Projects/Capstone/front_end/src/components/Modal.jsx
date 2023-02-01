import React from 'react'
import { useState } from 'react'

const Modal = ({show, title, onClose, children}) => {
  // let block = 
  const styleName = show ? {...modal, ...display_block} : {...modal, ...display_none}
  //Button styling
  const [isHover, setIsHover] = useState(false)
  const closeButton = {
    color: isHover ? "rgb(248, 107, 107)" : "red",
    textDecoration: isHover ? "underline" : "none",
    cursor: "pointer"
  }
  const buttonStyle = () =>{
    setIsHover(!isHover)
  }

  return (
    <div style={styleName}>
        <section style={modal_main} className="d-flex justify-content-center" >
            <div className="col-md-10">
                <div className="mb-4 d-flex justify-content-between">
                    <div></div>
                    <h5 className="text-center">{title}</h5>
                    <span 
                      className="closeButton" 
                      onClick={()=>onClose(false)} 
                      style={closeButton} 
                      onMouseEnter={buttonStyle}
                      onMouseLeave={buttonStyle}
                    >X</span>
                </div>
                {children}
            </div>
            
        </section>
    </div>
  )
}

const modal =  {
    position: "fixed",
    zIndex: "1", //Sit on the top
    top: "0",
    left: "0",
    width:"100%",
    height: "100%",
    overflow: "auto", //Enable scroll if needeed
    background: "rgba(0, 0, 0, 0.6)",
    // backgroundColor: "rgb(0,0,0)", /* Fallback color */
    // backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */
  }
  
  const modal_main = {
    borderRadius: "25px", 
    position:"fixed",
    background: "white",
    width: "60%",
    height: "auto",
    top:"50%",
    left:"50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fefefe",
    padding: "20px",
    margin: 'auto',
    border: "1px solid #888",
    overflow: "auto", //Enable scroll if needeed
  }
  
  const display_block = {
    display: "block",
  }
  
  const display_none = {
    display: "none",
  }


  
  

export default Modal