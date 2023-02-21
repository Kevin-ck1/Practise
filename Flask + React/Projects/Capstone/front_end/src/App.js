import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Auth from "./components/login/Auth";
import Jobs from "./components/jobs/Jobs";
import RequireAuth from "./components/login/RequireAuth";
import Nav from "./components/Nav";
import Products from "./components/products/Products";
import Unauthorized from "./components/Unauthorized";
import Welcome from "./components/Welcome";
import Admin from "./components/admin/Admin";
import Suppliers from "./components/company/Suppliers1";
import FormC from "./components/company/FormC";
import SupplierDetails from "./components/company/SupplierDetails";
import Clients from "./components/company/Clients";
import ClientDetails from "./components/company/ClientDetails";
import ProductDetails from "./components/products/ProductDetails";
import JobDetails from "./components/jobs/jobDetails/JobDetails";


function App() {
  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route path="/" exact element= {<Welcome></Welcome>}/>
          <Route path="/login" element = {<Auth/>}/>
          <Route path="/register" element = {<Auth/>}/>
          <Route path="/unauthorized" element = {<Unauthorized/>}/>
          <Route path="/suppliers" element = {<Suppliers/>}/>
          <Route path="/suppliers/:id" element = {<SupplierDetails/>}/>
          <Route path="/clients" element = {<Clients/>}/>
          <Route path="/clients/:id" element = {<ClientDetails/>}/>
          <Route path="/companyform" element = {<FormC/>}/>
          <Route path="/products/:id" element = {<ProductDetails/>}/>
          <Route path="/jobs/:id" element={<JobDetails/>} />

          {/* Protected routes */}
          <Route element={<RequireAuth allowedRoles = {[2001, 1984]}/>} >
            <Route path="/products" element={<Products/>} />
          </Route>
          <Route element={<RequireAuth allowedRoles = {[1984]}/>} >
            <Route path="/jobs" element={<Jobs/>} />
          </Route>
          <Route element={<RequireAuth allowedRoles = {[2001, 1984]}/>} >
            <Route path="/admin" element={<Admin/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
