import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
const App = () => {

  return ( 
    <BrowserRouter>
    <Routes>
   <Route  path="/" element={<Homepage/>} />
   <Route  path="product" element={<Product/>} />
   <Route  path="pricing" element={<Pricing/>} />
   <Route  path="login" element={<Login />} />
   <Route  path="app" element={<AppLayout />} />
   <Route path="*" element={<div>Error</div>} />

    </Routes>
    </BrowserRouter>
   );
}
 
export default App;