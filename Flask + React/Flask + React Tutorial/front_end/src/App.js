
import './App.css';
import { useEffect, useState } from 'react';
import Movies from './components/Movies';
import Form from './components/Form';


function App() {
  const [movies, setMovies] = useState([])
  useEffect(()=>{
    // fetch('/movies') //The http://localhost part is to placed under proxy in package.json
    // .then(response => response.json()).then(data => {console.log(data); setMovies(data)})
    

    const fetchTasks = async() => {
      const res =  await fetch('/movies')
      const data = await res.json()
      setMovies(data.movies)
    }

    fetchTasks()
  }, [])

  const onAdd = async(movie) => {
    //To add to the back end
    const res = await fetch('/add_movie',{
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(movie)
      })

    // To add it to the tasks 
    const data = await res.json()
    setMovies([...movies, data])
  }

  return (
    <div className="App container">
      <Form onAdd={onAdd}></Form>
      <Movies movies={movies}></Movies>
    </div>
  );
}

export default App;
