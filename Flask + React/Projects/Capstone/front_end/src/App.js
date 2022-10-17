import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Auth from "./components/login/Auth";
import RequireAuth from "./components/login/RequireAuth";
import Nav from "./components/Nav";
import Products from "./components/products/Products";
import Welcome from "./components/Welcome";
import AuthContext from "./context/AuthProvider";

function App() {
  // const {setAuth} = useContext(AuthContext);
  // const data = localStorage.getItem("auth") || "";
  // setAuth(data)
  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route path="/" exact element= {<Welcome></Welcome>}/>
          <Route path="/login" element = {<Auth/>}/>
          <Route path="/register" element = {<Auth/>}/>
          {/* Protected routes */}
          <Route element={<RequireAuth/>} >
            <Route path="/products" element={<Products/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
