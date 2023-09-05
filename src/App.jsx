/* eslint-disable react/prop-types */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList"
import City from "./components/City";
import Form from "./components/Form"


import { useEffect, useState } from "react";
import { CitiesProvider } from "./Contexts/CitiesContext";


const App = () => {




 



  return ( 
    <CitiesProvider>

    <BrowserRouter>
    <Routes>
   <Route  path="/" element={<Homepage/>} />
   <Route  path="Product" element={<Product/>} />
   <Route  path="pricing" element={<Pricing/>} />
   <Route  path="login" element={<Login />} />
   <Route  path="app" element={<AppLayout />}>
     <Route index element={<Navigate replace to="cities " />} /> 
     <Route path="cities" element={<CityList  />} />
     <Route path="cities/:id" element ={<City />} />
     <Route path="countries" element={<CountriesList  />} />
     <Route path="form" element={<Form />} />
   </Route> 
   <Route path="*" element={<div>Error</div>} />

    </Routes>
    </BrowserRouter>
    </CitiesProvider>
   );
}
 
export default App;