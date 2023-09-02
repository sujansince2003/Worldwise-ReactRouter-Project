import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList"
import City from "./components/City";
import { useEffect, useState } from "react";
const App = () => {

  //fetching data
const fetchlink="http://localhost:8000"

  const [cities,setCities]=useState([]);
  const [isLoading,setIsloading]=useState(false)

useEffect(function(){
  async function fetchcities()
  {
    try{
      setIsloading(true)
         const res=await fetch(`${fetchlink}/cities`)
         const data=await res.json();
         setCities(data);
        }
    catch(err)
    {
      console.log(err.message);
    }
    finally{
      setIsloading(false)
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
     <Route index element={<CityList  cities={cities} isLoading={isLoading} />} /> 
     <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
     <Route path="cities/:id" element ={<City />} />
     <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading} />} />
     <Route path="form" element={<div>form</div>} />
   </Route> 
   <Route path="*" element={<div>Error</div>} />

    </Routes>
    </BrowserRouter>
   );
}
 
export default App;