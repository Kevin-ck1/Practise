import { useState, useEffect } from "react"

const useFetch = (url) => {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)

  useEffect(()=>{
    const fetchData = async()=>{
        try{
            const res = await fetch(url)
            const data1 = await res.json()
            setData(data1);
        }catch(error){
            setError(error)
        }
    }
    fetchData()
  }, [url])
  return data 
}

export default useFetch
