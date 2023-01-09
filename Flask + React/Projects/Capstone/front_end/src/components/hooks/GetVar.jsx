
const GetVar = () => {
  const fetchData = async()=>{
    const res = await fetch('/get_variables')

    const varData = await res.json()

    return varData;
  }

  return fetchData
}

export default GetVar