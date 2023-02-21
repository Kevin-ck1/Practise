import { useState } from "react"


const GetVar = () => {
  const [data, setData] = useState({})

  const fetchData = async()=>{
    const res = await fetch('/get_variables')

    const varData = await res.json()

    return setData(varData);
  }

  fetchData()

  return data
}

export default GetVar