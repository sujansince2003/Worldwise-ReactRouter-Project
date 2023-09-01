import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
const App = () => {

  //fetching data
const fetchlink="http://localhost:8000"

  const [cities,setCities]=useState({});
  const [isLoading,setIsloading]=useState(false)

useEffect(function(){
  async function fetchcities()
  {
    try{
         const res=await fetch(`${fetchlink}/cities`)
         const data=await res.json();
         console.log(data);
        }
    catch(err)
    {
      console.log(err.message);
    }
  }
  fetchcities()
},[])



  return ( 
    <BrowserRouter>
    <Routes>
   <Route  path="/" element={<Homepage/>} />
   <Route  path="Product" element={<Product/>} />
   <Route  path="pricing" element={<Pricing/>} />
   <Route  path="login" element={<Login />} />
   <Route  path="app" element={<AppLayout />}>
     <Route index element={<CityList />} /> 
     <Route path="cities" element={<CityList />} />
     <Route path="countries" element={<div>Countries</div>} />
     <Route path="form" element={<div>form</div>} />
   </Route> 
   <Route path="*" element={<div>Error</div>} />

    </Routes>
    </BrowserRouter>
   );
}
 
export default App;