
const Welcome = () => {
  return (
    <div className="container">
        <div className="d-dflex justify-content-center">
            <div className="dflex flex-column">
                <h1 className="text-center">Welcome to the Supply's App</h1>
                <p className="text-center">To Use the Nav bar above to navigate to the various pages</p>
                <p className="text-center">Thanks for using the services</p>
                <div>
                <h2 className="text-center">App Description</h2>
                <p className="text-center">This Application targets Supplys' Companies that deals with the RFQs Supply Process.</p>
                <p className="text-center">  
                    <span className="fw-bold"> RFQs (Request for Quotations) </span> 
                    can be defined as a process wherein an enterprise asks a set of potential suppliers or service providers
                    to submit their price quotations and stand a  chance to supply or provide goods or services. 
                    Once the enterprise  receives the price quotations, it can choose the vendor that best  matches its 
                    criteria for the goods or services. 
                    <a href="https://www.gep.com/knowledge-bank/glossary/what-is-request-for-quotation">Click to Check full Defination </a>
                </p>
                <h2 className="text-center">The RFQ process involves</h2>
                <div className="d-flex justify-content-center " >
                    <ul style={{listStyleType: "none"}}> 
                    <li>Awarding of the RFQ</li>
                    <li>Filling of the RFQ</li>
                    <li>Submitting of the RFQ</li>
                    <li>Issuing of LPO (Local Purchase Order)</li>
                    <li>Buying and Delivering of the products</li>
                    <li>Payment</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Welcome