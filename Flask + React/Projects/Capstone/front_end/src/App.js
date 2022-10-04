import { useContext, useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Auth from "./components/login/Auth";
import Nav from "./components/Nav";
import Welcome from "./components/Welcome";
import UsersContext from "./context/UsersProvider";



function App() {
  // useEffect(() => {
  //   const fetchMovies = async() => {
  //     const res =  await fetch('/t')
  //     const data = await res.json()
  //     //setMovies(data.movies)
  //     console.log(data)
  //   }

  //   fetchMovies()
  // }, [])
  //To retrieve global user data
  const {setUsers} = useContext(UsersContext)
  useEffect(() => {
      fetch_users()
  }, [])

  const fetch_users = async () =>{
      const res = await fetch('/getUsers')
      const data = await res.json()
      await setUsers(data)
  }

  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route path="/" exact element= {<Welcome></Welcome>}/>
          <Route path="/login" element = {<Auth/>}/>
          <Route path="/register" element = {<Auth/>}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
